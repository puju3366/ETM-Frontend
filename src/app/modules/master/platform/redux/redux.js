const intialValues = { platform: "" };

const PLATFORMreducer = (state = intialValues, action) => {
  //console.log(action, "actionredux");
  const { type, data } = action; 
  switch (action.type) {
      case 'ADDPLATFORM':
        return {
            data,
       };
      case 'EDITPLATFORM':
          return {
            data, 
          };
      case 'DELETEPLATFORM':
          return {
            data,

          };
      case 'SHOWPLATFORM':
          return {
            data,
          };
      case 'SHOWPLATFORMBYID':
            return {
              data,
            };
      default:
          return state;
      

  }
}

export default PLATFORMreducer;



