function generateQuarterDropdown() {
    years = 4;
    quarters = ['Fall', 'Winter', 'Spring', 'Summer'];

    var quarterDropdown = document.createElement('select');
    quarterDropdown.className = 'pull-right space-right quarterDropdown';

    // create blank entry
    var quarterOption = new Option('Quarter', 'notselected');
    quarterDropdown.add(quarterOption);
    for (var year = 1; year <= 4; year++) {
        quarters.forEach(function(quarter) {
            var label = quarter + ' ' + year;
            var value = quarter.slice(0, 2) + year;
            var quarterOption = new Option(label, value);
            quarterDropdown.add(quarterOption);
        });
    }

    return quarterDropdown;
}

// simple little helper function to get the intersection of two arrays
function intersect(a, b) {
    return a.filter(function(e) {
        return b.indexOf(e) !== -1;
    });
}

// erase all entries from calendar. yeah, I know...
function emptyCalendar() {
    $('#Fa1, #Wi1, #Sp1, #Su1, #Fa2, #Wi2, #Sp2, #Su2, #Fa3, #Wi3, #Sp3, #Su3, #Fa4, #Wi4, #Sp4, #Su4').empty();
    $('#uncompletedUnscheduledList').empty();
    $('#completedUnscheduledList').empty();
}

function drawCalendar() {
    emptyCalendar();

    var reqs = JSON.parse(window.localStorage.requirements);
    $.each(reqs, function(reqName, classData) {
        // set which class satisfied it
        var classSatisfier = '';
        if (classData.satisfaction != 'notselected') {
            classSatisfier = ' (' + classData.satisfaction + ')';
        }

        if (classData.date === 'notselected') {
            if (classData.completed) {
                // completed; not scheduled
                $('#completedUnscheduledList').append('<li>' + reqName.replace(/_/g, ' ') + classSatisfier + '</ul>');
            } else {
                // uncompleted; not scheduled
                $('#uncompletedUnscheduledList').append('<li>' + reqName.replace(/_/g, ' ') + classSatisfier + '</ul>');
            }
        } else {
            // put in calendar
            var container = document.createElement('li');
            var entry = document.createElement('div');

            // repopulate spaces
            entry.innerHTML = reqName.replace(/_/g, ' ') + classSatisfier;
            entry.className = 'class-entry';

            // handle background coloring
            if (classData.completed) {
                entry.className += ' bg-success';
            } else {
                entry.className += ' bg-warning';
            }

            // get the quarter of completion and load the entry into the calendar
            container.appendChild(entry);
            $('#' + classData.date).append(container);
        }
    });

    var eeReqs = JSON.parse(window.localStorage.educational_enrichment);
    eeReqs.forEach(function(elective){
      if(elective.date === 'notselected'){
        $('#completedUnscheduledList').append('<li>' + elective.name + '</ul>');
      } else {
        // put in calendar
        var container = document.createElement('li');
        var entry = document.createElement('div');

        entry.innerHTML = elective.name;
        entry.className = 'class-entry bg-success';

        // get the quarter of completion and load the entry into the calendar
        container.appendChild(entry);
        $('#' + elective.date).append(container);
      }
    });
}

function colorCode() {
    var reqs = JSON.parse(window.localStorage.requirements);
    $.each(reqs, function(reqName, classData) {
        if (classData.completed) {
            $('#' + reqName + 'listEntry').attr('status', 'done');
        } else {
            if (classData.date === 'notselected') {
                $('#' + reqName + 'listEntry').attr('status', 'notscheduled');
            } else {
                $('#' + reqName + 'listEntry').attr('status', 'scheduled');
			}
        }
    });

    // color code the EE reqs
    var eeRestored = JSON.parse(localStorage.educational_enrichment);
    eeRestored.forEach(function(elective){
      $('#' + elective.name + 'listEntry').attr('status', 'done');
    });
}

function clearForm() {
    $('.requirementMarker').removeAttr('checked');
    $('.quarterDropdown').val('notselected');
    $('.satisfiedByDropdown').val('notselected');

    localStorage.educational_enrichment = [];

    refreshPage();
}

function drawFromData(){
  buildList(); // empty out the current list
  restoreStatus(); // load data

  // make all the warm UI fuzzies be up to date
  drawCalendar();
  colorCode();
  updateCompletionPercentage();
}

function refreshPage() {
    saveStatus();
    drawCalendar();
    colorCode();
    updateCompletionPercentage();
}

function saveStatus() {
    var data = {};

    var ids = $('.requirementMarker').map(function() {
        return this.id;
    }).get();

    ids.forEach(function(id) {
        data[id] = {
            completed: $('#' + id).is(':checked'),
            date: $('#' + id + 'dropdown').val(),
            satisfaction: $('#' + id + 'satisfaction').val()
        };
    });

    localStorage.setItem('requirements', JSON.stringify(data));

    var eeData = [];
    var eeIds = $('.eeRequirementMarker').map(function() {
        return this.id;
    }).get();

    eeIds.forEach(function(id) {
        eeData.push({
            name: id,
            date: $('#' + id + 'dropdown').val()
        });
    });


    localStorage.setItem('educational_enrichment', JSON.stringify(eeData));
}

function restoreStatus() {
    var restored = JSON.parse(localStorage.requirements);
    $.each(restored, function(className, classData) {
        if (classData.completed) {
            $('#' + className).prop('checked', true);
        } else {
            $('#' + className).prop('checked', false);
        }

        $('#' + className + 'dropdown').val(classData.date);
    });

    // now do EE
    var eeRestored = JSON.parse(localStorage.educational_enrichment);
    eeRestored.forEach(function(elective){
      var requirementEntry = document.createElement('li');

      requirementEntry.className = 'list-group-item';
      requirementEntry.id = elective.name + 'listEntry';
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

      var requirementLabel = document.createTextNode(elective.name);

      var requirementCheckbox = document.createElement('input');
      requirementCheckbox.setAttribute('type', 'checkbox');
      requirementCheckbox.id = elective.name;
      requirementCheckbox.className = 'pull-right eeRequirementMarker';
      requirementCheckbox.style.display = 'none';
      requirementCheckbox.setAttribute('checked', true);

      var requirementDropdown = generateQuarterDropdown();
      requirementDropdown.id = elective.name + 'dropdown';
      requirementDropdown.value = elective.date;

      requirementEntry.appendChild(requirementLabel);
      requirementEntry.appendChild(document.createElement('br'));
      requirementEntry.appendChild(requirementCheckbox);
      requirementEntry.appendChild(requirementDropdown);

      document.getElementById('eeRequirements').appendChild(requirementEntry);
    });
}

function updateCompletionPercentage() {
    var completed = $('.requirementMarker:checked').map(function() {
        return this.id;
    }).get().length;

    var uncompleted = $('.requirementMarker:not(:checked)').map(function() {
        return this.id;
    }).get().length;

    var intended = $('.list-group-item[status="scheduled"]').map(function() {
        return this.id;
    }).get().length;

    var total = $('.list-group-item').map(function() {
        return this.id;
    }).get().length;

    $('#completionDone').text(completed);
    $('#completionTotal').text(completed + uncompleted);

    var intendedPercentage = Math.round((intended / total) * 100) + '%';
    var completionPercentage = Math.round((completed / total) * 100) + '%';

    $('#completionPercentage').text(completionPercentage);
    $('#completionProgress').css('width', completionPercentage);
    $('#intendedProgress').css('width', intendedPercentage);
}

// regex out the classes from the inputString and return an array with the properly formatted classes
function getClasses(inputString) {
    var regex = /([a-z][a-z][a-z][a-z])\s*(\d{1,3})/gi;
    var matches = inputString.match(regex);

    var classes = matches.map(function(classEntry) {
        // regex to break out the classes
        var regex = /([a-z][a-z][a-z][a-z])\s*(\d{1,3})/gi;
        var match = regex.exec(classEntry);

        // extract and upper department identifier
        var department = match[1].toUpperCase();
        // extract and pad class number
        var classNumber = ('00' + match[2]).substr(-3);

        return department + classNumber;
    });

    return classes;
}

// function that is called when update button is clicked
$("#classInputForm").submit(function(e) {
    e.preventDefault();
    updateColumnsWithTextArea();
});

// called from onkeydown of #classInput
// called from submission of form surrounding #classInput (essentially onClick of button)
function onTextAreaChange(event) {
    var key = event.keyCode;
    // 13 is the keyCode for the enter key
    if (key == 13) {
        updateColumnsWithTextArea();
        // false so that enter is not printed after the textarea is cleared
        return false;
    }
    // allows for other keys to still be printed in the text area
    return true;
}

function updateColumnsWithTextArea() {
    var rawClass = $('#classInput').val();
    var classes = getClasses(rawClass);
    classes.forEach(function(className) {
        setRequirementFromClass(className);
    });
    buildList();
    drawFromData();

    // clear textbox and refocus
    $('#classInput').val('');
    $('#classInput').focus();
}

// this function will return the requirement the class c satisifies from the json requirements
// c should be all capitals. 4 letters and then 3 numbers
// it will return the requiement, or NoReq
function findReqFromJson(c) {
	var reqNames = [];
    for(colNumber = 1; colNumber < 3; colNumber++) {

        // get the data for the colum we're working on
        var colRequirements = requirements['col' + colNumber];

        // loop through the classes for the requirment to determine if c satisfies a requirement
        for(var reqGroupName in colRequirements) {
            if(colRequirements.hasOwnProperty(reqGroupName)) {
                for(var reqName in colRequirements[reqGroupName]) {
                    if(colRequirements[reqGroupName].hasOwnProperty(reqName)) {
                        for(var reqClasses in colRequirements[reqGroupName][reqName]) {
                            var satisfier = colRequirements[reqGroupName][reqName][reqClasses];
                            // check if this is a range of classes
                            if (satisfier.indexOf('-') > -1) {
                                var startRange = satisfier.substr(4, 3);
                                var endRange = satisfier.substr(8, 3);
                                for (var i = startRange; i <= endRange; i++) {
                                    var paddedNumber = ('00' + i).substr(-3);
                                    if(satisfier.substr(0, 4)+paddedNumber == c) {
                                        reqNames.push(reqName);
                                    }
                                }
                            } else {
                                // it's a singular class
                                if(satisfier == c) {
                                    reqNames.push(reqName);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return reqNames;
}

// returns true if localStorage.requirements.json either doesn't have req
// or the req is already satisfied by a class
function hasSatisfaction(req) {
    var jsonReq = JSON.parse(window.localStorage.requirements)[req];
    if(jsonReq.satisfaction == "notselected") {
        return false;
    } else {
        return true;
    }
}

function putInEducationalEnrichment(c) {
    var eeEntry = {};
    eeEntry.name = c;
    eeEntry.date = 'notselected';

    var eduEnr = [];
    try {
      eduEnr = JSON.parse(window.localStorage.educational_enrichment);
    } catch (e){
      // if we catch a failure, it's invalid JSON AKA we don't have EE in place yet
      // we've already defined the eduEnr as an empty array which is fine
    }

    eduEnr.push(eeEntry);
    window.localStorage.setItem("educational_enrichment", JSON.stringify(eduEnr));
}

function satisfyReqInLocalStorage(req, c) {
    var lsjson = JSON.parse(window.localStorage.requirements);
    lsjson[req].completed = true;
    lsjson[req].satisfaction = c;
    window.localStorage.setItem("requirements", JSON.stringify(lsjson));
}

// sets the requirements that the class c satisfied to satisfied
// HIST107 is a double dip so you can use that to test if double dips work.
function setRequirementFromClass(c) {
    var reqs = findReqFromJson(c);
    if(reqs.length === 0) {
    // requirements.json did not have c listed as satisfying a requirement
        putInEducationalEnrichment(c);
        return;
    }
    var unsatisfied = [];
    for(var i = 0; i < reqs.length; i++) {
	    if(!hasSatisfaction(reqs[i])) {
	    	unsatisfied.push(reqs[i]);
	    }
	}
	if(unsatisfied.length === 0) {
		putInEducationalEnrichment(c);
	} else {
		for(var i = 0; i < unsatisfied.length; i++) {
	        satisfyReqInLocalStorage(unsatisfied[i], c);
		}
	}
}
