function ConfirmDelete(element, requestUrl, formId = null) {
    Swal.fire({
        title: "حذف",
        text: "آیا از حذف مطمئن هستید ؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "تایید",
        cancelButtonText: "لغو",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: requestUrl,
                type: "Get",
                beforeSend: function () {
                    open_waiting();
                },
                success: function (response) {
                    close_waiting();
                    let trElement = $(element).closest('tr');
                    let tdElement = $(element).closest("td");

                    trElement.addClass("removed");
                    tdElement.find('.removeAfterDelete')
                        .addClass("d-none");

                    $(element).html('<iconify-icon icon="solar:undo-left-round-outline" width="24" height="24"></iconify-icon>');
                    $(element).attr("data-bs-original-title", "بازگردانی")
                    $(element).attr("onclick", `ConfirmRecover(this, '${requestUrl}')`)

                    $(element)
                        .removeClass("text-danger")
                        .addClass("text-info");

                    if (formId) {
                        ajaxSubstitutionFormId(formId);
                    }
                    showToaster(response, "success");
                },
                error: function (xhr) {
                    close_waiting();
                    showToaster(response.message, "error");
                }
            });
        }
    });
}

function ConfirmRecover(element, requestUrl, formId = null) {
    Swal.fire({
        title: "بازگردانی",
        text: "آیا از بازگردانی مطمئن هستید ؟",
        showDenyButton: true,
        icon: 'warning',
        confirmButtonText: "تایید",
        denyButtonText: "لغو"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: requestUrl,
                type: "get",
                beforeSend: function () {
                    open_waiting();
                },
                success: function (response) {
                    close_waiting();
                    
                    let trElement = $(element).closest('tr');
                    let tdElement = $(element).closest("td");

                    trElement.removeClass("removed");
                    tdElement.find('.removeAfterDelete')
                        .removeClass("d-none");

                    $(element).html('<iconify-icon icon="solar:trash-bin-trash-outline" width="22" height="22"></iconify-icon>');

                    $(element).attr("data-bs-original-title", "حذف")
                    $(element).attr("onclick", `ConfirmDelete(this, '${requestUrl}')`)

                    $(element)
                        .removeClass("text-info")
                        .addClass("text-danger");

                    if (formId) {
                        ajaxSubstitutionFormId(formId);
                    }
                    showToaster(response, "success");
                        
                    close_waiting();
                },
                error: function (err) {
                    close_waiting();
                    showToaster(err.responseText, "error");
                }
            });
        }
    });
}


function ConfirmHardDelete(element, requestUrl, formId = null) {    
    Swal.fire({
        title: "حذف",
        text: "آیا از حذف مطمئن هستید ؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "تایید",
        cancelButtonText: "لغو",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: requestUrl,
                type: "Get",
                beforeSend: function () {
                    open_waiting();
                },
                success: function (response) {
                    close_waiting();
                    let trElement = $(element).closest('tr');
                    let tdElement = $(element).closest("td");

                    trElement.addClass("removed");
                    tdElement.find('.removeAfterDelete')
                        .addClass("d-none");
                    
                    $(element).remove();
                    if (formId) {
                        ajaxSubstitutionFormId(formId);
                    }
                    showToaster(response, "success");
                },
                error: function (xhr) {
                    close_waiting();
                    showToaster(response.message, "error");
                }
            });
        }
    });
}