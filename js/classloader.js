function buildList() {
    for (var i = 1; i <= 3; i++) {
        fillColumn(i);
    }
}

function fillColumn(colNumber) {
    // get the data for the colum we're working on
    colRequirements = requirements['col' + colNumber];

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
            satisfiedBy.forEach(function(satisfier) {
                // check if this is a range of classe
                if (satisfier.indexOf('-') > -1) {
                    var startRange = satisfier.substr(4, 3);
                    var endRange = satisfier.substr(8, 3);
                    for (var i = startRange; i <= endRange; i++) {
                        var paddedNumber = ('00' + i).substr(-3);
                        classSatisfierNames.push('satisfiedBy' + satisfier.substr(0, 4) + paddedNumber);
                    }
                } else {
                    // it's a singular class
                    classSatisfierNames.push('satisfiedBy' + satisfier);
                }
            });

            classSatisfierNames.push(classRequirementName);
            var classes = classSatisfierNames.join(' ');
            // classes contains "satisfiedByXXX", "XXXmarker", and "requirementMarker"

            var requirementEntry = document.createElement('li');
            requirementEntry.className = 'list-group-item';
            requirementEntry.id = requirementName + 'listEntry';
            requirementEntry.onclick = function(e) {
                if (e.path[0].nodeName === 'LI') {
                    this.getElementsByTagName("input")[0].click();
                }
            };

            var requirementLabel = document.createTextNode(requirementName.replace('_', ' '));

            var requirementCheckbox = document.createElement('input');
            requirementCheckbox.setAttribute('type', 'checkbox');
            requirementCheckbox.id = requirementName;
            requirementCheckbox.className = classes + ' pull-right requirementMarker';

            var requirementDropdown = generateQuarterDropdown();
            requirementDropdown.id = requirementName + 'dropdown';

            requirementEntry.appendChild(requirementLabel);
            requirementEntry.appendChild(requirementCheckbox);
            requirementEntry.appendChild(requirementDropdown);

            listGroup.appendChild(requirementEntry);
        });

        groupDiv.appendChild(listGroup);
        document.getElementById('classCol' + colNumber).appendChild(groupDiv);
    });
}

function loadRequirements() {
    $.ajax({
        dataType: 'json',
        url: requirementsUrl,
        success: function(requirementsData) {
            requirements = requirementsData;
            buildList();

            if (localStorage.getItem("requirements") !== null) {
                restoreStatus();
            }
            drawCalendar();
            colorCode();
            updateCompletionPercentage();

            $(".requirementMarker").change(refreshPage);
            $(".quarterDropdown").change(refreshPage);
        }
    });
}

loadRequirements();
