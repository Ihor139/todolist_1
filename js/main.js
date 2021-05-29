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
  })

  //open popup info task

  $(document).on('click', '.todo-item-info', function () {
    $(this).closest('.todo-item').find('.popup').addClass('__active');
  })

  //close popup

  $(document).on('click', function (e) {
    if ($(e.target).is(".popup__content") || $(e.target).is(".popup")) {
      $('.popup').removeClass('__active');
    }
  });

  $(document).on('click', '.popup__close', function () {
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

  let ref = database.ref('todolist/list');
  ref.on('value', getData, errData);


  //create task

  function create(elBtn) {

    let nameValue = elBtn.closest('form').querySelector('.name_of_task').value;
    let tabValue = elBtn.closest('form').querySelector('.popup__select').value.toLowerCase();
    let infoValue = elBtn.closest('form').querySelector('textarea').value;

    const todoItem = {
      nameTask: nameValue,
      tabValue: tabValue,
      infoTask: infoValue,
    }

    ref.push(todoItem);
  }

  function getData(data) {
    let todos = data.val();
    let keys = Object.keys(todos);
    let todoItems = document.querySelectorAll('.todo-item');

    for (let i = 0; i < todoItems.length; i++) {
      todoItems[i].remove();
    }
    for (let i = 0; i < keys.length; i++) {
      let k = keys[i];
      let nameTask = todos[k].nameTask;
      let tabValue = todos[k].tabValue;
      let infoTask = todos[k].infoTask;
      createElement(nameTask, tabValue, infoTask)
    }

  }

  function errData(err) {
    console.log(err);
    console.log('Error');
  }


  function filterTodoItems(tabValue, todoItem) {

    let todolists = document.querySelectorAll('.todo-list');

    todolists.forEach(e => {
      let listAttr = e.getAttribute('data-tab-content').toLowerCase();

      if (listAttr === tabValue) {
        e.appendChild(todoItem);
      }
    })
  }

  function createElement(nameTask, tabValue, infoTask) {

    // check-uncheck icon
    let checkIcoTick = document.createElement('i');
    checkIcoTick.classList.add('far', 'fa-check-circle');

    let checkIcoX = document.createElement('i');
    checkIcoX.classList.add('fas', 'fa-times');

    let itemCheck = document.createElement('div');
    itemCheck.classList.add('todo-item-check');
    itemCheck.appendChild(checkIcoTick, checkIcoX);

    // info icon

    let infoIcon = document.createElement('i');
    infoIcon.classList.add('fas', 'fa-info');

    let infoBtn = document.createElement('div');
    infoBtn.classList.add('todo-item-info')
    infoBtn.appendChild(infoIcon);

    // title -itemName

    let itemName = document.createElement('div')
    itemName.classList.add('todo-item-text', 'font--middle--regular');
    itemName.textContent = nameTask;
    itemName.append(infoBtn);

    // info popup

    let infoTitle = document.createElement('div');
    infoTitle.classList.add('todo-info-title', 'font--middle--regular');
    infoTitle.textContent = nameTask;

    let infoText = document.createElement('div');
    infoText.classList.add('todo-info-text');
    infoText.textContent = infoTask;

    let infoClose = document.createElement('div');
    infoClose.classList.add('popup__close');
    infoClose.appendChild(checkIcoX);

    let infoWrap = document.createElement('div');
    infoWrap.classList.add('popup__info');
    infoWrap.append(infoTitle, infoClose, infoText);

    let infoBody = document.createElement('div');
    infoBody.classList.add('popup', 'popup__task-info');

    infoBody.append(infoWrap);

    let todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');

    todoItem.append(itemCheck, itemName, infoBody);

    // filter todo items

    filterTodoItems(tabValue, todoItem);
  }

});
