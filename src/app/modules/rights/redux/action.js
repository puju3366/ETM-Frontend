export function RightAdd(data) {
    //console.log(data, "adduser");
    return dispatch => {
        return dispatch({
            type: "ADDRIGHT",
            data: data

        })
    }
}

export function RightEdit(data) {
    return dispatch => {
        return dispatch({
            type: "EDITRIGHT",
            data: data

        })
    }
}

export function RightDelete(rightid) {
    return dispatch => {
        return dispatch({
            type: "DELETE",
            data: rightid

        })
    }
}

export function RightShow(data) {
    return dispatch => {
        return dispatch({
            type: "SHOW",
            data: data

        })
    }
}

export function LinkEmployee(data) {
    return dispatch => {
        return dispatch({
            type: "LINKEMP",
            data: data

        })
    }
}
export function ViewEmployee(data) {
    return dispatch => {
        return dispatch({
            type: "VIEWEMP",
            data: data

        })
    }
}

export function ShowRightById(data) {
    return dispatch => {
        return dispatch({
            type: "SHOWRIGHTBYID",
            data: data

        })
    }
}

export function userValmentor(data) {
    return dispatch => {
        return dispatch({
            type: "SHOWUSERVALMENTOR",
            data: data

        })
    }
}

export function getEmpList(data) {
    return dispatch => {
        return dispatch({
            type: "SHOWEMPList",
            data: data

        })
    }
}