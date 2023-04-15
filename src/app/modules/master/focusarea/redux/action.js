export function FocusareaAdd(data) {
    // console.log(data, "adduser");
    return dispatch => {
        return dispatch({
            type: "ADDFOCUSAREA",
            data: data

        })
    }
}

export function focusareaEdit(data) {
    return dispatch => {
        return dispatch({
            type: "EDITFOCUSAREA",
            data: data

        })
    }
}

export function focusareaDelete(id) {
    return dispatch => {
        return dispatch({
            type: "DELETEFOCUSAREA",
            data: id

        })
    }
}
export function Show(data) {
    return dispatch => {
        return dispatch({
            type: "SHOWFOCUSAREA",
            data: data

        })
    }
}

export function ShowFocusareaById(data) {
    return dispatch => {
        return dispatch({
            type: "SHOWFOCUSAREABYID",
            data: data

        })
    }
}
