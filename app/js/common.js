/*$(document).ready(function () {
  $(".header__form").submit(function(){
    var $data = {};
    $(".header__form").find ("input").each(function() {
      $data[this.name] = $(this).val();
    });
    $.ajax({
        type: "POST",
        url: "/assets/components/apiranhigs/action.php",
        data: $data,
    });
    return false;
  });
});*/
document.addEventListener('DOMContentLoaded', function(){
  'use strict'
    const forms = () => {
      const form = document.querySelectorAll('form');
      const inputs = document.querySelectorAll('input');
      //Сообщение об отправке
      const messege = {
          loading: 'Загрузка...',
          success: 'Спасибо, скоро мы с вами свяжемся',
          error: 'Что-то пошло не так...'
      };
      
      //Отправка запроса
      const postData = async (url, data) => {
          document.querySelector('.status').textContent = messege.loading;
          let res = await fetch(url, {
              method: 'POST',
              body: data
          });

          return await res.text();
      };
      //Очищение формы
      const clearInputs = () => {
          inputs.forEach(item => {
              item.value = '';
          });
      };

      //Перебираем формы
      form.forEach(item => {
          item.addEventListener('submit', (e) => {
              e.preventDefault();

              //Помещаем в форму сообщение об отправке
              let statusMessege = document.createElement('span');
              statusMessege.classList.add('status');
              item.appendChild(statusMessege);

              //Собираем данные из формы
              const formData = new FormData(item);
              //Отправляем данные на сервер
              postData('/assets/components/apiranhigs/action.php', formData)
                  .then(res => {
                      console.log(res);
                      statusMessege.textContent = messege.success;
                  })
                  .catch(() => statusMessege.textContent = messege.error)
                  .finally(() => {
                      clearInputs();
                      setTimeout(() => {
                          statusMessege.remove();
                      }, 3000);
                  });
          });
      });
    };
    forms(); 
});


$(function() {
  $.ajaxSetup({
    headers: {
        "XSRF-TOKEN": Cookies.get('XSRF-TOKEN') || null,
      },
  });
});
