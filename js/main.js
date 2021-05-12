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

    // let content = tabCurrent;
    // $(document).find('[data-tab-content]').children().remove();
    // $(document).find('[data-tab-content]').append('<div class="content">' + content + '</div>');
  });


  let todos = document.querySelectorAll('.todo-list');
  let dataTab = $(document).find('.tab-btn-name').parent();

  // console.log(todos.item());
  // let dataContent, listLength, dataTabElement;
  // dataContent = $(this).attr('data-tab-content');
  // listLength = $(this).children().length;

  if ($(todos).length != 0) {






    // get length of content list
    // let dataContent = todos.map((elem) => elem.attr('data-tab-content'));
    // let listLength = $(todos).map(() => $(this).children().length);
    // console.log(dataContent);
    // console.log(dataContent, listLength);


    // get data attr of tab button
    let dataTabElement = $(dataTab).map((elem) => elem);
    console.log(dataTabElement)
  };
});
