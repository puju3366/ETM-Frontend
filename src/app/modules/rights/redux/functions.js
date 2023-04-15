

export const ADD_RIGHT_URL = `${process.env.REACT_APP_API_URL}rights/create`;
export const EDIT_RIGHT_URL = `${process.env.REACT_APP_API_URL}rights/edit`;
export const SHOW_RIGHT_URL = `${process.env.REACT_APP_API_URL}rights`;
export const SHOW_RIGHT_VAL_BY_ID = `${process.env.REACT_APP_API_URL}rights`;
export const DELETE_RIGHT_URL = `${process.env.REACT_APP_API_URL}rights/delete`;
export const SHOW_MODEL_URL = `${process.env.REACT_APP_API_URL}rights/modules`;


export const addRight = async (formRightParams, user) => {
  return fetch(ADD_RIGHT_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },
    body: JSON.stringify({
      "name": formRightParams.formRightParams.name,
      "moduleID": formRightParams.formRightParams.moduleID,
      "status": formRightParams.formRightParams.status
    })

  })

};
export const editRight = async (formRightParams, id, user) => {
  return fetch(EDIT_RIGHT_URL + "/" + id, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },
    body: JSON.stringify({
      "name": formRightParams.formRightParams.name,
      "moduleID": formRightParams.formRightParams.moduleID,
      "status": formRightParams.formRightParams.status,
      "slug": "slug"
    })
  })
};
export const deleteRight = async (id, user) => {
  return fetch(DELETE_RIGHT_URL + "/" + id.id, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },
  })
};


export const showRight = async (user) => {
  return fetch(SHOW_RIGHT_URL, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },

  })
};

export const showRightById = async (id, user) => {
  return fetch(SHOW_RIGHT_VAL_BY_ID + "/" + id, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },

  })
};

export const showModel = async (user) => {
  return fetch(SHOW_MODEL_URL, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },

  })
};

// export const showPlatformById = async (user) => {
//   return fetch(SHOW_PLATFORM_URL, {
//     method: 'GET',
//     headers: {
//       'Content-type': 'application/json',
//       'Authorization': user.accessToken, // notice the Bearer before your token
//     },

//   })
// };
// export const showFocusareaById = async (user) => {
//   return fetch(SHOW_FOCUSAREA_URL, {
//     method: 'GET',
//     headers: {
//       'Content-type': 'application/json',
//       'Authorization': user.accessToken, // notice the Bearer before your token
//     },

//   })
// };

// export const mentorNameById = async (formValbyid, user) => {
//   return fetch(MENTOR_NAME_BY_ID_URL, {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//       'Authorization': user.accessToken, // notice the Bearer before your token
//     },
//     body: JSON.stringify({
//       "mentor_id": formValbyid,

//     })

//   })

// };

// export const deleteTraning = async (emp_id, id, user) => {
//   //console.log(emp_id, id);
//   return fetch(DELETE_EMPLOYEE_TRANING, {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//       'Authorization': user.accessToken, // notice the Bearer before your token
//     },
//     body: JSON.stringify({
//       "training_id": id,
//       "emp_id": emp_id.empid,

//     })

//   })
// };
