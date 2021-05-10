$(document).ready(function () {
    
  

  $("[data-tab]").on("click", function () {
    // let tabs = $('.todo-list').data('tabContent' , $(this).data('tab'));
    let tabs = document.querySelectorAll('.todo-list')
    
    console.log(tabs);
    tabs.forEach(e => {
      console.log($(e).data());
      // showList()
    });
    // console.log($(this).closest('.todo-menu-wrapper').siblings('.todo-list-wrapper')
    // .find('.todo-list').data('tabContent' , $(this).data('tab')));
    
  });
});
