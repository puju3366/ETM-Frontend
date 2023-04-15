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

const Trainingreducer = (state = intialValues, action) => {
  //console.log(action, "action");
  const { type, data } = action;
  switch (action.type) {
    case "SHOW":
      return {
        data,
      };
    case "ADDPROGRESS":
      return {
        data,
      };
    case "VIEWPROGRESS":
      return {
        data,
      };

    case "LOADPROGRESS":
      return {
        data,
      };
    case "VIEWTRAININGBYID":
      return {
        data,
      };
    default:
      return state;
  }
};

export default Trainingreducer;
