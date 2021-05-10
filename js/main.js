$(document).ready(function() {



    $("[data-tab]").on("click", function() {
        // let tabs = $('.todo-list').data('tabContent', $(this).data('tab'));
        let tabs = document.querySelectorAll('[data-tab-content]')

        console.log(tabs);
        // tabs.forEach(e => {
        //     console.log($(e).data());
        // showList()
        // });
        // console.log($(this).closest('.todo-menu-wrapper').siblings('.todo-list-wrapper')
        // .find('.todo-list').data('tabContent' , $(this).data('tab')));

    });

    /*$("[data-tab]").on("click", function(e) {
        let tabCurrent = $(this).attr('data-tab');

        $(document).find('[data-tab]').hide();
        $(document).find('[data-tab-content=' + tabCurrent + ']').show();

        //let content = tabCurrent;
        //$(document).find('[data-tab-content]').children().remove();
        //$(document).find('[data-tab-content]').append('<div class="content">' + content + '</div>');
    });*/
});