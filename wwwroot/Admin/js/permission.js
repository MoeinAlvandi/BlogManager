$(document).ready(function () {
    $('.form-check-input').on('change', function () {
        const isChecked = $(this).is(':checked');
        const id = $(this).data('id');
        const parentId = $(this).data('parent-id');

        $(`[data-parent-id="${id}"]`).each(function () {
            $(this).prop('checked', isChecked);

            const childId = $(this).data('id');
            $(`[data-parent-id="${childId}"]`).prop('checked', isChecked);
        });

        if (isChecked) {
            $(`#collapse-${id}`).collapse('show');
            $(`[data-parent-id="${id}"]`).each(function () {
                $(`#collapse-child-${$(this).data('id')}`).collapse('show');
            });
        } else {
            $(`#collapse-${id}`).collapse('hide');
            $(`[data-parent-id="${id}"]`).each(function () {
                $(`#collapse-child-${$(this).data('id')}`).collapse('hide');
            });
        }

        if (parentId) {
            let currentParentId = parentId;

            while (currentParentId) {
                const parent = $(`[data-id="${currentParentId}"]`);
                parent.prop('checked', true);
                currentParentId = parent.data('parent-id');
            }

            $(`#collapse-${parentId}`).collapse('show');
        }
    });
});
