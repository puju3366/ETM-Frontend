const intialValues = { traningname: "", platform: "", courselink: "", focusarea: "", level: "", noofvideos: "", start_date: "", end_date: "", mentor: "" };

const Usersreducer = (state = intialValues, action) => {
    const { type, data } = action; 
    //console.log(data);
  switch (action.type) {
      case 'ADD':
          return {
            
              ...state,
              intialValues: state.intialValues.concat(action.payload)

          };
      case 'EDIT':
          return {
              data,
              ...state,
              intialValues: state.intialValues.map(
                  (content, i) => content.id === action.payload.id ? { ...content, traningname: action.payload.traningname, courselink: action.payload.courselink, platform: action.payload.platform, focusarea: action.payload.focusarea, level: action.payload.level, noofvideos: action.payload.noofvideos, start_date: action.payload.start_date, end_date: action.payload.end_date, mentor: action.payload.mentor }
                      : content)

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
        case 'VIEW':
        return {
            data,
        };
      default:
          return state;
      

  }
}

export default Usersreducer;



