function buildList() {
    $.each(requirements, function(requirementgroupName, requirementGroup){
      console.log("GROUP: " + requirementgroupName);
      $.each(requirementGroup, function(requirementName, satisfiedBy){
        console.log("-->" + requirementName);
      });
    });
}

function loadRequirements() {
    $.ajax({
        dataType: "json",
        url: requirementsUrl,
        success: function(requirementsData) {
            requirements = requirementsData;
            buildList();
        }
    });
}

loadRequirements();
