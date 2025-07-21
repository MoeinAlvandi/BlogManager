$(document).ready(function () {
    $('.repeater').repeater({
        initEmpty: false,
        show: function () {
            var form = $(this).parents("form");
            if (!form.valid()) {
                $(this).remove();
                return;
            }
            $(this).slideDown();
            $.each($(this).find(".form-group"), function (index, value) {
                var id = makeid(12);
                var input = $(this).find("input") ;
                if(input.length < 1) {
                    input=$(this).find("textarea");
                }
                input.attr("id", id);
                $(this).find("label").attr("for", id);
            });
           
            var persianId = makeid(12);

            $(this).find(".persian-li").attr("data-bs-target", "#" + persianId);
            $(this).find(".persian-tab").attr("id", persianId);

            formatFloatingLabel();
            initializeDatePicker();
            initialValidators();
        },
        hide: function (deleteElement) {
            $(this).slideUp(deleteElement);
        },
        isFirstItemUndeletable: true
    });

    $('.repeater-no-validate').repeater({
        initEmpty: false,
        show: function () {
            $(this).slideDown();
            $.each($(this).find(".form-group"), function (index, value) {
                var id = makeid(12);
                var input = $(this).find("input") ;
                if(input.length < 1) {
                    input=$(this).find("textarea");
                }
                input.attr("id", id);
                $(this).find("label").attr("for", id);
            });

            var persianId = makeid(12);
            var englishId = makeid(12);

            $(this).find(".persian-li").attr("data-bs-target", "#" + persianId);
            $(this).find(".english-li").attr("data-bs-target", "#" + englishId);

            $(this).find(".persian-tab").attr("id", persianId);
            $(this).find(".english-tab").attr("id", englishId);

            formatFloatingLabel();
            initializeDatePicker();
        },
        hide: function (deleteElement) {
            $(this).slideUp(deleteElement);
        },
        isFirstItemUndeletable: true
    });
    
});

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}