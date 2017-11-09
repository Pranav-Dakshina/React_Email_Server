function signAnimate()
{
  $("#SignIn")
    .click(function(event)
    {
      event.stopPropagation();
      // var $this = $(this);
      // if ($this.hasClass("clicked-once")) {
      $("#formSignUp")
        .css("animation", "popin 0.3s ease-in");
      $("#formSignUp")
        .css("-webkit-animation", "popin 0.3s ease-in");
      $(".inp2")
        .css("animation", "popin 0.3s ease-in");
      $(".inp2")
        .css("-webkit-animation", "popin 0.3s ease-in");
      $("#formSignUp")
        .css("display", "none");

      // document.getElementById('signUpImg').src='signUp.png';
      // $("#signUpImg").css("opacity", "0.6");
      // $("#signUpImg").css("-webkit-filter", "contrast(100%)");
      // $("#signUpImg").css("filter", "contrast(100%)");

      $("#formSignIn")
        .css("animation", "popout 0.3s ease-in");
      $("#formSignIn")
        .css("-webkit-animation", "popout 0.3s ease-in");
      $(".inp")
        .css("animation", "popout 0.3s ease-in");
      $(".inp")
        .css("-webkit-animation", "popout 0.3s ease-in");
      $("#formSignIn")
        .css("display", "block");
      //   $this.removeClass("clicked-once");
      // }
    });
  $("#SignUp")
    .click(function(event)
    {
      event.stopPropagation();
      $("#formSignIn")
        .css("animation", "popin 0.3s ease-out");
      $("#formSignIn")
        .css("-webkit-animation", "popin 0.3s ease-out");
      $(".inp")
        .css("animation", "popin 0.3s ease-out");
      $(".inp")
        .css("-webkit-animation", "popin 0.3s ease-out");
      $("#formSignIn")
        .css("display", "none");

      // document.getElementById('signInImg').src='signIn.png';
      // $("#signInImg").css("opacity", "1");
      // $("#signInImg").css("-webkit-filter", "contrast(120%)");
      // $("#signInImg").css("filter", "contrast(120%)");

      $("#formSignUp")
        .css("animation", "popout 0.3s ease-in");
      $("#formSignUp")
        .css("-webkit-animation", "popout 0.3s ease-in");
      $(".inp2")
        .css("animation", "popout 0.3s ease-in");
      $(".inp2")
        .css("-webkit-animation", "popout 0.3s ease-in");
      $("#formSignUp")
        .css("display", "block");
    });
}

function autoTab(obj)
{
  if (obj.value.length >= obj.maxLength && obj.nextElementSibling)
    obj.nextElementSibling.focus();
}
