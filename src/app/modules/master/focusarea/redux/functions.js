

export const ADD_FOCUSAREA_URL = `${process.env.REACT_APP_API_URL}focusarea/create`;
export const SHOW_FOCUSAREA_URL = `${process.env.REACT_APP_API_URL}focusarea/getall`;
export const EDIT_PLATFORM_URL = `${process.env.REACT_APP_API_URL}focusarea/edit`;
export const DELETE_FOCUSAREA_URL = `${process.env.REACT_APP_API_URL}focusarea/delete`;
export const SHOW_FOCUSAREA_BY_ID_URL = `${process.env.REACT_APP_API_URL}focusarea/getbyid`;

//const user = JSON.parse(localStorage.getItem('user'));
export const addFocusarea = async (formFocusareaParams, user) => {
  //console.log(formFocusareaParams, "token");
  return fetch(ADD_FOCUSAREA_URL, {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
        'Authorization': user.accessToken, // notice the Bearer before your token
    },
    body: JSON.stringify({
    "focus_area": formFocusareaParams.formFocusareaParams.focusarea
  })
   
})    
  
};
export const editFocusarea = async (formFocusareaParams, id, user) => {
  //const iddel = id.row;
  return fetch(EDIT_PLATFORM_URL+"/"+id, {
    method: 'PATCH',
    headers: {
        'Content-type': 'application/json',
        'Authorization': user.accessToken, // notice the Bearer before your token
    },
    body: JSON.stringify({
      "focus_area": formFocusareaParams.formFocusareaParams.focusarea
  })
   
}) 
  
};
export const deleteFocusarea = async (id, user) => {
  
  return fetch(DELETE_FOCUSAREA_URL+"/"+id.id, {
    method: 'DELETE',
    headers: {
        'Content-type': 'application/json',
        'Authorization': user.accessToken, // notice the Bearer before your token
    },
   
 })   
};


export const showFocusarea = async (user) => {
  return fetch(SHOW_FOCUSAREA_URL, {
          method: 'GET',
          headers: {
              'Content-type': 'application/json',
              'Authorization': user.accessToken, // notice the Bearer before your token
          },
         
      })    
};

export const showFocusareaById = async (id, user) => {
  return fetch(SHOW_FOCUSAREA_BY_ID_URL+"/"+id, {
          method: 'GET',
          headers: {
              'Content-type': 'application/json',
              'Authorization': user.accessToken, // notice the Bearer before your token
          },
         
      })    
};

