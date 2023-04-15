export function OLPAdd(data) {
    //console.log(data, "adduser");
    return dispatch => {
        return dispatch({
            type: "ADDOLP",
            data: data

        })
    }
}

export function OLPEdit(data) {
    return dispatch => {
        return dispatch({
            type: "EDITOLP",
            data: data

        })
    }
}

export function OLPDelete(olpid) {
    return dispatch => {
        return dispatch({
            type: "DELETE",
            data: olpid

        })
    }
}

export function OLPShow(data) {
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

export function ShowOLPById(data) {
    return dispatch => {
        return dispatch({
            type: "SHOWOLPBYID",
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