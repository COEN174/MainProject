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

// draw side list of unscheduled requirements
function drawUnscheduledList() {
    // gather data
    var completed = $('.requirementMarker:checked').map(function() {
        return this.id;
    }).get();

    var uncompleted = $('.requirementMarker:not(:checked)').map(function() {
        return this.id;
    }).get();

    var unscheduled = $('.quarterDropdown option[value="notselected"]:selected').map(function() {
        return $(this).parent().get(0).id.replace('dropdown', '');
    }).get();

    // intersect to form lists of complete and incompleted unscheduled
    var completedUnscheduled = intersect(completed, unscheduled);
    var uncompletedUnscheduled = intersect(uncompleted, unscheduled);

    // populate un[complete|scheduled]
    $('#uncompletedUnscheduledList').empty();
    if (uncompletedUnscheduled.length > 0) {
        uncompletedUnscheduled.forEach(function(requirement) {
            $('#uncompletedUnscheduledList').append('<li>' + requirement.replace(/_/g, ' ') + '</ul>');
        });
    }

    // populate complete unscheduled
    $('#completedUnscheduledList').empty();
    if (completedUnscheduled.length > 0) {
        completedUnscheduled.forEach(function(requirement) {
            $('#completedUnscheduledList').append('<li>' + requirement.replace(/_/g, ' ') + '</ul>');
        });
    }
}

// erase all entries from calendar. yeah, I know...
function emptyCalendar() {
    $('#Fa1, #Wi1, #Sp1, #Su1, #Fa2, #Wi2, #Sp2, #Su2, #Fa3, #Wi3, #Sp3, #Su3, #Fa4, #Wi4, #Sp4, #Su4').empty();
}

function drawCalendar() {
    emptyCalendar();
    drawUnscheduledList();

    // list of all scheduled class
    var scheduled = $('.quarterDropdown option[value!="notselected"]:selected').map(function() {
        return $(this).parent().get(0).id.replace('dropdown', '');
    }).get();

    scheduled.forEach(function(requirement) {
        // build an li entry as a container for the div
        var container = document.createElement('li');
        var entry = document.createElement('div');

        // repopulate spaces
        entry.innerHTML = requirement.replace(/_/g, ' ');
        entry.className = 'class-entry';

        // handle background coloring
        if ($('#' + requirement).is(':checked')) {
            entry.className += ' bg-success';
        } else {
            entry.className += ' bg-warning';
        }

        // get the quarter of completion and load the entry into the calendar
        var quarter = $('#' + requirement + 'dropdown').val();
        container.appendChild(entry);
        $('#' + quarter).append(container);
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
    drawCalendar();
    colorCode();
    saveStatus();
    updateCompletionPercentage();
}

function refreshPage() {
    drawCalendar();
    colorCode();
    saveStatus();
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
    var quarterOption = new Option('', 'notselected');
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

// draw side list of unscheduled requirements
function drawUnscheduledList() {
    // gather data
    var completed = $('.requirementMarker:checked').map(function() {
        return this.id;
    }).get();

    var uncompleted = $('.requirementMarker:not(:checked)').map(function() {
        return this.id;
    }).get();

    var unscheduled = $('.quarterDropdown option[value="notselected"]:selected').map(function() {
        return $(this).parent().get(0).id.replace('dropdown', '');
    }).get();

    // intersect to form lists of complete and incompleted unscheduled
    var completedUnscheduled = intersect(completed, unscheduled);
    var uncompletedUnscheduled = intersect(uncompleted, unscheduled);

    // populate un[complete|scheduled]
    $('#uncompletedUnscheduledList').empty();
    if (uncompletedUnscheduled.length > 0) {
        uncompletedUnscheduled.forEach(function(requirement) {
            $('#uncompletedUnscheduledList').append('<li>' + requirement.replace(/_/g, ' ') + '</ul>');
        });
    }

    // populate complete unscheduled
    $('#completedUnscheduledList').empty();
    if (completedUnscheduled.length > 0) {
        completedUnscheduled.forEach(function(requirement) {
            $('#completedUnscheduledList').append('<li>' + requirement.replace(/_/g, ' ') + '</ul>');
        });
    }
}

// erase all entries from calendar. yeah, I know...
function emptyCalendar() {
    $('#Fa1, #Wi1, #Sp1, #Su1, #Fa2, #Wi2, #Sp2, #Su2, #Fa3, #Wi3, #Sp3, #Su3, #Fa4, #Wi4, #Sp4, #Su4').empty();
}

function drawCalendar() {
    emptyCalendar();
    drawUnscheduledList();

    // list of all scheduled class
    var scheduled = $('.quarterDropdown option[value!="notselected"]:selected').map(function() {
        return $(this).parent().get(0).id.replace('dropdown', '');
    }).get();

    scheduled.forEach(function(requirement) {
        // build an li entry as a container for the div
        var container = document.createElement('li');
        var entry = document.createElement('div');

        // repopulate spaces
        entry.innerHTML = requirement.replace(/_/g, ' ');
        entry.className = 'class-entry';

        // handle background coloring
        if ($('#' + requirement).is(':checked')) {
            entry.className += ' bg-success';
        } else {
            entry.className += ' bg-warning';
        }

        // get the quarter of completion and load the entry into the calendar
        var quarter = $('#' + requirement + 'dropdown').val();
        container.appendChild(entry);
        $('#' + quarter).append(container);
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
    drawCalendar();
    colorCode();
    saveStatus();
    updateCompletionPercentage();
}

function refreshPage() {
    drawCalendar();
    colorCode();
    saveStatus();
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
            date: $('#' + id + 'dropdown').val()
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

// this function will return the requirement the class c satisifies from the json requirements
// c should be all capitals. 4 letters and then 3 numbers
// it will return the requiement, or NoReq 
function findReqFromJson(c) {
    for(colNumber = 0; colNumber < 3; colNumber++) {

        // get the data for the colum we're working on
        var colRequirements = requirements['col' + colNumber];

        // loop through each requirement group and assemble a div with all the boxes and such in it
        $.each(colRequirements, function(requirementgroupName, requirementGroup) {
            $.each(requirementGroup, function(requirementName, satisfiedBy) {
                satisfiedBy.forEach(function(satisfier) {
                    // check if this is a range of classe
                    if (satisfier.indexOf('-') > -1) {
                        var startRange = satisfier.substr(4, 3);
                        var endRange = satisfier.substr(8, 3);
                        for (var i = startRange; i <= endRange; i++) {
                            var paddedNumber = ('00' + i).substr(-3);
                            if(satisfier.substr(0, 4)+paddedNumber == c) {
                                return requirementName;   
                            }
                        }
                    } else {
                        // it's a singular class
                        if(satisfier == c) {
                            return requirementName;   
                        }
                    }
                });
            });
        });
    }
    return "NoReq";
}

// returns the requirement that the class c satisfied
function getRequirementFromClass(c) {
    var jsonReq = findRecFromJson(c)
    if(jsonReq == "NoReq") {
        // put in the extra class category.
        return jsonReq;   
    }
    // TODO check against databackend
}
