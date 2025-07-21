class Kind {
    static kindIds = [];
    constructor(id) {
        this.id = id;
    }

    // unused
    static GetById(id) {
        return Kind.kindIds.find(s => s.id === id);
    }

    static AddToList(id) {
        Kind.kindIds.push(new Kind(id));
    }

    static GetAllIdsSplitByComma() {
        return Kind.kindIds.map(s => s.id).join(",");
    }

    static SaveChanges() {
        $("#KindIds").val(this.GetAllIdsSplitByComma());
    }

    static SaveChangesAndHideModal() {
        this.SaveChanges();
        this.UpdateInputCount();
        $("#modal-center-lg").modal("hide");
    }

    static FillFromModel() {
        try {
            this.kindIds = [];
            const kindIdsSeperatedByComma = $("#KindIds").val();
            const kindIds = kindIdsSeperatedByComma.trim().split(",").map(kindIds => Number(kindIds));
            for (let id of kindIds) {
                if (id > 0) {
                    Kind.AddToList(id);
                }
            }
        } catch (ex) {
            console.error(ex, "failed to add role id")
        }
    }

    static Add(event, id) {
        this.AddToList(id);
        let targetElement = $(event.target).is("a") ? $(event.target) : $(event.target.parentNode);

        targetElement
            .removeClass("text-success")
            .addClass("text-danger")
            .attr("onclick", `Kind.Remove(event , ${id})`)
            .html('<iconify-icon icon="hugeicons:minus-sign-square" width="24" height="24"></iconify-icon>');
        this.UpdateInputCount();
    }

    static Remove(event, id) {
        const index = Kind.kindIds.findIndex(s => s.id === id);
        if (index !== -1) {
            Kind.kindIds.splice(index, 1);
            let targetElement = $(event.target).is("a") ? $(event.target) : $(event.target.parentNode);

            targetElement
                .removeClass("text-danger")
                .addClass("text-success")
                .attr("onclick", `Kind.Add(event , ${id})`)
                .html('<iconify-icon icon="hugeicons:plus-sign-square" width="24" height="24"></iconify-icon>');
            this.UpdateInputCount();
        } else {
            console.error("err: index out of range ... ");
        }
    }

    static UpdateTable() {
        $("#Kind-body tr td").each(function () {
            for (let kindIds of Kind.kindIds) {
                if ($(this).attr("id") === `Kind-${Kind.id}`) {
                    $(this).find(".add-btn")
                        .removeClass("text-success")
                        .addClass("text-danger")
                        .attr("onclick", `Kind.Remove(event , ${Kind.id})`)
                        .html('<iconify-icon icon="hugeicons:minus-sign-square" width="24" height="24"></iconify-icon>');
                }
            }
        });
    }
    static UpdateInputCount() {
        let count = Kind.kindIds.length;
        $("#KindId-count-input").val(count > 0 ? `${count} نوع انتخاب شده` : "");
        formatFloatingLabel()
    }

}


$(() => {
    Kind.FillFromModel();
    Kind.UpdateInputCount();
})