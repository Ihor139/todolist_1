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

    // change title annd counter
    $(document).find('[data-tab-title]').html(titleCurrent).css('color', colorCurrent);
    $(document).find('[data-title-counter]').html(counterCurrent).css('color', colorCurrent);
    $(document).find("[data-tab-content=" + tabCurrent + "]").show();

    // get length of content list
    console.log($(document).find('[data-tab-content]'));
    
    // let content = tabCurrent;
    // $(document).find('[data-tab-content]').children().remove();
    // $(document).find('[data-tab-content]').append('<div class="content">' + content + '</div>');
  });
});
