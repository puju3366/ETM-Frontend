export const SHOW_USER_URL = `${process.env.REACT_APP_API_URL}users/employees`;
export const SHOW_USER_VIEW_URL = `${process.env.REACT_APP_API_URL}users/userbyId`;
export const FETCH_ROLES = `${process.env.REACT_APP_API_URL}roles`
export const ASSIGN_ROLES = `${process.env.REACT_APP_API_URL}users/assign-role`;
export const FETCH_USER_ROLES_PERMISIONS = `${process.env.REACT_APP_API_URL}users/fetchRoleAndPermissions`

export const UserShow = async (user) => {
    //console.log(user);
    return fetch(SHOW_USER_URL, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': user.accessToken, // notice the Bearer before your token
        },

    })
};

export const viewUser = async (id, user) => {
    return fetch(SHOW_USER_VIEW_URL + "/" + id, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': user.accessToken, // notice the Bearer before your token
        },

    })
};

export const fetchRoles = async (user) => {
    return fetch(FETCH_ROLES, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': user.accessToken, // notice the Bearer before your token
        },
    })
};

export const assignRole = async (user, id, data) => {
    return fetch(ASSIGN_ROLES, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': user.accessToken, // notice the Bearer before your token
        },
        body: JSON.stringify({
            "role": data.data.role,
            "employee_id": id
        })
    })
}

export const fetchRolesAndPermissions = async (user, id) => {
    return fetch(FETCH_USER_ROLES_PERMISIONS, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': user.accessToken, // notice the Bearer before your token
        },
        body:JSON.stringify({
            "employee_id": id
        })
    })
}