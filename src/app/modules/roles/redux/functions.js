

export const ADD_ROLE_URL = `${process.env.REACT_APP_API_URL}roles/create`;
export const EDIT_ROLE_URL = `${process.env.REACT_APP_API_URL}roles/editRole`;
export const SHOW_ROLE_URL = `${process.env.REACT_APP_API_URL}roles`;
export const SHOW_ROLE_VAL_BY_ID = `${process.env.REACT_APP_API_URL}roles/getRole`;
export const DELETE_ROLE_URL = `${process.env.REACT_APP_API_URL}roles/delete`;
export const SHOW_RIGHTS_URL = `${process.env.REACT_APP_API_URL}rights`;
export const SHOW_MODULES_URL = `${process.env.REACT_APP_API_URL}rights/modules`;

export const addRole = async (formRoleParams, user) => {
  return fetch(ADD_ROLE_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },
    body: JSON.stringify({
      "rolename": formRoleParams.formRoleParams.rolename,
      "isactive": formRoleParams.formRoleParams.isactive,
      "rights": formRoleParams.formRoleParams.rights,
    })

  })

};
export const editRole = async (formRoleParams, id, user) => {
  //const iddel = id.row;
  return fetch(EDIT_ROLE_URL + "/" + id, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },
    body: JSON.stringify({
      "rolename": formRoleParams.formRoleParams.rolename,
      "isactive": formRoleParams.formRoleParams.isactive,
      "rights": formRoleParams.formRoleParams.rights,
    })
  })
};
export const deleteRole = async (id, user) => {
  return fetch(DELETE_ROLE_URL + "/" + id.id, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },
  })
};

export const showRole = async (user) => {
  return fetch(SHOW_ROLE_URL, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },

  })
};

export const showRoleById = async (id, user) => {
  return fetch(SHOW_ROLE_VAL_BY_ID + "/" + id, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },

  })
};

export const showRights = async (user) => {
  return fetch(SHOW_RIGHTS_URL, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },

  })
};

export const showModules = async (user) => {
  return fetch(SHOW_MODULES_URL, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },

  })
};

