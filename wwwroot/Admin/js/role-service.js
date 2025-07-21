class Role {
    static roleIds = [];
    constructor(id) {
        this.id = id;
    }

    // unused
    static GetById(id) {
        return Role.roleIds.find(s => s.id === id);
    }

    static AddToList(id) {
        Role.roleIds.push(new Role(id));
    }

    static GetAllIdsSplitByComma() {
        return Role.roleIds.map(s => s.id).join(",");
    }

    static SaveChanges() {
        $("#RoleIds").val(this.GetAllIdsSplitByComma());
    }

    static SaveChangesAndHideModal() {
        this.SaveChanges();
        $("#modal-center-lg").modal("hide");
    }

    static FillFromModel() {
        try {
            this.roleIds = [];
            const roleIdsSeperatedByComma = $("#RoleIds").val();
            const roleIds = roleIdsSeperatedByComma.trim().split(",").map(roleId => Number(roleId));
            for (let id of roleIds) {
                if (id > 0) {
                    Role.AddToList(id);
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
            .attr("onclick", `Role.Remove(event , ${id})`)
            .html('<iconify-icon icon="hugeicons:minus-sign-square" width="22" height="22"></iconify-icon>');
    }

    static Remove(event, id) {
        const index = Role.roleIds.findIndex(s => s.id === id);
        if (index !== -1) {
            Role.roleIds.splice(index, 1);
            let targetElement = $(event.target).is("a") ? $(event.target) : $(event.target.parentNode);

            targetElement
                .removeClass("text-danger")
                .addClass("text-success")
                .attr("onclick", `Role.Add(event , ${id})`)
                .html('<iconify-icon icon="hugeicons:plus-sign-square" width="22" height="22"></iconify-icon>');

        } else {
            console.error("err: index out of range ... ");
        }
    }

    static UpdateTable() {
        $("#role-body tr td").each(function () {
            for (let role of Role.roleIds) {
                if ($(this).attr("id") === `role-${role.id}`) {
                    $(this).find(".add-btn")
                        .removeClass("text-success")
                        .addClass("text-danger")
                        .attr("onclick", `Role.Remove(event , ${role.id})`)
                        .html('<iconify-icon icon="hugeicons:minus-sign-square" width="22" height="22"></iconify-icon>');
                }
            }
        });
    }

}


$(() => {
    Role.FillFromModel();
})