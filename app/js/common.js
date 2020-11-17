$(document).ready(function () {
  $('#fancyalert').hide();
  $(".header__form").submit(function(){
    var $data = {};
    $(".header__form").find ("input").each(function() {
      $data[this.name] = $(this).val();
    });
    $.ajax({
        type: "POST",
        url: "/assets/components/apiranhigs/action.php",
        data: $data,
    })
    .done(function() {
        $.fancybox.open({
            src: '#fancyalert',
        });
        $(".header__form").trigger("reset");
    })
    .fail(function() {
      $.fancybox.open({
        src: '#fancyerror',
    });
    })
    return false;
  });

  $(function() {
    $.ajaxSetup({
      headers: {
          "XSRF-TOKEN": Cookies.get('XSRF-TOKEN') || null,
        },
    });
  });
});

