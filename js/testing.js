var tests = {
    clear_local_storage: function() {
        $('#ENGR001dropdown').val('Fa1');
        saveStatus();
        clearForm();
        saveStatus();

        var expected = '{"ENGR001":{"completed":false,"date":"notselected"},"COEN010":{"completed":false,"date":"notselected"},"COEN011":{"completed":false,"date":"notselected"},"COEN012":{"completed":false,"date":"notselected"},"COEN019":{"completed":false,"date":"notselected"},"COEN020":{"completed":false,"date":"notselected"},"COEN021":{"completed":false,"date":"notselected"},"COEN070":{"completed":false,"date":"notselected"},"COEN122":{"completed":false,"date":"notselected"},"COEN146":{"completed":false,"date":"notselected"},"COEN171":{"completed":false,"date":"notselected"},"COEN174":{"completed":false,"date":"notselected"},"COEN175":{"completed":false,"date":"notselected"},"COEN177":{"completed":false,"date":"notselected"},"COEN179":{"completed":false,"date":"notselected"},"Elective_1":{"completed":false,"date":"notselected"},"Elective_2":{"completed":false,"date":"notselected"},"Elective_3":{"completed":false,"date":"notselected"},"English_1":{"completed":false,"date":"notselected"},"English_2":{"completed":false,"date":"notselected"},"ENGL181":{"completed":false,"date":"notselected"},"Western_Culture_1":{"completed":false,"date":"notselected"},"Western_Culture_2":{"completed":false,"date":"notselected"},"Sociology":{"completed":false,"date":"notselected"},"United_States":{"completed":false,"date":"notselected"},"World_Culture_Society":{"completed":false,"date":"notselected"},"Ethics":{"completed":false,"date":"notselected"},"Religious_Studies_1":{"completed":false,"date":"notselected"},"Religious_Studies_2":{"completed":false,"date":"notselected"},"Religious_Studies_3":{"completed":false,"date":"notselected"},"Educational_Enrichment":{"completed":false,"date":"notselected"},"Senior_Design_1":{"completed":false,"date":"notselected"},"Senior_Design_2":{"completed":false,"date":"notselected"},"Senior_Design_3":{"completed":false,"date":"notselected"},"MATH011":{"completed":false,"date":"notselected"},"MATH012":{"completed":false,"date":"notselected"},"MATH013":{"completed":false,"date":"notselected"},"MATH014":{"completed":false,"date":"notselected"},"AMTH106":{"completed":false,"date":"notselected"},"AMTH108":{"completed":false,"date":"notselected"},"MATH053":{"completed":false,"date":"notselected"},"CHEM011":{"completed":false,"date":"notselected"},"PHYS031":{"completed":false,"date":"notselected"},"PHYS032":{"completed":false,"date":"notselected"},"PHYS033":{"completed":false,"date":"notselected"},"ELEN050":{"completed":false,"date":"notselected"},"ELEN153":{"completed":false,"date":"notselected"}}';
        return [localStorage.requirements, expected];
    },

    save_completion_to_local_storage: function() {
        $('#ENGR001').click();
        saveStatus();

        var expected = '{"ENGR001":{"completed":true,"date":"notselected"},"COEN010":{"completed":false,"date":"notselected"},"COEN011":{"completed":false,"date":"notselected"},"COEN012":{"completed":false,"date":"notselected"},"COEN019":{"completed":false,"date":"notselected"},"COEN020":{"completed":false,"date":"notselected"},"COEN021":{"completed":false,"date":"notselected"},"COEN070":{"completed":false,"date":"notselected"},"COEN122":{"completed":false,"date":"notselected"},"COEN146":{"completed":false,"date":"notselected"},"COEN171":{"completed":false,"date":"notselected"},"COEN174":{"completed":false,"date":"notselected"},"COEN175":{"completed":false,"date":"notselected"},"COEN177":{"completed":false,"date":"notselected"},"COEN179":{"completed":false,"date":"notselected"},"Elective_1":{"completed":false,"date":"notselected"},"Elective_2":{"completed":false,"date":"notselected"},"Elective_3":{"completed":false,"date":"notselected"},"English_1":{"completed":false,"date":"notselected"},"English_2":{"completed":false,"date":"notselected"},"ENGL181":{"completed":false,"date":"notselected"},"Western_Culture_1":{"completed":false,"date":"notselected"},"Western_Culture_2":{"completed":false,"date":"notselected"},"Sociology":{"completed":false,"date":"notselected"},"United_States":{"completed":false,"date":"notselected"},"World_Culture_Society":{"completed":false,"date":"notselected"},"Ethics":{"completed":false,"date":"notselected"},"Religious_Studies_1":{"completed":false,"date":"notselected"},"Religious_Studies_2":{"completed":false,"date":"notselected"},"Religious_Studies_3":{"completed":false,"date":"notselected"},"Educational_Enrichment":{"completed":false,"date":"notselected"},"Senior_Design_1":{"completed":false,"date":"notselected"},"Senior_Design_2":{"completed":false,"date":"notselected"},"Senior_Design_3":{"completed":false,"date":"notselected"},"MATH011":{"completed":false,"date":"notselected"},"MATH012":{"completed":false,"date":"notselected"},"MATH013":{"completed":false,"date":"notselected"},"MATH014":{"completed":false,"date":"notselected"},"AMTH106":{"completed":false,"date":"notselected"},"AMTH108":{"completed":false,"date":"notselected"},"MATH053":{"completed":false,"date":"notselected"},"CHEM011":{"completed":false,"date":"notselected"},"PHYS031":{"completed":false,"date":"notselected"},"PHYS032":{"completed":false,"date":"notselected"},"PHYS033":{"completed":false,"date":"notselected"},"ELEN050":{"completed":false,"date":"notselected"},"ELEN153":{"completed":false,"date":"notselected"}}';
        return [localStorage.requirements, expected];
    },

    save_intended_dates_to_local_storage: function() {
        $('#ENGR001dropdown').val('Fa1');
        saveStatus();

        var expected = '{"ENGR001":{"completed":false,"date":"Fa1"},"COEN010":{"completed":false,"date":"notselected"},"COEN011":{"completed":false,"date":"notselected"},"COEN012":{"completed":false,"date":"notselected"},"COEN019":{"completed":false,"date":"notselected"},"COEN020":{"completed":false,"date":"notselected"},"COEN021":{"completed":false,"date":"notselected"},"COEN070":{"completed":false,"date":"notselected"},"COEN122":{"completed":false,"date":"notselected"},"COEN146":{"completed":false,"date":"notselected"},"COEN171":{"completed":false,"date":"notselected"},"COEN174":{"completed":false,"date":"notselected"},"COEN175":{"completed":false,"date":"notselected"},"COEN177":{"completed":false,"date":"notselected"},"COEN179":{"completed":false,"date":"notselected"},"Elective_1":{"completed":false,"date":"notselected"},"Elective_2":{"completed":false,"date":"notselected"},"Elective_3":{"completed":false,"date":"notselected"},"English_1":{"completed":false,"date":"notselected"},"English_2":{"completed":false,"date":"notselected"},"ENGL181":{"completed":false,"date":"notselected"},"Western_Culture_1":{"completed":false,"date":"notselected"},"Western_Culture_2":{"completed":false,"date":"notselected"},"Sociology":{"completed":false,"date":"notselected"},"United_States":{"completed":false,"date":"notselected"},"World_Culture_Society":{"completed":false,"date":"notselected"},"Ethics":{"completed":false,"date":"notselected"},"Religious_Studies_1":{"completed":false,"date":"notselected"},"Religious_Studies_2":{"completed":false,"date":"notselected"},"Religious_Studies_3":{"completed":false,"date":"notselected"},"Educational_Enrichment":{"completed":false,"date":"notselected"},"Senior_Design_1":{"completed":false,"date":"notselected"},"Senior_Design_2":{"completed":false,"date":"notselected"},"Senior_Design_3":{"completed":false,"date":"notselected"},"MATH011":{"completed":false,"date":"notselected"},"MATH012":{"completed":false,"date":"notselected"},"MATH013":{"completed":false,"date":"notselected"},"MATH014":{"completed":false,"date":"notselected"},"AMTH106":{"completed":false,"date":"notselected"},"AMTH108":{"completed":false,"date":"notselected"},"MATH053":{"completed":false,"date":"notselected"},"CHEM011":{"completed":false,"date":"notselected"},"PHYS031":{"completed":false,"date":"notselected"},"PHYS032":{"completed":false,"date":"notselected"},"PHYS033":{"completed":false,"date":"notselected"},"ELEN050":{"completed":false,"date":"notselected"},"ELEN153":{"completed":false,"date":"notselected"}}';
        return [localStorage.requirements, expected];
    },

    empty_input_on_submit: function() {
        $('#classInput').val('poooooop9');
        $('#classInputForm').submit();

        var expected = '';
        return [$('#classInput').val(), expected];
    },

    make_no_change_on_invalid: function() {
        $('#classInput').val('poooooop9');
        $('#classInputForm').submit();
        saveStatus();

        var expected = '{"ENGR001":{"completed":false,"date":"notselected"},"COEN010":{"completed":false,"date":"notselected"},"COEN011":{"completed":false,"date":"notselected"},"COEN012":{"completed":false,"date":"notselected"},"COEN019":{"completed":false,"date":"notselected"},"COEN020":{"completed":false,"date":"notselected"},"COEN021":{"completed":false,"date":"notselected"},"COEN070":{"completed":false,"date":"notselected"},"COEN122":{"completed":false,"date":"notselected"},"COEN146":{"completed":false,"date":"notselected"},"COEN171":{"completed":false,"date":"notselected"},"COEN174":{"completed":false,"date":"notselected"},"COEN175":{"completed":false,"date":"notselected"},"COEN177":{"completed":false,"date":"notselected"},"COEN179":{"completed":false,"date":"notselected"},"Elective_1":{"completed":false,"date":"notselected"},"Elective_2":{"completed":false,"date":"notselected"},"Elective_3":{"completed":false,"date":"notselected"},"English_1":{"completed":false,"date":"notselected"},"English_2":{"completed":false,"date":"notselected"},"ENGL181":{"completed":false,"date":"notselected"},"Western_Culture_1":{"completed":false,"date":"notselected"},"Western_Culture_2":{"completed":false,"date":"notselected"},"Sociology":{"completed":false,"date":"notselected"},"United_States":{"completed":false,"date":"notselected"},"World_Culture_Society":{"completed":false,"date":"notselected"},"Ethics":{"completed":false,"date":"notselected"},"Religious_Studies_1":{"completed":false,"date":"notselected"},"Religious_Studies_2":{"completed":false,"date":"notselected"},"Religious_Studies_3":{"completed":false,"date":"notselected"},"Educational_Enrichment":{"completed":false,"date":"notselected"},"Senior_Design_1":{"completed":false,"date":"notselected"},"Senior_Design_2":{"completed":false,"date":"notselected"},"Senior_Design_3":{"completed":false,"date":"notselected"},"MATH011":{"completed":false,"date":"notselected"},"MATH012":{"completed":false,"date":"notselected"},"MATH013":{"completed":false,"date":"notselected"},"MATH014":{"completed":false,"date":"notselected"},"AMTH106":{"completed":false,"date":"notselected"},"AMTH108":{"completed":false,"date":"notselected"},"MATH053":{"completed":false,"date":"notselected"},"CHEM011":{"completed":false,"date":"notselected"},"PHYS031":{"completed":false,"date":"notselected"},"PHYS032":{"completed":false,"date":"notselected"},"PHYS033":{"completed":false,"date":"notselected"},"ELEN050":{"completed":false,"date":"notselected"},"ELEN153":{"completed":false,"date":"notselected"}}';
        return [localStorage.requirements, expected];

    },

    add_a_single_correct_class: function() {
        $('#classInput').val('ENGR001');
        $('#classInputForm').submit();

        var expected = '{"ENGR001":{"completed":true,"date":"notselected"},"COEN010":{"completed":false,"date":"notselected"},"COEN011":{"completed":false,"date":"notselected"},"COEN012":{"completed":false,"date":"notselected"},"COEN019":{"completed":false,"date":"notselected"},"COEN020":{"completed":false,"date":"notselected"},"COEN021":{"completed":false,"date":"notselected"},"COEN070":{"completed":false,"date":"notselected"},"COEN122":{"completed":false,"date":"notselected"},"COEN146":{"completed":false,"date":"notselected"},"COEN171":{"completed":false,"date":"notselected"},"COEN174":{"completed":false,"date":"notselected"},"COEN175":{"completed":false,"date":"notselected"},"COEN177":{"completed":false,"date":"notselected"},"COEN179":{"completed":false,"date":"notselected"},"Elective_1":{"completed":false,"date":"notselected"},"Elective_2":{"completed":false,"date":"notselected"},"Elective_3":{"completed":false,"date":"notselected"},"English_1":{"completed":false,"date":"notselected"},"English_2":{"completed":false,"date":"notselected"},"ENGL181":{"completed":false,"date":"notselected"},"Western_Culture_1":{"completed":false,"date":"notselected"},"Western_Culture_2":{"completed":false,"date":"notselected"},"Sociology":{"completed":false,"date":"notselected"},"United_States":{"completed":false,"date":"notselected"},"World_Culture_Society":{"completed":false,"date":"notselected"},"Ethics":{"completed":false,"date":"notselected"},"Religious_Studies_1":{"completed":false,"date":"notselected"},"Religious_Studies_2":{"completed":false,"date":"notselected"},"Religious_Studies_3":{"completed":false,"date":"notselected"},"Educational_Enrichment":{"completed":false,"date":"notselected"},"Senior_Design_1":{"completed":false,"date":"notselected"},"Senior_Design_2":{"completed":false,"date":"notselected"},"Senior_Design_3":{"completed":false,"date":"notselected"},"MATH011":{"completed":false,"date":"notselected"},"MATH012":{"completed":false,"date":"notselected"},"MATH013":{"completed":false,"date":"notselected"},"MATH014":{"completed":false,"date":"notselected"},"AMTH106":{"completed":false,"date":"notselected"},"AMTH108":{"completed":false,"date":"notselected"},"MATH053":{"completed":false,"date":"notselected"},"CHEM011":{"completed":false,"date":"notselected"},"PHYS031":{"completed":false,"date":"notselected"},"PHYS032":{"completed":false,"date":"notselected"},"PHYS033":{"completed":false,"date":"notselected"},"ELEN050":{"completed":false,"date":"notselected"},"ELEN153":{"completed":false,"date":"notselected"}}';
        return [localStorage.requirements, expected];
    },

    add_a_single_unpadded_class: function() {
        $('#classInput').val('ENGR1');
        $('#classInputForm').submit();

        var expected = '{"ENGR001":{"completed":true,"date":"notselected"},"COEN010":{"completed":false,"date":"notselected"},"COEN011":{"completed":false,"date":"notselected"},"COEN012":{"completed":false,"date":"notselected"},"COEN019":{"completed":false,"date":"notselected"},"COEN020":{"completed":false,"date":"notselected"},"COEN021":{"completed":false,"date":"notselected"},"COEN070":{"completed":false,"date":"notselected"},"COEN122":{"completed":false,"date":"notselected"},"COEN146":{"completed":false,"date":"notselected"},"COEN171":{"completed":false,"date":"notselected"},"COEN174":{"completed":false,"date":"notselected"},"COEN175":{"completed":false,"date":"notselected"},"COEN177":{"completed":false,"date":"notselected"},"COEN179":{"completed":false,"date":"notselected"},"Elective_1":{"completed":false,"date":"notselected"},"Elective_2":{"completed":false,"date":"notselected"},"Elective_3":{"completed":false,"date":"notselected"},"English_1":{"completed":false,"date":"notselected"},"English_2":{"completed":false,"date":"notselected"},"ENGL181":{"completed":false,"date":"notselected"},"Western_Culture_1":{"completed":false,"date":"notselected"},"Western_Culture_2":{"completed":false,"date":"notselected"},"Sociology":{"completed":false,"date":"notselected"},"United_States":{"completed":false,"date":"notselected"},"World_Culture_Society":{"completed":false,"date":"notselected"},"Ethics":{"completed":false,"date":"notselected"},"Religious_Studies_1":{"completed":false,"date":"notselected"},"Religious_Studies_2":{"completed":false,"date":"notselected"},"Religious_Studies_3":{"completed":false,"date":"notselected"},"Educational_Enrichment":{"completed":false,"date":"notselected"},"Senior_Design_1":{"completed":false,"date":"notselected"},"Senior_Design_2":{"completed":false,"date":"notselected"},"Senior_Design_3":{"completed":false,"date":"notselected"},"MATH011":{"completed":false,"date":"notselected"},"MATH012":{"completed":false,"date":"notselected"},"MATH013":{"completed":false,"date":"notselected"},"MATH014":{"completed":false,"date":"notselected"},"AMTH106":{"completed":false,"date":"notselected"},"AMTH108":{"completed":false,"date":"notselected"},"MATH053":{"completed":false,"date":"notselected"},"CHEM011":{"completed":false,"date":"notselected"},"PHYS031":{"completed":false,"date":"notselected"},"PHYS032":{"completed":false,"date":"notselected"},"PHYS033":{"completed":false,"date":"notselected"},"ELEN050":{"completed":false,"date":"notselected"},"ELEN153":{"completed":false,"date":"notselected"}}';
        return [localStorage.requirements, expected];
    },

    add_a_single_lowercase_class: function() {
        $('#classInput').val('engr1');
        $('#classInputForm').submit();

        var expected = '{"ENGR001":{"completed":true,"date":"notselected"},"COEN010":{"completed":false,"date":"notselected"},"COEN011":{"completed":false,"date":"notselected"},"COEN012":{"completed":false,"date":"notselected"},"COEN019":{"completed":false,"date":"notselected"},"COEN020":{"completed":false,"date":"notselected"},"COEN021":{"completed":false,"date":"notselected"},"COEN070":{"completed":false,"date":"notselected"},"COEN122":{"completed":false,"date":"notselected"},"COEN146":{"completed":false,"date":"notselected"},"COEN171":{"completed":false,"date":"notselected"},"COEN174":{"completed":false,"date":"notselected"},"COEN175":{"completed":false,"date":"notselected"},"COEN177":{"completed":false,"date":"notselected"},"COEN179":{"completed":false,"date":"notselected"},"Elective_1":{"completed":false,"date":"notselected"},"Elective_2":{"completed":false,"date":"notselected"},"Elective_3":{"completed":false,"date":"notselected"},"English_1":{"completed":false,"date":"notselected"},"English_2":{"completed":false,"date":"notselected"},"ENGL181":{"completed":false,"date":"notselected"},"Western_Culture_1":{"completed":false,"date":"notselected"},"Western_Culture_2":{"completed":false,"date":"notselected"},"Sociology":{"completed":false,"date":"notselected"},"United_States":{"completed":false,"date":"notselected"},"World_Culture_Society":{"completed":false,"date":"notselected"},"Ethics":{"completed":false,"date":"notselected"},"Religious_Studies_1":{"completed":false,"date":"notselected"},"Religious_Studies_2":{"completed":false,"date":"notselected"},"Religious_Studies_3":{"completed":false,"date":"notselected"},"Educational_Enrichment":{"completed":false,"date":"notselected"},"Senior_Design_1":{"completed":false,"date":"notselected"},"Senior_Design_2":{"completed":false,"date":"notselected"},"Senior_Design_3":{"completed":false,"date":"notselected"},"MATH011":{"completed":false,"date":"notselected"},"MATH012":{"completed":false,"date":"notselected"},"MATH013":{"completed":false,"date":"notselected"},"MATH014":{"completed":false,"date":"notselected"},"AMTH106":{"completed":false,"date":"notselected"},"AMTH108":{"completed":false,"date":"notselected"},"MATH053":{"completed":false,"date":"notselected"},"CHEM011":{"completed":false,"date":"notselected"},"PHYS031":{"completed":false,"date":"notselected"},"PHYS032":{"completed":false,"date":"notselected"},"PHYS033":{"completed":false,"date":"notselected"},"ELEN050":{"completed":false,"date":"notselected"},"ELEN153":{"completed":false,"date":"notselected"}}';
        return [localStorage.requirements, expected];
    },

    add_multiple_classes: function() {
        $('#classInput').val('engr1 coen10, coen11');
        $('#classInputForm').submit();

        var expected = '{"ENGR001":{"completed":true,"date":"notselected"},"COEN010":{"completed":true,"date":"notselected"},"COEN011":{"completed":true,"date":"notselected"},"COEN012":{"completed":false,"date":"notselected"},"COEN019":{"completed":false,"date":"notselected"},"COEN020":{"completed":false,"date":"notselected"},"COEN021":{"completed":false,"date":"notselected"},"COEN070":{"completed":false,"date":"notselected"},"COEN122":{"completed":false,"date":"notselected"},"COEN146":{"completed":false,"date":"notselected"},"COEN171":{"completed":false,"date":"notselected"},"COEN174":{"completed":false,"date":"notselected"},"COEN175":{"completed":false,"date":"notselected"},"COEN177":{"completed":false,"date":"notselected"},"COEN179":{"completed":false,"date":"notselected"},"Elective_1":{"completed":false,"date":"notselected"},"Elective_2":{"completed":false,"date":"notselected"},"Elective_3":{"completed":false,"date":"notselected"},"English_1":{"completed":false,"date":"notselected"},"English_2":{"completed":false,"date":"notselected"},"ENGL181":{"completed":false,"date":"notselected"},"Western_Culture_1":{"completed":false,"date":"notselected"},"Western_Culture_2":{"completed":false,"date":"notselected"},"Sociology":{"completed":false,"date":"notselected"},"United_States":{"completed":false,"date":"notselected"},"World_Culture_Society":{"completed":false,"date":"notselected"},"Ethics":{"completed":false,"date":"notselected"},"Religious_Studies_1":{"completed":false,"date":"notselected"},"Religious_Studies_2":{"completed":false,"date":"notselected"},"Religious_Studies_3":{"completed":false,"date":"notselected"},"Educational_Enrichment":{"completed":false,"date":"notselected"},"Senior_Design_1":{"completed":false,"date":"notselected"},"Senior_Design_2":{"completed":false,"date":"notselected"},"Senior_Design_3":{"completed":false,"date":"notselected"},"MATH011":{"completed":false,"date":"notselected"},"MATH012":{"completed":false,"date":"notselected"},"MATH013":{"completed":false,"date":"notselected"},"MATH014":{"completed":false,"date":"notselected"},"AMTH106":{"completed":false,"date":"notselected"},"AMTH108":{"completed":false,"date":"notselected"},"MATH053":{"completed":false,"date":"notselected"},"CHEM011":{"completed":false,"date":"notselected"},"PHYS031":{"completed":false,"date":"notselected"},"PHYS032":{"completed":false,"date":"notselected"},"PHYS033":{"completed":false,"date":"notselected"},"ELEN050":{"completed":false,"date":"notselected"},"ELEN153":{"completed":false,"date":"notselected"}}';
        return [localStorage.requirements, expected];
    },

    class_starts_in_uncompleted_list: function() {
        return [$('#uncompletedUnscheduledList').children().first().prop('outerHTML'), '<li>ENGR001</li>'];
    },

    class_is_not_in_uncompleted_list_on_entry: function() {
        $('#classInput').val('engr1');
        $('#classInputForm').submit();

        return [$('#uncompletedUnscheduledList').children().first().prop('outerHTML'), '<li>COEN010</li>'];
    },

    class_moves_to_completed_list_on_entry: function() {
        $('#classInput').val('engr1');
        $('#classInputForm').submit();

        return [$('#completedUnscheduledList').children().first().prop('outerHTML'), '<li>ENGR001</li>'];
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
    
    clicked_class_turns_green: function() {
        $('#ENGR001').click();

        return [$('#ENGR001listEntry').css('background-color'), 'rgb(144, 238, 144)'];
    },
	
	checked_class_turns_green: function() {
        $('#ENGR001listEntry').click();

        return [$('#ENGR001listEntry').css('background-color'), 'rgb(144, 238, 144)'];
    },

    completed_class_is_not_in_calendar: function() {
        $('#classInput').val('engr1');
        $('#classInputForm').submit();

        // janky way to get the tbody
        var tbody = $('#Fa1').parent().parent().parent().prop('outerHTML');

        return [tbody.indexOf('ENGR001'), -1];
    },

    scheduled_uncompleted_class_is_not_in_unscheduled_list: function() {
        $('#classInput').val('engr1');
        $('#classInputForm').submit();

        return [$('#uncompletedUnscheduledList').children().first().prop('outerHTML'), '<li>COEN010</li>'];
    },

    scheduled_uncompleted_class_is_in_calendar: function() {
        $('#ENGR001dropdown').val('Fa1');
        drawCalendar();
        colorCode();
        saveStatus();

        var li = $('#Fa1').children().first().children().first().prop('outerHTML');
        var inBox = li.indexOf('ENGR001') > -1;

        return [inBox, true];
    },

    scheduled_completed_class_is_in_calendar: function() {
        $('#classInput').val('engr1');
        $('#classInputForm').submit();
        $('#ENGR001dropdown').val('Fa1');
        drawCalendar();
        colorCode();
        saveStatus();

        var li = $('#Fa1').children().first().children().first().prop('outerHTML');
        var inBox = li.indexOf('ENGR001') > -1;

        return [inBox, true];
    },

    scheduled_uncompleted_class_is_yellow: function() {
        $('#ENGR001dropdown').val('Fa1');
        drawCalendar();
        colorCode();
        saveStatus();

        return [$('#Fa1').children().first().children().first().css('background-color'), 'rgb(255, 255, 102)'];
    },

    scheduled_completed_class_is_green: function() {
        $('#classInput').val('engr1');
        $('#classInputForm').submit();
        $('#ENGR001dropdown').val('Fa1');
        drawCalendar();
        colorCode();
        saveStatus();

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
        results = tests[name]();
        if (results[0] === results[1]) {
            console.log(prettyName + ' %cPASS', 'background: #222; color: #bada55');
            passcount++;
        } else {
            console.log(prettyName + ' %cFAIL', 'background: red; color: white');
            console.log('got ' + results[0] + ' and expected ' + results[1]);
            failcount++;
        }

        // clear up to start again
        clearForm();
        saveStatus();
    }

    console.log('----------------------------------------');
    console.log('----------------------------------------');

    // summarize
    if (failcount === 0) {
        console.log('%c ALL TESTS PASSED!!! :D ', 'background: #222; color: #bada55');
    } else {
        console.log('%c' + passcount + ' tests passed', 'background: #222; color: #bada55');
        console.log('%c' + failcount + ' tests failed', 'background: red; color: white');
    }
}

console.log('Test harness loaded...');
// give the ajax time to load
// setTimeout(runTests, 1000);
