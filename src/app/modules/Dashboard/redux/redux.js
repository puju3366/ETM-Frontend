const intialValues = {
  id: "",
  trainingName: "",
  platform: "",
  level: "",
  focusArea: "",
  noOfVideos: "",
  duration: "",
  mentor: "",
};

const Dashboardreducer = (state = intialValues, action) => {
  //console.log(action, "action");
  const { type, data } = action;
  switch (action.type) {
    case "MANAGERDASHBOARD":
      return {
        data,
      };
    case "EMPLOYEEDASHBOARD":
      return {
        data,
      };

    default:
      return state;
  }
};

export default Dashboardreducer;
