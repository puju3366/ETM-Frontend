const intialValues = { platform: "" };

const Focusareareducer = (state = intialValues, action) => {
  //console.log(action, "actionredux");
  const { type, data } = action; 
  switch (action.type) {
      case 'ADDFOCUSAREA':
        return {
            data,
       };
      case 'EDITFOCUSAREA':
          return {
            data, 
          };
      case 'DELETEFOCUSAREA':
          return {
            data,

          };
      case 'SHOWFOCUSAREA':
          return {
            data,
          };
      case 'SHOWFOCUSAREABYID':
            return {
              data,
            };
      default:
          return state;
      

  }
}

export default Focusareareducer;



