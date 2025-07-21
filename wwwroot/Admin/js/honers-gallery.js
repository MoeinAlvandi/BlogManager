Dropzone.options.honnorsGalleryDropzone = {
    paramName: 'image',
    maxFilesize: 15,
    acceptedFiles: 'image/jpeg/,image/png,image/jpg,/image/webp',
    parallelUploads: 1,
    init: function () {

        this.on("sending", function (file, xhr, formData) {
            $(".dz-message").css("display", "none");
        });
        this.on("success", function (file, response) {
            const image = $(`
                <div
                    class="col-12 col-md-6 col-lg-3 mb-4 rounded-3 gallery-image-container">
                    <div class="position-relative w-100 h-100">
                        <img class="w-100 h-100 rounded-3"
                             src="${response.path}${response.imageName}"
                             alt="project-image">
                        <a type="button"
                            href="/Admin/Honor/DeleteImageFromGallery?honorId=${response.honorId}&ImageName=${response.imageName}"
                            data-ajax="true"
                            data-ajax-success="onAjaxSuccess(data, status, xhr);DeleteImage(element);"
                            onclick="showConfirmableAlert(event, 'حذف تصویر', 'آیا از حذف تصویر مطمئن هستید ؟')"
                            class="dropzone-item-hover rounded-3">
                            <iconify-icon class="text-danger" icon="mdi:remove-bold" width="75"
                                          height="75"></iconify-icon>
                        </a>
                    </div>
                </div>`);

            $("#gallery-images").append(image);
            $("#no-images-alert").remove();
            $(".dz-preview").fadeOut(2000);
            setInterval(function () {
                $(".dz-preview").remove();
                $(".dz-message").css("display", "block");
            }, 2000);
        });
        this.on("error", function (file, response) {
            showToaster(response,'error','خطا')
        });
    }
}

const DeleteImage = (element) => {
    $(element).parents(".gallery-image-container").remove();
    if ($("#gallery-images > .gallery-image-container").length < 1) {
        $("#gallery-images").html(`<div class="col-12">
                                <div class="alert alert-warning d-flex align-items-center" id="no-images-alert" role="alert">
                                    <span class="badge badge-center rounded-pill bg-warning border-label-warning p-3 me-2">
                                        <iconify-icon icon="material-symbols:warning-outline-rounded" width="28" height="28"></iconify-icon>
                                    </span>
                                    <div class="d-flex flex-column ps-1">
                                        <h6 class="alert-heading d-flex align-items-center fw-bold mb-1">هشدار !</h6>
                                        <span>تصویری برای نمایش در گالری این افتخار موجود نمی باشد</span>
                                    </div>
                                </div>
                            </div>`)
    }
}
