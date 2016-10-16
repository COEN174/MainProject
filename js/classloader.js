function buildList() {
    $.each(requirements, function(requirementgroupName, requirementGroup) {
        console.log('GROUP: ' + requirementgroupName);
        $.each(requirementGroup, function(requirementName, satisfiedBy) {
            var classRequirementName = 'req' + requirementName;
            var classSatisfierNames = satisfiedBy.map(function(satisfier) {
                return 'satisfiedBy' + satisfier;
            });
            classSatisfierNames.push(classRequirementName);
            var className = classSatisfierNames.join(' ');
            console.log(className);
        });
    });
}

function loadRequirements() {
    $.ajax({
        dataType: 'json',
        url: requirementsUrl,
        success: function(requirementsData) {
            requirements = requirementsData;
            buildList();
        }
    });
}

loadRequirements();
