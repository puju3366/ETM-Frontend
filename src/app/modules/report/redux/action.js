export function USERShow(data) {
    return dispatch => {
        return dispatch({
            type: "SHOW",
            data: data

        })
    }
}

export function USERView(data) {
    return dispatch => {
        return dispatch({
            type: "VIEW",
            data: data

        })
    }
}