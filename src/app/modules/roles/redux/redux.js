const intialValues = { rolename: "", isactive: "" };

const Rolereducer = (state = intialValues, action) => {
    const { type, data } = action;
    switch (action.type) {
        case 'ADDROLE':
            return {
                data,
            };
        case 'EDITROLE':
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
        case 'SHOWROLEBYID':
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
        case 'SHOWRIGHTSList':
            return {
                data,
            };
        case 'SHOWMODULESList':
            return {
                data,
            };
        default:
            return state;


    }
}

export default Rolereducer;



