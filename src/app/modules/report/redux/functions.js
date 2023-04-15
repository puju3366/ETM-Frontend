export const SHOW_USER_URL = `${process.env.REACT_APP_API_URL}users/employees`;
export const VIEW_TRAINING_PROGRESS_URL = `${process.env.REACT_APP_API_URL}progress/viewuserprogress`;
export const VIEW_EXCEL_TRAINING_PROGRESS_URL = `${process.env.REACT_APP_API_URL}progress/exportuserprogress`;



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

export const viewTrainingProgress = async (id, user) => {
    return fetch(VIEW_TRAINING_PROGRESS_URL + "/" + id, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': user.accessToken, // notice the Bearer before your token
        },

    })
};


export const viewExcel = async (id, user) => {
    return fetch(VIEW_EXCEL_TRAINING_PROGRESS_URL + "/" + id, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': user.accessToken, // notice the Bearer before your token
        },

    })
};

