$(document).ready(function () {

  $(".data-tab-parent").on("click", '[data-tab]', function (e) {
    let tabCurrent = $(this).attr("data-tab"),
      counterCurrent = $(this).find(".btn-task-counter").text().trim(),
      titleCurrent = $(this).find(".tab-btn-name").text().trim(),
      colorCurrent = $(this).find(".tab-btn-icon").css("background-color");

    // change active element
    $("[data-tab]").removeClass('__active');
    $(this).addClass('__active');

    // hide-show tab content
    $(document).find("[data-tab-content]").removeClass('__active').hide();
    $(document).find("[data-tab-content=" + tabCurrent + "]").show();

    // change title and counter

    $(document).find('[data-tab-title]').html(titleCurrent).css('color', colorCurrent);
    // $(document).find('[data-title-counter]').html(counterCurrent).css('color', colorCurrent);
    $(document).find("[data-tab-content=" + tabCurrent + "]").addClass('__active').show();

  });

  //open popup add task

  $('.add-btn').on('click', function (e) {
    $('.popup__add-task').addClass('__active');
  })

  //open popup add task

  $('.add-list-btn').on('click', function (e) {
    $('.popup__add-list').addClass('__active');
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

  // add list

  $('.js_add-list-btn').on('click', function () {

    let newNameList = $(this).closest('.popup').find('input').val()
    createTaskList(newNameList);

    $(this).closest('.popup').find('input').val('')
    $(this).closest('.popup').removeClass('__active');
  })

  //remove list

  //   if($('[data-tab-content]' === 'today')) {console.log(11111);
  //   $('.todo-list-remove').hide()
  // }else(
  //   $('.todo-list-remove').show()
  // )


  $('.todo-list-remove').on('click', function () {
    removeList(this);
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

    let nameValue = elBtn.closest('form').querySelector('.name_of_task').value;
    let tabValue = elBtn.closest('form').querySelector('.popup__select').value.toLowerCase();
    let infoValue = elBtn.closest('form').querySelector('textarea').value;

    const todoItem = {
      nameTask: nameValue,
      tabValue: tabValue,
      infoTask: infoValue,
    }


    let todolists = document.querySelectorAll('.todo-list');

    todolists.forEach(e => {
      let listAttr = e.getAttribute('data-tab-content').toLowerCase();

      if (listAttr === tabValue) {
        ref = database.ref("todolist/" + tabValue)
        ref.push(todoItem);
      }
    })
  }

  function getData(data) {
    let todolists = data.val();
    let keys = Object.keys(todolists);
    let todoItems = document.querySelectorAll('.todo-item');
    let todoTabsName = document.querySelectorAll('.todo-menu-tab-item');
    let todoLists = document.querySelectorAll('.todo-list-new');
    let options = document.querySelectorAll('.new_option');

    function removeEl() {
      for (let i = 0; i < arguments.length; i++) {
        let currentArr = arguments[i];

        for (let i = 0; i < currentArr.length; i++) {
          console.log(currentArr[i]);
          currentArr[i].remove();
        }
      }
    }

    removeEl(todoItems, todoTabsName, todoLists, options);

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];

      createList(key);
      addOptionSelect(key);

      let listName = Object.keys(todolists[key]);

      for (let i = 0; i < listName.length; i++) {
        let taskKey = listName[i];

        let nameTask = todolists[key][taskKey].nameTask;
        let tabValue = todolists[key][taskKey].tabValue;
        let infoTask = todolists[key][taskKey].infoTask;

        createTodo(nameTask, tabValue, infoTask)

      }
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

  //check task length

  function setTaskCounter(tabValue, todoItem) {
    let todoCounters = document.querySelectorAll('[data-tab-counter]');

    todoCounters.forEach(e => {
      let parentAttr = e.closest('[data-tab]').getAttribute('data-tab').toLowerCase();

      if (parentAttr === tabValue) {
        let count = todoItem.closest('.todo-list').children.length;

        e.textContent = count;
      }
    })
  }

  //create new list

  function createList(key) {
    let ul = document.createElement('ul');

    ul.classList.add('todo-list', 'todo-list-new')
    ul.setAttribute('data-tab-content', key)
    if (key !== "today" && key !== "scheduled" && key !== "all" && key !== "not-fulfilled")
      $('.todo-list-wrapper').append(ul);
    createTabName(key);
  }

  function createTabName(key) {

    let div = document.createElement('div');
    div.classList.add('todo-menu-tab-item')
    div.setAttribute('data-tab', key)
    if (key !== "today" && key !== "scheduled" && key !== "all" && key !== "not-fulfilled")
      $('.todo-menu-tabs-list').append(div)

    let spanNameWrapper = document.createElement('span');
    spanNameWrapper.classList.add('tab-btn-name-wrapper', 'font--middle--regular')
    div.appendChild(spanNameWrapper);

    let spanIco = document.createElement('span');
    spanIco.classList.add('tab-btn-icon');
    spanNameWrapper.appendChild(spanIco);

    let icon = document.createElement('i');
    icon.classList.add('fas', 'fa-list');
    spanIco.appendChild(icon);

    let spanName = document.createElement('span');
    spanName.classList.add('tab-btn-name');
    spanName.textContent = key;
    spanNameWrapper.appendChild(spanName);

    let spanCounter = document.createElement('span');
    spanCounter.classList.add('btn-task-counter', 'font--middle--bold')
    spanCounter.setAttribute('data-tab-counter', 'task-counter')
    div.appendChild(spanCounter);
  }

  // create Task

  function createTodo(nameTask, tabValue, infoTask) {


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

    // amount task

    setTaskCounter(tabValue, todoItem)
    // createTaskList();
  }

  //add option to select

  function addOptionSelect(tabname) {
    let select = document.querySelector('select[name="list_of_tabs"]')
    if (tabname !== "today" && tabname !== "scheduled" && tabname !== "all" && tabname !== "not-fulfilled") {
      let option = document.createElement('option');
      option.setAttribute('value', tabname);
      option.classList.add('new_option');
      option.textContent = tabname;
      select.appendChild(option)

    }
    setTimeout(function () {
      $(select).niceSelect('update')
    }, 100)
  }

  //remove list

  function removeList(removeBtn) {
    let curentTabContentAttr = removeBtn.closest('.todo-list-wrapper').querySelector('.todo-list.__active').getAttribute('data-tab-content');
    removeBtn.closest('.todo-list-wrapper').querySelector('.todo-list.__active').remove();
    let tabBtns = document.querySelectorAll('[data-tab]')

    tabBtns.forEach(e => {
      let dataAttr = e.getAttribute('data-tab');

      if (curentTabContentAttr === dataAttr) {
        e.remove();
        ref = database.ref('todolist/' + dataAttr)
        ref.remove();
      }
      $('[data-tab="today"]').addClass('__active')
      $('[data-tab-content ="today"]').addClass('__active')
      $('[data-tab-title]').html('Today')
      $('[data-tab-title]').css('color', 'rgb(0, 132, 255)')

    })
  }

  //create list

  function createTaskList(newNameList) {
    ref = database.ref('todolist/' + newNameList)
    ref.push('');
  }

});
