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
            var value = quarter.slice(0, 1) + year;
            var quarterOption = new Option(label, value);
            quarterDropdown.add(quarterOption);
        });
    }

    return quarterDropdown;
}

function drawCompletionList() {
    var completed = $('.requirementMarker:checked').map(function() {
        return this.id;
    }).get();
    $('#completed').empty();
    if (completed.length > 0) {
        completed.forEach(function(requirement) {
            var entry = document.createElement('li');
            entry.innerHTML = requirement;
            $('#completed').append('<li>' + requirement + '</ul>');
        });
    }

    var uncompleted = $('.requirementMarker:not(:checked)').map(function() {
        return this.id;
    }).get();
    $('#notcompleted').empty();
    if (uncompleted.length > 0) {
        uncompleted.forEach(function(requirement) {
            $('#notcompleted').append('<li>' + requirement + '</ul>');
        });
    }
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

function saveStatus(){
  var data = {};

  var ids = $('.requirementMarker').map(function() {
      return this.id;
  }).get();

  ids.forEach(function(id) {
    data[id] = {completed: $('#' + id).is(':checked'), date: $('#' + id + 'dropdown').val()};
  });

  localStorage.setItem('requirements', JSON.stringify(data));
}

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
  var intendedPercentage = (uncompleted * 100) + '%';
  $('#completionPercentage').text(completionPercentage);
  $('#completionProgress').css('width', completionPercentage);
  $('#completionProgress').css('background-color','lightgreen');
  $('#intendedProgress').css('width',intendedPercentage);
}
