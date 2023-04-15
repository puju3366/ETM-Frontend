export const EMPL_DASHBOARD_URL = `${process.env.REACT_APP_API_URL}dashbaord/dashboard`;
export const MANAGER_DASHBOARD_URL = `${process.env.REACT_APP_API_URL}trainingemp/dashboard`;
export const MANAGER_TIMELINE_DASHBOARD_URL = `${process.env.REACT_APP_API_URL}timeline/timeline`;
export const MANAGER_GRAPH_DASHBOARD_URL = `${process.env.REACT_APP_API_URL}dashbaord/graph`;


export const getEmployeeDash = async (id, user) => {
  return fetch(EMPL_DASHBOARD_URL +"/"+ id, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },
  })
};

export const getManagerDash = async (user) => {
  return fetch(MANAGER_DASHBOARD_URL, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },
  })
};

export const getTimelineDashboard = async (user) => {
  return fetch(MANAGER_TIMELINE_DASHBOARD_URL+"/"+user.user._id, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },
  })
};

export const getDashboardGraph = async (user) => {
  return fetch(MANAGER_GRAPH_DASHBOARD_URL, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': user.accessToken, // notice the Bearer before your token
    },
  })
};


