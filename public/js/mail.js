function activetab() {
  $("#inbox").addClass("active");
  $(".inp2").click(function() {
    $(".inp2").removeClass("active");
    $(this).addClass("active");
    if ($("#inbox").hasClass("active")) {
      $(".msgtab").css("visibility", "visible");
      $(".conttab").css("visibility", "visible");
    } else {
      $(".msgtab").css("visibility", "hidden");
      $(".conttab").css("visibility", "hidden");
    }
  });
};
