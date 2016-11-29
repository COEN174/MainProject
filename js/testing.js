var expectedRequirements;

var tests = {
    clear_button_clears_educational_enrichment: function() {
        $('#classInput').val('PHIL107');
        $('#classInputForm').submit();

        saveStatus();
        clearForm();

        return [localStorage.educational_enrichment, '[]'];
    },

    clear_button_clears_requirements: function() {
        $('#classInput').val('engr1');
        $('#classInputForm').submit();
        $('#ENGR001dropdown').val('Fa1');

        saveStatus();
        clearForm();

        return [localStorage.requirements, JSON.stringify(expectedRequirements)];
    },

    save_completion_to_local_storage: function() {
        $('#ENGR001').click();
        saveStatus();

        expectedRequirements.ENGR001.completed = true;

        return [localStorage.requirements, JSON.stringify(expectedRequirements)];
    },

    save_intended_dates_to_local_storage: function() {
        $('#ENGR001dropdown').val('Fa1');
        saveStatus();

        expectedRequirements.ENGR001.date = 'Fa1';

        return [localStorage.requirements, JSON.stringify(expectedRequirements)];
    },

    empty_input_on_submit: function() {
        $('#classInput').val('poooooop9');
        $('#classInputForm').submit();

        return [$('#classInput').val(), ''];
    },

    make_no_change_on_invalid: function() {
        $('#classInput').val('poooooop9');
        $('#classInputForm').submit();
        saveStatus();

        return [localStorage.requirements, JSON.stringify(expectedRequirements)];

    },

    make_correct_change_with_invalid: function() {
        $('#classInput').val('engr1 coen10 poop4 poooop4');
        $('#classInputForm').submit();
        saveStatus();

        expectedRequirements.ENGR001.completed = true;
        expectedRequirements.ENGR001.satisfaction = 'ENGR001';
        expectedRequirements.COEN010.completed = true;
        expectedRequirements.COEN010.satisfaction = 'COEN010';
        return [localStorage.requirements, JSON.stringify(expectedRequirements)];

    },

    add_a_single_correct_class: function() {
        $('#classInput').val('ENGR001');
        $('#classInputForm').submit();
        saveStatus();

        expectedRequirements.ENGR001.completed = true;
        expectedRequirements.ENGR001.satisfaction = 'ENGR001';
        return [localStorage.requirements, JSON.stringify(expectedRequirements)];
    },
    
    add_a_single_correct_double_dipper: function() {
        $('#classInput').val('POLI2');
        $('#classInputForm').submit();
        saveStatus();

        expectedRequirements.Cultures_and_Ideas_3.completed = true;
        expectedRequirements.Cultures_and_Ideas_3.satisfaction = 'POLI2';
        
        expectedRequirements.Social_Science.completed = true;
        expectedRequirements.Social_Science.satisfaction = 'POLI2';
        
        return [localStorage.requirements, JSON.stringify(expectedRequirements)];
    },

    add_a_single_unpadded_class: function() {
        $('#classInput').val('ENGR1');
        $('#classInputForm').submit();
        saveStatus();

        expectedRequirements.ENGR001.completed = true;
        expectedRequirements.ENGR001.satisfaction = 'ENGR001';
        return [localStorage.requirements, JSON.stringify(expectedRequirements)];
    },

    add_a_single_lowercase_class: function() {
        $('#classInput').val('engr1');
        $('#classInputForm').submit();
        saveStatus();

        expectedRequirements.ENGR001.completed = true;
        expectedRequirements.ENGR001.satisfaction = 'ENGR001';
        return [localStorage.requirements, JSON.stringify(expectedRequirements)];
    },

    add_multiple_classes: function() {
        $('#classInput').val('engr1 coen10, coen11');
        $('#classInputForm').submit();
        saveStatus();

        expectedRequirements.ENGR001.completed = true;
        expectedRequirements.ENGR001.satisfaction = 'ENGR001';
        expectedRequirements.COEN010.completed = true;
        expectedRequirements.COEN010.satisfaction = 'COEN010';
        expectedRequirements.COEN011.completed = true;
        expectedRequirements.COEN011.satisfaction = 'COEN011';
        return [localStorage.requirements, JSON.stringify(expectedRequirements)];
    },

    add_multiple_classes_on_multiple_lines: function() {
        $('#classInput').val('engr1 \ncoen10, coen11');
        $('#classInputForm').submit();
        saveStatus();

        expectedRequirements.ENGR001.completed = true;
        expectedRequirements.ENGR001.satisfaction = 'ENGR001';
        expectedRequirements.COEN010.completed = true;
        expectedRequirements.COEN010.satisfaction = 'COEN010';
        expectedRequirements.COEN011.completed = true;
        expectedRequirements.COEN011.satisfaction = 'COEN011';
        return [localStorage.requirements, JSON.stringify(expectedRequirements)];
    },

    class_starts_in_uncompleted_list: function() {
        return [$('#uncompletedUnscheduledList').children().first().text(), 'ENGR001'];
    },

    class_is_not_in_uncompleted_list_on_entry: function() {
        $('#classInput').val('engr1');
        $('#classInputForm').submit();

        return [$('#uncompletedUnscheduledList').children().first().text(), 'COEN010'];
    },

    class_moves_to_completed_list_on_entry: function() {
        $('#classInput').val('engr1');
        $('#classInputForm').submit();

        return [$('#completedUnscheduledList').children().first().text(), 'ENGR001'];
    },

    class_shows_specifier_when_moved_to_completed_list_on_entry: function() {
        $('#classInput').val('engl007');
        $('#classInputForm').submit();

        return [$('#completedUnscheduledList').children().first().text(), 'English 1 (ENGL007)'];
    },

    completed_class_checks_box: function() {
        $('#classInput').val('engr1');
        $('#classInputForm').submit();

        return [$('#ENGR001').is(':checked'), true];
    },

    completed_class_turns_green: function() {
        $('#classInput').val('engr1');
        $('#classInputForm').submit();

        return [$('#ENGR001listEntry').css('background-color'), 'rgb(144, 238, 144)'];
    },

    completed_class_is_not_in_calendar: function() {
        $('#classInput').val('engr1');
        $('#classInputForm').submit();

        // janky way to get the tbody
        var tbody = $('#Fa1').parent().parent().parent().prop('outerHTML');

        return [tbody.indexOf('ENGR001'), -1];
    },

    completed_unscheduled_class_is_not_in_unscheduled_list: function() {
        $('#classInput').val('engr1');
        $('#classInputForm').submit();

        return [$('#uncompletedUnscheduledList').children().first().text(), 'COEN010'];
    },

    scheduled_uncompleted_class_is_the_right_color: function() {
        $('#ENGR001dropdown').val('Fa1');
        refreshPage();

        return [$('#ENGR001listEntry').css('background-color'), 'rgb(255, 255, 102)'];
    },

    scheduled_uncompleted_class_shows_intended_class: function() {
        $('#ENGR001satisfaction').val('ENGR001');
        saveStatus();
        drawCalendar();

        return [$('#uncompletedUnscheduledList').children().first().text(), 'ENGR001'];
    },

    scheduled_uncompleted_class_is_in_calendar: function() {
        $('#ENGR001dropdown').val('Fa1');
        saveStatus();
        drawCalendar();

        return [$('#Fa1').children().first().children().first().text(), 'ENGR001'];
    },

    scheduled_uncompleted_1to1_shows_no_satisfier_in_calendar: function() {
        $('#ENGR001dropdown').val('Fa1');
        $('#ENGR001satisfaction').val('ENGR001');
        saveStatus();
        drawCalendar();

        return [$('#Fa1').children().first().children().first().text(), 'ENGR001'];
    },

    scheduled_uncompleted_class_shows_correct_manual_satisfier_in_calendar: function() {
      $('#English_1dropdown').val('Fa1');
      $('#English_1satisfaction').val('ENGL007');
      saveStatus();
      drawCalendar();

      return [$('#Fa1').children().first().children().first().text(), 'English 1 (ENGL007)'];
    },

    scheduled_uncompleted_class_shows_correct_automatic_satisfier_in_calendar: function() {
      $('#classInput').val('ENGL007');
      $('#classInputForm').submit();

      return [$('#completedUnscheduledList').children().first().text(), 'English 1 (ENGL007)'];
    },

    scheduled_completed_class_is_in_calendar: function() {
        $('#classInput').val('engr1');
        $('#classInputForm').submit();
        $('#ENGR001dropdown').val('Fa1');
        saveStatus();
        drawCalendar();
        colorCode();

        var li = $('#Fa1').children().first().children().first().prop('outerHTML');
        var inBox = li.indexOf('ENGR001') > -1;

        return [inBox, true];
    },

    scheduled_completed_class_is_not_in_unscheduled_list: function() {
        $('#classInput').val('engr1');
        $('#classInputForm').submit();
        $('#ENGR001dropdown').val('Fa1');

        saveStatus();
        drawCalendar();
        colorCode();

        return [$('#completedUnscheduledList').children().length, 0];
    },

    scheduled_uncompleted_class_is_yellow: function() {
        $('#ENGR001dropdown').val('Fa1');

        saveStatus();
        drawCalendar();
        colorCode();

        return [$('#Fa1').children().first().children().first().css('background-color'), 'rgb(255, 255, 102)'];
    },

    scheduled_completed_class_is_green: function() {
        $('#classInput').val('engr1');
        $('#classInputForm').submit();
        $('#ENGR001dropdown').val('Fa1');

        saveStatus();
        drawCalendar();
        colorCode();

        return [$('#Fa1').children().first().children().first().css('background-color'), 'rgb(144, 238, 144)'];
    },

    scheduled_class_does_not_update_percentage_number: function() {
        $('#ENGR001dropdown').val('Fa1');
        updateCompletionPercentage();

        return [$('#completionDone').text(), '0'];
    },

    completed_class_updates_percentage: function() {
        updateCompletionPercentage();
        $('#classInput').val('engr1');
        $('#classInputForm').submit();

        return [$('#completionDone').text(), '1'];
    },

    educational_enrichment_starts_empty: function() {
        return [localStorage.educational_enrichment, '[]'];
    },

    educational_enrichment_loads_correctly: function() {
        $('#classInput').val('PHIL107');
        $('#classInputForm').submit();

        saveStatus();
        drawCalendar();
        colorCode();

        return [localStorage.educational_enrichment, '[{"name":"PHIL107","date":"notselected"}]'];
    },

    educational_enrichment_goes_into_completed: function() {
        $('#classInput').val('PHIL107');
        $('#classInputForm').submit();

        saveStatus();
        drawCalendar();
        colorCode();

        return [$('#completedUnscheduledList').children().first().text(), 'Educational Enrichment (PHIL107)'];
    },

    educational_enrichment_is_in_calendar_once_scheduled: function() {
        $('#classInput').val('PHIL107');
        $('#classInputForm').submit();
        $('#PHIL107dropdown').val('Fa1');

        saveStatus();
        drawCalendar();
        colorCode();

        return [$('#Fa1').children().first().children().first().text(), 'Educational Enrichment (PHIL107)'];
    },

    scheduled_completed_EE_class_is_green: function() {
        $('#classInput').val('PHIL107');
        $('#classInputForm').submit();
        $('#PHIL107dropdown').val('Fa1');

        saveStatus();
        drawCalendar();
        colorCode();

        return [$('#Fa1').children().first().children().first().css('background-color'), 'rgb(144, 238, 144)'];
    },
};


function runTests() {
    console.log('Beginning ' + Object.keys(tests).length + ' tests');

    // start with a fresh slate
    clearForm();
    saveStatus();
    passcount = 0;
    failcount = 0;

    for (var name in tests) {
        var prettyName = name.replace(/_/g, ' ');

        // run test and ensure returned == expected
        clearForm();
        saveStatus();
        expectedRequirements = JSON.parse(localStorage.requirements);
        results = tests[name]();
        if (results[0] === results[1]) {
            console.log(prettyName + ' %cPASS', 'background: #222; color: #bada55');
            passcount++;
        } else {
            console.log(prettyName + ' %cFAIL', 'background: red; color: white');
            console.log('got ' + results[0] + ' and expected ' + results[1]);
            failcount++;
        }

        clearForm();
        saveStatus();
    }

    console.log('----------------------------------------');
    console.log('----------------------------------------');

    // summarize
    if (failcount === 0) {
        console.log('%c' + passcount + ' tests passed (100% success)', 'background: #222; color: #bada55');
    } else {
        console.log('%c' + passcount + ' tests passed', 'background: #222; color: #bada55');
        console.log('%c' + failcount + ' tests failed', 'background: red; color: white');
    }
}

console.log('Test harness loaded...');
// give the ajax time to load
// setTimeout(runTests, 1000);
