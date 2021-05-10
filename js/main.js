$(document).ready(function () {
    
  

  $("[data-tab]").on("click", function () {
    console.log($('.todo-list-wrapper').find('.todo-list').data('tabContent', $(this).data('tab')));
    
    console.log($(this).closest('.todo-menu-wrapper').siblings('.todo-list-wrapper')
    .find('.todo-list').data('tabContent' , $(this).data('tab')));
  });
});
