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
  //Метрика
  var ymID = 69364525;

  var metrikaGoals = function () {


      $('.js-onClickGoal').click(function () {

          var goal = this.dataset.goal;
          // var gtagGoal = this.dataset.gtagGoal;
          // var thisGoal = getCookie(goal);
          if (typeof thisGoal == "undefined") {
              if ((typeof goal !== 'undefined' || goal != '') && typeof ym !== 'undefined') {
                  ym(ymID, 'reachGoal', goal);
              }

              var date = new Date(new Date().getTime() + 720 * 3600 * 1000);
              document.cookie = goal + "=1; path=/; expires=" + date.toUTCString();
          }


      });

      $('.js-validate-form').click(function () {
          var form = $(this).closest('.js-form-default');
          var validated = 1;

          $(form).find('input[required]').each(function (indexInArray, valueOfElement) {
              if ($(valueOfElement).val() == "") {
                  validated = 0;
              }
          });

          if (validated == 0) {


              var goal = this.dataset.goal;
              // var gtagGoal = this.dataset.gtagGoal;

              if ((typeof goal !== 'undefined' || goal != '') && typeof ym !== 'undefined') {
                  ym(ymID, 'reachGoal', goal);
              }
          }
          console.log(form);
      });
  };

  $(document).ready(function () {
      metrikaGoals();
  });
});

