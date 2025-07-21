class UserPosition {
    static UserPositionIds = [];
    static UserPositionPositions = [];

    // constructor(id) {
    //     this.id = id;
    // }

    // unused
    static GetById(id) {
        return UserPosition.UserPositionIds.find(s => s.id === id);
    }

    static AddIdToList(id) {
        UserPosition.UserPositionIds.push(id);
    }

    static AddPositionToList(position) {
        UserPosition.UserPositionPositions.push(position);
    }

    static GetAllIdsSplitByComma() {
        return UserPosition.UserPositionIds.join(",");
    }

    static GetAllPositonsSplitByComma() {
        let he = UserPosition.UserPositionPositions.join(",");
        return he;

    }


    static ChangeInputValue(positionId) {
        let value = event.target.value;
        console.log(UserPosition.UserPositionIds);
        const index = UserPosition.UserPositionIds.findIndex(s => s === Number(positionId));
        UserPosition.UserPositionPositions[index] = value;
    }

    static SaveChanges() {
        $("#UserPositionIds").val(this.GetAllIdsSplitByComma());
        $("#UserPositionPositions").val(this.GetAllPositonsSplitByComma());
    }

    static SaveChangesAndHideModal() {
        this.SaveChanges();
        this.UpdateInputCount();
        $("#modal-center-lg").modal("hide");
    }

    static FillFromModel() {
        try {
            this.UserPositionIds = []
            this.UserPositionPositions = []
            const UserPositionIdsSeperatedByComma = $("#UserPositionIds").val();
            const ProgrammerPositionsSeperatedByComma = $("#UserPositionPositions").val();
            const UserPositionIds = UserPositionIdsSeperatedByComma.trim().split(",").map(UserPositionIds => Number(UserPositionIds));
            const ProgrammerPositions = ProgrammerPositionsSeperatedByComma.trim().split(",");
            for (let id of UserPositionIds) {
                if (id > 0) {
                    UserPosition.AddIdToList(id);
                }
            }
            for (let position of ProgrammerPositions) {
                if (position) {
                    UserPosition.AddPositionToList(position);
                }
            }

        } catch (ex) {
            console.error(ex, "failed to add role id")
        }
    }

    static Add(event, id, inputId) {
        let position = document.getElementById(inputId).value;
        if (!position) {
            showToaster("سمت نمیتواند خالی باشد", "error", "خطا")
            event.preventDefault()
            return false;
        }
        this.AddIdToList(id);
        this.AddPositionToList(position);
        console.log(UserPosition.UserPositionPositions)
        let targetElement = $(event.target).is("a") ? $(event.target) : $(event.target.parentNode);
        targetElement
            .removeClass("text-success")
            .addClass("text-danger")
            .attr("onclick", `UserPosition.Remove(event , ${id},"${inputId}" )`)
            .html('<iconify-icon icon="hugeicons:minus-sign-square" width="24" height="24"></iconify-icon>');
        this.UpdateInputCount();
    }

    static Remove(event, id, position) {
        let positio = document.getElementById(position).value;
        const index = UserPosition.UserPositionIds.findIndex(s => s === id);
        const positionIndex = UserPosition.UserPositionPositions.findIndex(s => s === positio);
        if (index !== -1) {
            UserPosition.UserPositionIds.splice(index, 1);
            UserPosition.UserPositionPositions.splice(positionIndex, 1);
            let targetElement = $(event.target).is("a") ? $(event.target) : $(event.target.parentNode);

            targetElement
                .removeClass("text-danger")
                .addClass("text-success")
                .attr("onclick", `UserPosition.Add(event , ${id},"${position}" )`)
                .html('<iconify-icon icon="hugeicons:plus-sign-square" width="24" height="24"></iconify-icon>');
            this.UpdateInputCount();
        } else {
            console.error("err: index out of range ... ");
        }
    }

    static UpdateTable() {

        const userPositions = document.getElementById("UserPositionPositions").value.split(",");
        const UserPositionIdsss = document.getElementById('UserPositionIds').value.trim().split(",").map(UserPositionIds => Number(UserPositionIds))

        const allInput = [...document.querySelectorAll("input[id^='positionVal-']")];

        allInput.forEach((input) => {
            let id = input.id.split("-")[1];
            if (UserPositionIdsss.includes(Number(id))) {
                const index = UserPositionIdsss.findIndex(s => s === Number(id));
                input.value = UserPosition.UserPositionPositions[index];
            }
        })

        $("#user-position-body tr td").each(function () {
            for (let user of UserPositionIdsss) {
                if ($(this).attr("id") === `user-position-${user}`) {
                    $(this).find(".add-btn")
                        .removeClass("text-success")
                        .addClass("text-danger")
                        .attr("onclick", `UserPosition.Remove(event ,${user},'positionVal-${user}')`)
                        .html('<iconify-icon icon="hugeicons:minus-sign-square" width="24" height="24"></iconify-icon>');
                }
            }
        });
    }

    static UpdateInputCount() {
        let count = UserPosition.UserPositionIds.length;
        $("#userPosition-count-input").val(count > 0 ? `${count} برنامه نویس انتخاب شده` : "");
        formatFloatingLabel()
    }

}


$(() => {
    UserPosition.FillFromModel();
    UserPosition.UpdateInputCount();

})