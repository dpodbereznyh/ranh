$(document).ready(function () {
  $(".header__form").submit(function(){
    var $data = {};
    $(".header__form").find ("input").each(function() {
      $data[this.name] = $(this).val();
    });
    $.ajax({
        type: "POST",
        url: "/assets/components/apiranhigs/action.php",
        data: $data,
    }).done(function() {
        $.fancybox.open({
            src: '#fancyalert',
        });
        console.log($data);
        $(".header__form").trigger("reset");
    });
    return false;
  });
});

$(function() {
  $.ajaxSetup({
    headers: {
        "XSRF-TOKEN": Cookies.get('XSRF-TOKEN') || null,
      },
  });
});
