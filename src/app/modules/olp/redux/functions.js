

export const ADD_OLP_URL = `${process.env.REACT_APP_API_URL}training/create`;
export const EDIT_OLP_URL = `${process.env.REACT_APP_API_URL}training/editOlpTraining`;
export const SHOW_OLP_URL = `${process.env.REACT_APP_API_URL}training`;
export const SHOW_OLP_VAL_BY_ID = `${process.env.REACT_APP_API_URL}training/getTraining`;
export const DELETE_OLP_URL = `${process.env.REACT_APP_API_URL}delete`;
export const SHOW_USER_URL = `${process.env.REACT_APP_API_URL}users/employees`;
export const MENTOR_NAME_BY_ID_URL = `${process.env.REACT_APP_API_URL}users/employee`;
export const LINK_EMPLOYEE_URL = `${process.env.REACT_APP_API_URL}trainingemp/linkemployee`;
export const VIEW_EMPLOYEE_URL = `${process.env.REACT_APP_API_URL}trainingemp/getemployee`;
export const DELETE_EMPLOYEE_TRANING = `${process.env.REACT_APP_API_URL}trainingemp/deleteemployee`;
export const SHOW_PLATFORM_URL = `${process.env.REACT_APP_API_URL}platform/getall`;
export const SHOW_FOCUSAREA_URL = `${process.env.REACT_APP_API_URL}focusarea/getall`;
export const NOTIFY_EMPLOYEE_URL = `${process.env.REACT_APP_API_URL}trainingemp/notifyparticipants`;
export const DELETE_TRAINING_URL = `${process.env.REACT_APP_API_URL}training/delete`;
export const VIEW_EMP_PROGRESS_URL = `${process.env.REACT_APP_API_URL}trainingemp/trainingempdata`;


export const addOlp = async (formOLPParams, user) => {
  return fetch(ADD_OLP_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },
    body: JSON.stringify({
      "trainingname": formOLPParams.formOLPParams.traningname,
      "platform": formOLPParams.formOLPParams.platform,
      "focus_area": formOLPParams.formOLPParams.focus_area,
      "courselink": formOLPParams.formOLPParams.courselink,
      "level": formOLPParams.formOLPParams.level,
      "no_of_video": formOLPParams.formOLPParams.no_of_video,
      "startdate": formOLPParams.formOLPParams.startdate,
      "endate": formOLPParams.formOLPParams.endate,
      "mentor": formOLPParams.formOLPParams.mentor
    })

  })

};
export const editOlp = async (formOLPEditParams, id, user) => {
  //const iddel = id.row;
  //console.log(formOLPEditParams);
  return fetch(EDIT_OLP_URL + "/" + id, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },
    body: JSON.stringify({
      "trainingname": formOLPEditParams.formOLPEditParams.trainingname,
      "platform": formOLPEditParams.formOLPEditParams.platform,
      "focus_area": formOLPEditParams.formOLPEditParams.focus_area,
      "courselink": formOLPEditParams.formOLPEditParams.courselink,
      "level": formOLPEditParams.formOLPEditParams.level,
      "no_of_video": formOLPEditParams.formOLPEditParams.no_of_video,
      "startdate": formOLPEditParams.formOLPEditParams.startdate,
      "endate": formOLPEditParams.formOLPEditParams.endate,
      "mentor": formOLPEditParams.formOLPEditParams.mentor
    })

  })

};
export const deleteOlp = async (id, user) => {
  return fetch(DELETE_TRAINING_URL + "/" + id.id, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },
  })
};
export const linkEmployee = async (linkEmpParams, id, user) => {
  return fetch(LINK_EMPLOYEE_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },
    body: JSON.stringify({
      "training_id": id,
      "emp_id": linkEmpParams.linkEmpParams.empname,
    })

  })
};

export const getEmployeeById = async (id, user) => {
  //console.log(id, "traing id");
  return fetch(VIEW_EMPLOYEE_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },
    body: JSON.stringify({
      "id": id
    })

  })
};

export const showOlp = async (user) => {
  return fetch(SHOW_OLP_URL, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },

  })
};

export const showOlpById = async (id, user) => {
  return fetch(SHOW_OLP_VAL_BY_ID + "/" + id, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },

  })
};

export const showUservalMentor = async (user) => {
  return fetch(SHOW_USER_URL, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },

  })
};

export const showPlatformById = async (user) => {
  return fetch(SHOW_PLATFORM_URL, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },

  })
};
export const showFocusareaById = async (user) => {
  return fetch(SHOW_FOCUSAREA_URL, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },

  })
};

export const mentorNameById = async (formValbyid, user) => {
  // let arrymentor = formOLPParams.formOLPParams.mentor;
  // let mentor = arrymentor.join(",");
  //console.log(formValbyid, "arrayMentor");
  return fetch(MENTOR_NAME_BY_ID_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },
    body: JSON.stringify({
      "mentor_id": formValbyid,

    })

  })

};

export const deleteTraning = async (emp_id, id, user) => {
  //console.log(emp_id, id);
  return fetch(DELETE_EMPLOYEE_TRANING, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },
    body: JSON.stringify({
      "training_id": id,
      "emp_id": emp_id.empid,

    })

  })
};

export const notifyEmployeeApi = async (training_id, user) => {
  //console.log(training_id, user);
  return fetch(NOTIFY_EMPLOYEE_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },
    body: JSON.stringify({
      "training_id": training_id.id,
    })

  })
};

export const viewEmpProgress = async (training_id, empid, user) => {
  console.log(training_id, empid, user);
  return fetch(VIEW_EMP_PROGRESS_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },
    body: JSON.stringify({
      "training_id": training_id,
      "emp_id": empid,
    })

  })
};