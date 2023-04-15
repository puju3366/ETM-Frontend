
export const ADD_PLATFORM_URL = `${process.env.REACT_APP_API_URL}platform/create`;
export const SHOW_PLATFORM_URL = `${process.env.REACT_APP_API_URL}platform/getall`;
export const EDIT_PLATFORM_URL = `${process.env.REACT_APP_API_URL}platform/edit`;
export const DELETE_PLATFORM_URL = `${process.env.REACT_APP_API_URL}platform/delete`;
export const SHOW_PLATFORM_BY_ID_URL = `${process.env.REACT_APP_API_URL}platform/getbyid`;

//const user = JSON.parse(localStorage.getItem('user'));
export const addPlatform = async (formPlatformParams, user) => {
  //console.log(currentUser, "token");
  return fetch(ADD_PLATFORM_URL, {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
        'Authorization': user.accessToken, // notice the Bearer before your token
    },
    body: JSON.stringify({
    "platform": formPlatformParams.formPlatformParams.platform
  })
   
})    
  
};
export const editPlatform = async (formPlatformParams, id, user) => {
  //const iddel = id.row;
  console.log(formPlatformParams, id, "api");
  return fetch(EDIT_PLATFORM_URL+"/"+id, {
    method: 'PATCH',
    headers: {
        'Content-type': 'application/json',
        'Authorization': user.accessToken, // notice the Bearer before your token
    },
    body: JSON.stringify({
      "platform": formPlatformParams.formPlatformParams.platform
  })
   
}) 
  
};
export const deletePlatform = async (id, user) => {
  return fetch(DELETE_PLATFORM_URL+"/"+id.id, {
    method: 'DELETE',
    headers: {
        'Content-type': 'application/json',
        'Authorization': user.accessToken, // notice the Bearer before your token
    },
   
 })   
};


export const showPlatform = async (user) => {
  return fetch(SHOW_PLATFORM_URL, {
          method: 'GET',
          headers: {
              'Content-type': 'application/json',
              'Authorization': user.accessToken, // notice the Bearer before your token
          },
         
      })    
};

export const showPlatformById = async (id, user) => {
  return fetch(SHOW_PLATFORM_BY_ID_URL+"/"+id, {
          method: 'GET',
          headers: {
              'Content-type': 'application/json',
              'Authorization': user.accessToken, // notice the Bearer before your token
          },
         
      })    
};

