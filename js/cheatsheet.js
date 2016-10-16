// to get an array of unchecked requirements
$('.requirementMarker:not(:checked)').map(function() {
    return this.id;
}).get();

// to get an array of checked requirements
$('.requirementMarker:checked').map(function() {
    return this.id;
}).get();

// to check all requirements satisfied by a certain class
var className = 'COEN666';
$('.satisfiedBy' + className).prop("checked", true);

// to get an array of unscheduled requirements
$('.quarterDropdown option[value="notselected"]:selected').map(function() {
    return $(this).parent().get(0).id.replace('dropdown', '');
}).get();

// to get an array of requirements scheduled for a quarter
$('.quarterDropdown option[value="F1"]:selected').map(function() {
    return $(this).parent().get(0).id.replace('dropdown', '');
}).get();

// intersect using $filter. E.G. to find unscheduled requirements excluding completed
var unscheduled = $('.quarterDropdown option[value="notselected"]:selected').map(function() {
    return $(this).parent().get(0).id.replace('dropdown', '');
}).get();

var uncompleted = $('.requirementMarker:not(:checked)').map(function() {
    return this.id;
}).get();

$(unscheduled).filter(uncompleted);
