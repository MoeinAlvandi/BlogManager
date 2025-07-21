function formatFloatingLabel() {
    $('.floating-labels .form-control').on('focus blur', function (e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
}

function formatFloatingLabelByFilter(filter = null) {
    $(filter).on('focus blur', function (e) {
        $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
}

function selectItemFromModal(idValue, displayName, data) {
    $(`[data-select-display="${data}"]`).val(displayName);
    $(`[data-select-input="${data}"]`).val(idValue);
    $(`[data-select-input="${data}"]`).trigger("change");
    formatFloatingLabel()
}

function initialMaps() {
    $("[map]").each(function () {
        let lat = $(this).attr("lat");
        let lng = $(this).attr("lng");
        let element = $(this).get(0);

        // Initialize the map
        if (lat == null || lng == null || lat == 0 || lng == 0) {
            var map = L.map(element).setView([35.700, 51.35], 13);
        } else {
            var map = L.map(element).setView([lat, lng], 13);
        }

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
        }).addTo(map);

        var marker = null;

        if (lat == null || lng == null) {
            marker = null;
        } else {
            marker = L.marker([lat, lng]).addTo(map);
        }

        map.on('click', function (e) {
            if (marker) {
                map.removeLayer(marker);
            }

            marker = L.marker(e.latlng).addTo(map);

            document.getElementById('latitude').value = e.latlng.lat;
            document.getElementById('longitude').value = e.latlng.lng;

        });

        // Resize the map to ensure it fits the container properly
        setTimeout(function () {
            map.invalidateSize();
        }, 10);
    })
}

$(() => {
    formatFloatingLabel();
    initialMaps();
    initialTagify();


    $('.price').on('input', function () {
        let value = $(this).val();
        value = value.replace(/[^0-9,]/g, '');
        value = value.replace(/,/g, '');
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        $(this).val(value);
    });

    $('.negative-price').on('input', function () {
        let value = $(this).val();
        value = value.replace(/(?!^-)[^0-9,]/g, '');
        value = value.replace(/,/g, '');
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        $(this).val(value);
    });
    
    //#region Change Order Status
    
    let orderStatus = $("#OrderStatus");
    let orderStatusValue = orderStatus.val();
    orderStatus.data("oldValue", orderStatusValue);
    $("#OrderStatus").on("change", function () {
        $(this).closest("form").submit();
    })
    //#endregion
    
    $(`input[type="number"]`).change(function () {
        formatFloatingLabel();
    })
})

function initialTagify(){
    $("[tagify]").each(function () {
        new Tagify($(this).get(0));
    })
}

function generateSlug(titleId, slugId) {
    let title = document.getElementById(titleId).value;
    let slugInput = document.getElementById(slugId);

    if (slugInput) {
        let slug = title.toLowerCase().trim().replace(/ /g, `-`);
        slugInput.value = slug;

        formatFloatingLabelByFilter(`#${slugId}`);
        $(`#${slugId}`).trigger("change");
    }
}

function onUpdateOrderStatusFailure() {
    $("#OrderStatus").val($("#OrderStatus").data("oldValue"));
    console.log($("#OrderStatus").val())
}

function onUpdateOrderStatusSuccess() {
    $("#OrderStatus").data("oldValue", $("#OrderStatus").val());
}
