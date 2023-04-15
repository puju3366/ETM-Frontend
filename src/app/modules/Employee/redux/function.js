export const SHOW_TRAINING_URL = `${process.env.REACT_APP_API_URL}dashbaord/getTraningName`;
export const VIEW_TRAINING_PROGRESS_URL = `${process.env.REACT_APP_API_URL}progress/viewprogress`;
export const VIEW_TRAINING_BY_UD_URL = `${process.env.REACT_APP_API_URL}progress/trainingdetails`;
export const ADD_PROGRESS_URL = `${process.env.REACT_APP_API_URL}progress/addprogress`;
export const ADD_PROGRESS_COMPLETED_URL = `${process.env.REACT_APP_API_URL}dashbaord/videos`;

//const user = JSON.parse(localStorage.getItem('user'));

export const showTraining = async (eId) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return fetch(SHOW_TRAINING_URL + "/" + eId, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: user.accessToken, // notice the Bearer before your token
    },
  });
};

export const viewTrainingProgress = async (training_id, user) => {
  return fetch(VIEW_TRAINING_PROGRESS_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: user.accessToken, // notice the Bearer before your token
    },
    body: JSON.stringify({
      "training_id": training_id,
      "emp_id": user.user._id,

    })
  });
};

export const viewTrainingById = async (training_id, user) => {
  // console.log(training_id, user, "id");

  return fetch(VIEW_TRAINING_BY_UD_URL + "/" + training_id, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: user.accessToken, // notice the Bearer before your token
    },

  });
};

export const addTrainingProgress = async (training_id, edata, user) => {
  console.log(training_id.id);

  return fetch(ADD_PROGRESS_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: user.accessToken, // notice the Bearer before your token
    },
    body: JSON.stringify({
      "training_id": training_id.id,
      "emp_id": user.user._id,
      "start_week": edata.start_week,
      "end_week": edata.end_week,
      "completed_videos": edata.completedvideo

    })
  });
};
export const getEmployeeDash = async (id, user) => {
  return fetch('http://localhost:5001/api/v1/dashbaord/getTraningName/' + id, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },
  })
};

export const showTrainingCompletedVideos = async (trngid, user) => {
  //console.log(trngid,user);
  return fetch(ADD_PROGRESS_COMPLETED_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: user.accessToken, // notice the Bearer before your token
    },
    body: JSON.stringify({
      "training_id": trngid,
      "emp_id": user.user._id

    })
  });
};


