export function TrainingShow(data) {
    return dispatch => {
        return dispatch({
            type: "SHOW",
            data: data
        })
    }
}
export function TrainingViewProgress(data) {
    return dispatch => {
        return dispatch({
            type: "VIEWPROGRESS",
            data: data
        })
    }
}

export function TrainingViewById(data) {
    return dispatch => {
        return dispatch({
            type: "VIEWTRAININGBYID",
            data: data
        })
    }
}

export function OLPPROGRESSAdd(data) {
    return dispatch => {
        return dispatch({
            type: "ADDPROGRESS",
            data: data
        })
    }
}
export function OLPPROGRESSLoad(data) {
    return dispatch => {
        return dispatch({
            type: "LOADPROGRESS",
            data: data
        })
    }
}
