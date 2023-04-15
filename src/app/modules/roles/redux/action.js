export function RoleAdd(data) {
    return dispatch => {
        return dispatch({
            type: "ADDROLE",
            data: data

        })
    }
}

export function RoleEdit(data) {
    return dispatch => {
        return dispatch({
            type: "EDITROLE",
            data: data

        })
    }
}

export function RoleDelete(roleid) {
    return dispatch => {
        return dispatch({
            type: "DELETE",
            data: roleid

        })
    }
}

export function RoleShow(data) {
    return dispatch => {
        return dispatch({
            type: "SHOW",
            data: data

        })
    }
}

export function ShowROLEById(data) {
    return dispatch => {
        return dispatch({
            type: "SHOWROLEBYID",
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

export function getRightsList(data) {
    return dispatch => {
        return dispatch({
            type: "SHOWRIGHTSList",
            data: data

        })
    }
}

export function getModuleList(data) {
    return dispatch => {
        return dispatch({
            type: "SHOWMODULESList",
            data: data

        })
    }
}