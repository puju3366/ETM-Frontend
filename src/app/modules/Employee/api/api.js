export const SHOW_TRAINING_URL = `${process.env.REACT_APP_API_URL}dashbaord/getTraningName`;
export const ADD_PROGRESS_URL = `${process.env.REACT_APP_API_URL}progress/addprogress`;
export const VIEW_TRAININGS_URL = `${process.env.REACT_APP_API_URL}progress/viewprogress`;
export async function showTrainings(eId) {
  const user = JSON.parse(localStorage.getItem("user"));

  // const response = await fetch(SHOW_TRAINING_URL +"/" + eId);
  // const accessToken  = user.accessToken;
  const response = await fetch(SHOW_TRAINING_URL + "/" + eId, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Authorization": user.accessToken,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch training.');
  }

  const transformedTraining = [];
  for (const key in data) {
    const trainingObj = {
      id: key,
      ...data[key],
    };
    transformedTraining.push(trainingObj);
    return transformedTraining;
  }
};

export async function addTrainings(edata) {

  console.log(edata, "value");



  const response = await fetch(ADD_PROGRESS_URL, {

    method: "POST",

    headers: {

      "Content-type": "application/json",

      "Authorization": edata.userToken.accessToken,

    },

    body: JSON.stringify({

      "training_id": edata.progressId,

      "emp_id": edata.userToken.user._id,

      "week": edata.progressData.week,

      "completed_videos": edata.progressData.completedVideo



    })

  });



  return response;

};

export async function viewProgress(trainingid) {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(trainingid, user, "8888");

  //  const response = await fetch(VIEW_TRAININGS_URL, {
  //    method: "POST",
  //    headers: {
  //      "Content-type": "application/json",
  //      "Authorization": edata.userToken.accessToken,
  //    },
  //    body: JSON.stringify({
  //      "training_id": "6257f818c25bc13228d1e2aa",
  //      "emp_id": edata.userToken.user._id

  //    })
  //  });

  //  return response;
};




