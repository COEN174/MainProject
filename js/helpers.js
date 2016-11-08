function genOrdinal(number) {
    switch (number) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}

function generateQuarterDropdown() {
    years = 4;
    quarters = ['Fall', 'Winter', 'Spring', 'Summer'];

    var quarterDropdown = document.createElement('select');
    quarterDropdown.className = 'pull-right space-right quarterDropdown';

    // create blank entry
    var quarterOption = new Option('<no date>', 'notselected');
    quarterDropdown.add(quarterOption);

    for (var year = 1; year <= 4; year++) {
        quarters.forEach(function(quarter) {
            var label = quarter + ' ' + year + genOrdinal(year) + ' Year';
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
      if(classData.satisfaction != 'notselected'){
        classSatisfier = ' (' + classData.satisfaction + ')';
      }

      if(classData.date === 'notselected'){
        if(classData.completed){
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
}

function colorCode() {
    var ids = $('.requirementMarker').map(function() {
        return this.id;
    }).get();

    ids.forEach(function(id) {
        if ($('#' + id).is(':checked')) {
            $('#' + id + 'listEntry').attr('status', 'done');
        } else {
            if ($('#' + id + 'dropdown').val() != 'notselected') {
                $('#' + id + 'listEntry').attr('status', 'scheduled');
            } else {
                $('#' + id + 'listEntry').attr('status', 'notscheduled');
            }
        }
    });
}

function clearForm() {
    $('.requirementMarker').removeAttr('checked');
    $('.quarterDropdown').val('notselected');
    $('.satisfiedByDropdown').val('notselected');
    drawCalendar();
    colorCode();
    saveStatus();
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
        $('#' + className + 'satisfaction').val(classData.satisfaction);
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
        $('.satisfiedBy' + className).prop("checked", true);
    });
    refreshPage();

    // clear textbox and refocus
    $('#classInput').val('');
    $('#classInput').focus();
}
