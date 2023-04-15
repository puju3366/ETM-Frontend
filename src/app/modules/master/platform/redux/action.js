export function PlatformAdd(data) {
    // console.log(data, "adduser");
    return dispatch => {
        return dispatch({
            type: "ADDPLATFORM",
            data: data

        })
    }
}

export function PlatformEdit(data) {
    return dispatch => {
        return dispatch({
            type: "EDITPLATFORM",
            data: data

        })
    }
}

export function PlatformDelete(olpid) {
    return dispatch => {
        return dispatch({
            type: "DELETE",
            data: olpid

        })
    }
}
export function Show(data) {
    return dispatch => {
        return dispatch({
            type: "SHOWPLATFORM",
            data: data

        })
    }
}

export function ShowPlatfromById(data) {
    return dispatch => {
        return dispatch({
            type: "SHOWPLATFORMBYID",
            data: data

        })
    }
}
