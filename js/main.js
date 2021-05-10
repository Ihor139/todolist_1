$(document).ready(function () {
    
  

  $("[data-tab]").on("click", function () {
    let tabs = $('.todo-list').data('tabContent' , $(this).data('tab'));
    let arr = Object.values(tabs);
    
    console.log(tabs);
    console.log(arr);
    arr.forEach(e => {
      console.log(e);
    });
    // console.log($(this).closest('.todo-menu-wrapper').siblings('.todo-list-wrapper')
    // .find('.todo-list').data('tabContent' , $(this).data('tab')));
    
  });
});
