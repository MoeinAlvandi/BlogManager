function showConfirmableSweetAlert(title, message) {
    return new Promise((resolve) => {
        Swal.fire({
            title: title,
            text: message,
            icon: "question",
            customClass: {
                container: "sweetalert2-container"
            },
            showCancelButton: true,
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#dc3545",
            confirmButtonText: "تایید",
            cancelButtonText: "لغو",
        }).then((result) => {
            resolve(result = result.isConfirmed);
        });
    });
}

let isHandlingEvent;

async function showConfirmableAlert(event, title, message) {
    if (isHandlingEvent) return;
    isHandlingEvent = true;
    event.preventDefault();
    event.stopImmediatePropagation();
    let result = await showConfirmableSweetAlert(title, message);
    if (result === true)
        $(event.target).trigger(event.type);
    isHandlingEvent = false;
}

let theme = localStorage.getItem('template-theme') ?? "light";
var isDarkTheme = theme === "dark";
var spinnerColorClass = isDarkTheme ? "text-light" : "text-danger";

function open_waiting() {
    $.blockUI({
        message: `<div class="spinner-border ${spinnerColorClass}" role="status"></div>`,
        css: {
            background: "transparent",
            border: "none",
            outline: "none"
        }
    });
}

function close_waiting() {
    $.unblockUI();
}

function initialImageInputs() {
    $("[ImageInput]").change(function () {
        let x = $(this).attr("ImageInput");
        let submitFormAfterUpload = $(this).attr("SubmitFormAfterUpload");

        if (submitFormAfterUpload !== null && submitFormAfterUpload !== undefined && submitFormAfterUpload !== "") {
            $(`#${submitFormAfterUpload}`).submit();
        } else {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    $("[ImageFile=" + x + "]").attr('src', e.target.result);
                    if (this.files && this.files[0]) {
                        let fileName = this.files[0].name;
                        let imageName = $("[ImageName=" + x + "]");
                        if (imageName.prop("tagName") == "INPUT")
                            imageName.val(fileName);
                        else
                            imageName.html(fileName);
                    }
                };
                reader.readAsDataURL(this.files[0]);
            }
        }
    });

    $("[ImageButton]").click(function (e) {
        let x = $(this).attr("ImageButton");
        $("[ImageInput=" + x + "]").click();
    });
}

function initializeSelect2Components() {
    $("[data-select2-url]").each(function () {
        let $dropdownParent = $(this).closest(".modal");
        if ($dropdownParent.length === 0) {
            $dropdownParent = null;
        }

        let url = $(this).attr("data-select2-url")
        let additionalData = $(this).attr("data-select2-additional-item") | undefined;
        let page;
        $(this).select2({
            language: {
                searching: function () {
                    return getResource("Searching...");
                },
                noResults: function () {
                    return getResource("NotFound");
                },
                loadingMore: function () {
                    return getResource("ShowMore...");
                }
            },
            ajax: {
                url: url,
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    page = params.page || 1;
                    if (additionalData !== undefined && additionalData !== null && additionalData !== "null") {
                        return {
                            additionalItem: additionalData,
                            parameter: params.term,
                            page: params.page || 1
                        };
                    }
                    return {
                        parameter: params.term,
                        page: params.page || 1
                    };
                },
                processResults: function (data) {

                    let totalPageCount = data.pageCount;
                    let results = data.entities;


                    if (totalPageCount > page) {
                        return {
                            results: results,
                            pagination: {
                                more: true
                            }
                        };
                    } else {
                        return {
                            results: results,
                        };
                    }
                },
                cache: true
            },
            dropdownParent: $dropdownParent// Ensures dropdown is within the modal
        });
        $(this).on('select2:opening', function (event) {
            additionalData = event.target.getAttribute("data-select2-additional-item");
        });
    });

    $('[select2]').each(function () {
        let $dropdownParent = $(this).closest(".modal");
        if ($dropdownParent.length === 0) {
            $dropdownParent = null;
        }
        $(this).select2({
            dropdownParent: $dropdownParent,// Ensures dropdown is within the modal
            dropdownCss: {'z-index': 10000} // Custom z-index
        });
    });
}

function initializeDatePicker() {
    //region date and time picker

    $("[datepicker]").pDatepicker({
        observer: true,
        format: 'YYYY/MM/DD',
        initialValue: false,
        autoClose: true,
        todayHighlight: true,
        onSelect: formatFloatingLabel,
        altField: 'observer-example-alt',
        calendar: {
            persian: {
                leapYearMode: 'astronomical'
            }
        }
    });


    $("[datetimepicker]").pDatepicker({
        observer: true,
        format: 'YYYY/MM/DD HH:mm',
        altField: 'observer-example-alt',
        autoClose: true,
        todayHighlight: true,
        initialValue: false,
        onSelect: formatFloatingLabel,
        timePicker: {
            enabled: true,
        },
        calenderType: "gregorian",
        calendar: {
            type: "gregorian", // allows only the Persian calendar type
            locale: "en" // sets the language/locale to English
        }
    });

    $("[timepicker]").pDatepicker({
        observer: true,
        format: 'HH:mm',
        initialValue: false,
        autoClose: true,
        todayHighlight: true,
        "onlyTimePicker": true,
        onSelect: formatFloatingLabel,
        altField: 'observer-example-alt',
        "timePicker": {
            "enabled": true,
            "step": 1,
            "hour": {
                "enabled": true,
                "step": null
            },
            "minute": {
                "enabled": true,
                "step": null
            },
            "second": {
                "enabled": false,
                "step": null
            },
            "meridian": {
                "enabled": false
            }
        }
    });

    let TimeinputsWithValues = [];

    Array.from(document.querySelectorAll("[datepicker]")).forEach(function (item) {
        TimeinputsWithValues.push({input: item, value: item.value});
    });

    Array.from(document.querySelectorAll("[datetimepicker]")).forEach(function (item) {
        TimeinputsWithValues.push({input: item, value: item.value});
    });

    Array.from(document.querySelectorAll("[timepicker]")).forEach(function (item) {
        TimeinputsWithValues.push({input: item, value: item.value});
    });

    Array.from(document.querySelectorAll(".datepicker-container")).forEach(function (item) {
        item.querySelector(".pwt-btn-today").click();
    });

    Array.from(TimeinputsWithValues).forEach(function (item) {
        $(`#${item.input.id}`).val(item.value);
    });

    //endregion
}


function reinitializeTemplateComponents(selector) {
    try {
        window.initializeCkEditor(selector);
        initializeSelect2Components();
        initializeDatePicker();
        formatFloatingLabel();
        initialMaps();
        initialImageInputs();

        $('[data-bs-toggle="tooltip"]').tooltip();
    } catch (error) {
        console.error(error);
    }
}

function validateFormByElement(elem) {
    var $form = $(elem);

    $.validator.unobtrusive.parse($form);

    $form.find('input:not([no-validation]), select:not([no-validation]), textarea:not([no-validation])').on('input change', function () {
        toggleValidationClass($(this));
    });

    $form.on('submit', function (e) {
        if (!$form.valid()) {
            e.preventDefault();
            e.stopPropagation();

            $form.find('input:not([no-validation]), select:not([no-validation]), textarea:not([no-validation])').each(function () {
                toggleValidationClass($(this));
            });
        }
    });
}

function validateForms() {
    $.validator.unobtrusive.parse('form:not([no-validation])');

    $(document).on('input change', 'input:not([no-validation]), select:not([no-validation]), textarea:not([no-validation])', function () {
        toggleValidationClass($(this));
    });

    $('form:not([no-validation])').each(function () {
        var $form = $(this);

        $form.on('submit', function (e) {
            $form.validate().settings.ignore = ":hidden:not([ckeditor])";

            $form.find('textarea[ckeditor]').each(function () {
                const editorInstance = $(this).data('ckeditorInstance');
                if (editorInstance) {
                    const data = editorInstance.getData();
                    const normalizedData = (data === '<p>&nbsp;</p>' || data === '<p></p>') ? '' : data;
                    $(this).val(normalizedData);
                }
            });


            if (!$form.valid()) {

                e.preventDefault();
                e.stopPropagation();

                $form.find('input:not([no-validation]), select:not([no-validation]), textarea:not([no-validation])').each(function () {
                    toggleValidationClass($(this));
                });
            }
        });
    });
}

function toggleValidationClass(input) {
    let parent = input.parent();
    parent.addClass('has-feedback');
    if (input.valid()) {
        input.removeClass('form-control-danger');
        parent.removeClass('has-danger');
        parent.removeClass('has-error');

        if (input.val()) {
            parent.addClass('has-success');
            input.addClass('form-control-success');
        } else {
            parent.removeClass('has-success');
            input.removeClass('form-control-success');
        }
    } else {
        input.removeClass('form-control-success');
        parent.removeClass('has-success');

        parent.addClass('has-danger');
        parent.addClass('has-error');
        input.addClass('form-control-danger');
    }
}

function getModalSelectorByType(type) {
    let selector;
    switch (type) {
        case "sm": {
            selector = "#modal-center-sm";
            break;
        }
        case "md": {
            selector = "#modal-center-md";
            break;
        }
        case "lg": {
            selector = "#modal-center-lg";
            break;
        }
    }
    return selector;
}


function getModalDataAttributeByType(type) {
    let attribute;
    switch (type) {
        case "sm": {
            attribute = "data-modal-sm-index";
            break;
        }
        case "md": {
            attribute = "data-modal-md-index";
            break;
        }
        case "lg": {
            attribute = "data-modal-lg-index";
            break;
        }
    }
    return attribute;
}


function setModalBodyIdByType(type, index) {
    let id;
    switch (type) {
        case "sm": {
            id = "modal-center-sm-body-";
            break;
        }
        case "md": {
            id = "modal-center-md-body-";
            break;
        }
        case "lg": {
            id = "modal-center-lg-body-";
            break;
        }
    }
    return `${id}${index}`;
}

function cloneModal(type, index) {
    let selector = getModalSelectorByType(type);
    index = Number(index);
    if (index === 1) {
        return;
    }
    let modalDataAttribute = getModalDataAttributeByType(type);
    if ($(`[${modalDataAttribute}="${index}"]`).length > 0) {
        return;
    }

    let clonedModal = $(selector).clone(false, false);

    clonedModal.attr("id", "");
    clonedModal.attr(modalDataAttribute, index);
    clonedModal.find(".modal-title").attr("id", "");
    clonedModal.find(".modal-body").attr("id", setModalBodyIdByType(type, index));
    $("body").append(clonedModal);
    let clonedModalZIndex = Number(clonedModal.css("z-index"));
    clonedModal.css("z-index", clonedModalZIndex + index);
    let modalInstance = new bootstrap.Modal(clonedModal[0]);

}

function openModal(type, title, index) {
    let selector = getModalSelectorByType(type);
    index = Number(index);

    if (index === 1) {
        $(selector).modal('show');
        $(selector).find(".modal-title").html(title);
        return;
    }
    let modal = $(`[${getModalDataAttributeByType(type)}="${index}"]`);
    modal.modal("show");
    $(modal).find(".modal-title").html(title);
}


function opSmModal(title, index) {
    openModal("sm", title, index);
}

function opModal(title, index) {

    openModal("md", title, index);
}

function opLgModal(title, index) {
    openModal("lg", title, index);
}

function closeModalByType(type, index) {
    let selector = getModalSelectorByType(type);
    if (index === 1) {
        let selectedModal = $(selector);
        selectedModal.modal('hide');
        selectedModal.find(".modal-title").html("");
        return;
    }
    let modal = $(`[${getModalDataAttributeByType(type)}="${index}"]`);
    modal.modal("hide");
    modal.removeClass("show");

}

function closeLgModal(index = 1) {
    closeModalByType("lg", index);
}

function closeModal(index = 1) {
    closeModalByType("md", index);
}


function closeSmModal(index = 1) {
    closeModalByType("sm", index);
}

function onAjaxFailure(xhr, status, error) {
    close_waiting();
    showToaster(xhr.responseText, 'error');
}

function closeModalByElementParent(element) {
    let modal = $(element).closest(".modal");
    modal.modal("hide");
}

function closeAllModals() {
    let modal = $(".modal").closest(".modal");
    modal.modal("hide");
}

function onAjaxSuccess(data, status, xhr) {
    close_waiting();
    showToaster(xhr.responseText, 'success');
}


function ajaxSubstitutionFormId(formId) {
    let form = $("#" + formId);
    if (form.length === 0) {
        console.error("Form with ID '" + formId + "' does not exist.");
        return;
    }

    form.attr("data-ajax", "true");
    form.attr("data-ajax-update", "#render-body");
    form.attr("data-ajax-mode", "replace");
    form.attr("data-ajax-method", "get");
    form.attr("data-ajax-success", "reinitializeTemplateComponents();");

    form.find("#IsAjax").val(true);

    form.submit();

}

$(() => {
    initializeSelect2Components();
    initializeDatePicker();
    validateForms();
    initialImageInputs();
    $(document).on('click', '[data-bs-dismiss="modal"]', function () {
        $(this).closest('.modal').removeClass("show");
    });
})