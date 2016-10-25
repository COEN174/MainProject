// returns the appropriate ending (Ordinal) of number
// this function is called from generateQuarterDropdown()
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

// returns a drop down menu that allows the user to specify when a class was completed
// called from fillColumn() in classloader.js
function generateQuarterDropdown() {
    years = 4;
    quarters = ['Fall', 'Winter', 'Spring', 'Summer'];

    var quarterDropdown = document.createElement('select');
    quarterDropdown.className = 'pull-right space-right quarterDropdown';

    // create blank entry
    var quarterOption = new Option('', 'notselected');
    quarterDropdown.add(quarterOption);

    // adds assorted date options to quarterDropdown
    for (var year = 1; year <= 4; year++) {
        quarters.forEach(function(quarter) {
            var label = quarter + ' ' + year + genOrdinal(year) + ' Year';
            var value = quarter.slice(0, 1) + year;
            var quarterOption = new Option(label, value);
            quarterDropdown.add(quarterOption);
        });
    }

    return quarterDropdown;
}

// called from loadRequirements() in classloader.js
function drawCompletionList() {
    // fill completed with the ids of all the classes whos checkbox is checked
    var completed = $('.requirementMarker:checked').map(function() {
        return this.id;
    }).get();
    $('#completed').empty();
    if (completed.length > 0) {
        // update #completed with all the classes whos checkbox is checked
        completed.forEach(function(requirement) {
            $('#completed').append('<li>' + requirement + '</ul>');
        });
    }
    // fill uncompleted with the ids of all the classes whos checkbox is uncheck
    var uncompleted = $('.requirementMarker:not(:checked)').map(function() {
        return this.id;
    }).get();
    $('#notcompleted').empty();
    if (uncompleted.length > 0) {
        // update #notcompleted with all the classes whos checkbox is not check
        uncompleted.forEach(function(requirement) {
            $('#notcompleted').append('<li>' + requirement + '</ul>');
        });
    }
}

// updates the colors of row that a class is stored in
// called from loadRequirements() in classloader.js
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

function clearForm(){
  $('.requirementMarker').removeAttr('checked');
  $('.quarterDropdown').val('notselected');
  drawCompletionList();
  colorCode();
  saveStatus();
  updateCompletionPercentage();
}

function refreshPage(){
  drawCompletionList();
  colorCode();
  saveStatus();
  updateCompletionPercentage();
}

// stores the user's data to local storage
function saveStatus(){
  var data = {};

  // get all of the classes that are displayed on the webpage
  var ids = $('.requirementMarker').map(function() {
      return this.id;
  }).get();

  // for every class, save its information to data[id] to be eventually written to local storage
  ids.forEach(function(id) {
    data[id] = {completed: $('#' + id).is(':checked'), date: $('#' + id + 'dropdown').val()};
  });

  // save the users data to local storage
  localStorage.setItem('requirements', JSON.stringify(data));
}

// load the user's data from a prior session
function restoreStatus(){
  var restored = JSON.parse(localStorage.requirements);
  $.each(restored, function(className, classData){
    if(classData.completed){
      $('#' + className).prop('checked', true);
    } else {
      $('#' + className).prop('checked', false);
    }

    $('#' + className + 'dropdown').val(classData.date);
  });
}

// updates the progress bar and associated numbers
// called by loadRequirements() in classloader.js
function updateCompletionPercentage(){
  var completed = $('.requirementMarker:checked').map(function() {
      return this.id;
  }).get().length;

  var uncompleted = $('.requirementMarker:not(:checked)').map(function() {
      return this.id;
  }).get().length;

  $('#completionDone').text(completed);
  $('#completionTotal').text(completed + uncompleted);

  var completionPercentage = Math.round((completed / (completed + uncompleted)) * 100) + '%';
  $('#completionPercentage').text(completionPercentage);
  $('#completionProgress').css('width', completionPercentage);
}
