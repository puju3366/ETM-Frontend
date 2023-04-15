export function MangerDashboardData(data) {
    return dispatch => {
        return dispatch({
            type: "MANAGERDASHBOARD",
            data: data
        })
    }
}
export function EmployeeDashboardData(data) {
    return dispatch => {
        return dispatch({
            type: "EMPLOYEEDASHBOARD",
            data: data
        })
    }
}
