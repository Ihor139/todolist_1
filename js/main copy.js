$(document).ready(function () {

  $("[data-tab]").on("click", function (e) {
    let tabCurrent = $(this).attr("data-tab"),
      counterCurrent = $(this).children(".btn-task-counter").text().trim(),
      titleCurrent = $(this).children(".tab-btn-name").text().trim(),
      colorCurrent = $(this).find(".tab-btn-icon").css("background-color");

    // change active element
    $("[data-tab]").removeClass('__active');
    $(this).addClass('__active');

    // hide-show tab content
    $(document).find("[data-tab-content]").hide();
    $(document).find("[data-tab-content=" + tabCurrent + "]").show();

    // change title and counter
    $(document).find('[data-tab-title]').html(titleCurrent).css('color', colorCurrent);
    $(document).find('[data-title-counter]').html(counterCurrent).css('color', colorCurrent);
    $(document).find("[data-tab-content=" + tabCurrent + "]").show();

  });

  let todos = document.querySelectorAll('.todo-list');
  let dataTab = $(document).find('.tab-btn-name').parent();


  if ($(todos).length != 0) {

    let dataTabElement = $(dataTab).map(elem => elem);
  };

  //open popup add task

  $('.add-btn').on('click', function (e) {
    $('.popup__add-task').addClass('__active');

    //open popup info task

    $('.todo-item-info').on('click', function () {
      $(this).closest('.todo-item').find('.popup').addClass('__active');
    })
  })

  //close popup

  $(document).click(function (e) {
    if ($(e.target).is(".popup__content") || $(e.target).is(".popup")) {
      $('.popup').removeClass('__active');
    }
  });

  $('.popup__close').click(function (e) {
    $('.popup').removeClass('__active');
  });


  // Select 
  $('select[name="list_of_tabs"]').niceSelect();


  //add task

  $('.submit_btn').on('click', function () {
    create(this);
  })




  // firebase connect and settings

  let firebaseConfig = {
    apiKey: "AIzaSyBxmjIAU3Awc186B8dF-D17YVZ464T3O5k",
    authDomain: "todolist-ri.firebaseapp.com",
    databaseURL: "https://todolist-ri-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "todolist-ri",
    storageBucket: "todolist-ri.appspot.com",
    messagingSenderId: "187255274312",
    appId: "1:187255274312:web:a6a72240c38b9fcf5b117d"
  };

  firebase.initializeApp(firebaseConfig);
  let database = firebase.database();

  let ref = database.ref('todolist');
  ref.on('value', getData, errData);

  //create task

  function create(elBtn) {
    if(validation(elBtn)){
      console.log(11111);
    }

  }

  function getData(data) {

  }

  function errData(err) {
    console.log(err);
    console.log('Error');
  }


  // validation form

  function validation(elBtn) {
    let form = elBtn.closest('form');
    validationInputText(form);
    validationTextarea(form);
    validationSelecta(form);
  }



  function validationInputText(form) {

    let inputs = form.querySelectorAll('input[type="text"]');

    inputs.forEach(e => {
      if (e.value.length !== 0 && e.value.length > 5) {
        e.classList.remove('invalid');
        return true;
      } else {
        e.classList.add('invalid');
        return false
      }
    })
  }

  function validationTextarea(form) {

    let textareas = form.querySelectorAll('textarea');

    textareas.forEach(e => {
      if (e.value.length !== 0 && e.value.length > 5) {
        e.classList.remove('invalid');
        return true;
      } else {
        e.classList.add('invalid');
        return false
      }
    })
  }

  function validationSelecta(form) {

    let selects = form.querySelectorAll('select');

    selects.forEach(e => {
      if (e.value) {
        e.closest('div').classList.remove('invalid');
        return true;
      } else {

        // e.classList.add('invalid');
        // settings for current select because using jquery select
        e.closest('div').classList.add('invalid');

        return false
      }
    })
  }


});

    // let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;  //email regex

