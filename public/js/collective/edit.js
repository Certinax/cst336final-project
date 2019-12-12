$(document).ready(() => {
  $("#createCollective").on("click", () => {
    console.log("create from click");
    updateCollective();
  });
  $("#deleteCollective").on("click", () => {
    console.log("delete from click");
    deleteCollective();
  });
});

function updateCollective() {
  $.ajax({
    url: "/collective/edit",
    method: "put",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({
      name: $("#collectiveName").val(),
      description: $("#description").val(),
      school: $("#school").val()
    }),
    success: function(result) {
      console.log(result);
      if (result.success) {
        window.location.href = "/collective";
      } else {
        $("#collectiveFeedback").html(result.text);
      }
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function deleteCollective() {
  $.ajax({
    url: "/collective/delete",
    method: "delete",
    dataType: "json",
    contentType: "application/json",
    success: function(result) {
      console.log(result);
      if (result.success) {
        window.location.href = "/collective";
      } else {
        $("#collectiveFeedback").html(result.text);
      }
    },
    error: function(error) {
      console.log(error);
    }
  });
}
