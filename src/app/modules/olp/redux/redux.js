const intialValues = { traningname: "", platform: "", courselink: "", focusarea: "", level: "", noofvideos: "", start_date: "", end_date: "", mentor: "" };

const Olpreducer = (state = intialValues, action) => {
  //console.log(action, "action");
  const { type, data } = action; 
  switch (action.type) {
      case 'ADDOLP':
        return {
            data,
       };
       case 'EDITOLP':
        return {
          data, 
        };
         
      case 'DELETE':
          return {
              ...state,
              intialValues: state.intialValues.filter(item => item.id !== action.payload)

          };
      case 'SHOW':
          return {
            data,
              

          };
        case 'SHOWOLPBYID':
            return {
                data,
                

            };
        case 'SHOWUSERVALMENTOR':
            return {
                ...state,
                

            };
        case 'LINKEMP':
            return {
                 data,
                

            };
        case 'VIEWEMP':
            return {
                    data,
                

            };
        case 'SHOWEMPList':
            return {
                    data,
            };
      default:
          return state;
      

  }
}

export default Olpreducer;



