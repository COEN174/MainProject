function buildList() {
    for (var i = 1; i <= 3; i++) {
        fillColumn(i);
    }

    drawEEContainer();
}

function fillColumn(colNumber) {
    // get the data for the colum we're working on
    colRequirements = requirements['col' + colNumber];
    $('#classCol' + colNumber).empty();

    // loop through each requirement group and assemble a div with all the boxes and such in it
    $.each(colRequirements, function(requirementgroupName, requirementGroup) {
        // assemble general group div
        var groupDiv = document.createElement('div');
        var header = document.createElement('h4');
        header.innerHTML = requirementgroupName;
        groupDiv.appendChild(header);

        // list group to hold individual requirements
        var listGroup = document.createElement('ul');
        listGroup.className = 'list-group';

        $.each(requirementGroup, function(requirementName, satisfiedBy) {
            var classRequirementName = requirementName + 'marker';
            var classSatisfierNames = [];

            var classSatisfactionDropdown = document.createElement('select');
            classSatisfactionDropdown.className = 'satisfiedByDropdown'; // 'pull-right space-right quarterDropdown';
            classSatisfactionDropdown.id = requirementName + 'satisfaction';
            classSatisfactionDropdown.add(new Option('Class', 'notselected'));

            satisfiedBy.forEach(function(satisfier) {
                // check if this is a range of classe
                if (satisfier.indexOf('-') > -1) {
                    var startRange = satisfier.substr(4, 3);
                    var endRange = satisfier.substr(8, 3);
                    for (var i = startRange; i <= endRange; i++) {
                        var paddedNumber = ('00' + i).substr(-3);
                        var classname = satisfier.substr(0, 4) + paddedNumber;
                        classSatisfierNames.push('satisfiedBy' + classname);
                        classSatisfactionDropdown.add(new Option(classname, classname));
                    }
                } else {
                    // it's a singular class
                    classSatisfierNames.push('satisfiedBy' + satisfier);
                    classSatisfactionDropdown.add(new Option(satisfier, satisfier));
                }
            });

            classSatisfierNames.push(classRequirementName);
            var classes = classSatisfierNames.join(' ');
            // classes contains "satisfiedByXXX", "XXXmarker", and "requirementMarker"

            var requirementEntry = document.createElement('li');
            requirementEntry.className = 'list-group-item';
            requirementEntry.id = requirementName + 'listEntry';
            requirementEntry.onclick = function(e) {
                var nodename;
                if (e.path) {
                    nodename = e.path[0].nodeName;
                } else {
                    nodename = e.target.nodeName;
                }

                if (nodename === 'LI') {
                    this.getElementsByTagName("input")[0].click();
                }
            };

            var requirementLabel = document.createTextNode(requirementName.replace(/_/g, ' '));

            //div for containing dropdowns
            var reqEntryDiv = document.createElement('div');
            reqEntryDiv.className = 'reqEntryDiv pull-right';

            //checkbox creation
            //dropdown and checkbox styling
            var requirementCheckbox = document.createElement('input');
            requirementCheckbox.setAttribute('type', 'checkbox');
            requirementCheckbox.id = requirementName;
            requirementCheckbox.className = classes + ' pull-right requirementMarker';

            var requirementDropdown = generateQuarterDropdown();
            requirementDropdown.id = requirementName + 'dropdown';

            requirementEntry.appendChild(requirementLabel);
            requirementEntry.appendChild(reqEntryDiv);
            reqEntryDiv.appendChild(requirementDropdown);
            reqEntryDiv.appendChild(requirementCheckbox);
            reqEntryDiv.appendChild(classSatisfactionDropdown);

            if (classSatisfactionDropdown.length > 2) {
                reqEntryDiv.classList.add('hasClassDropdown');
            } else {
                reqEntryDiv.classList.add('hasCheckbox');
            }

            listGroup.appendChild(requirementEntry);
        });

        groupDiv.appendChild(listGroup);
        document.getElementById('classCol' + colNumber).appendChild(groupDiv);
    });

    $('.requirementMarker').change(refreshPage);
    $('.quarterDropdown').change(refreshPage);
    $('.satisfiedByDropdown').change(refreshPage);
}

function drawEEContainer() {
    var container = document.createElement('div');

    var title = document.createElement('h4');
    title.innerHTML = 'Educational Enrichment';
    container.appendChild(title);

    var listGroup = document.createElement('ul');
    listGroup.className = 'list-group';
    listGroup.id = 'eeRequirements';

    container.appendChild(listGroup);
    document.getElementById('classCol3').appendChild(container);
}

function loadRequirements() {
    $.ajax({
        dataType: 'json',
        url: requirementsUrl,
        success: function(requirementsData) {
            requirements = requirementsData;
            buildList();

            if (localStorage.getItem('requirements') !== null && localStorage.getItem('educational_enrichment') !== null) {
                restoreStatus();
            } else {
                saveStatus();
            }

            drawCalendar();
            colorCode();
            updateCompletionPercentage();
        }
    });
}

loadRequirements();
