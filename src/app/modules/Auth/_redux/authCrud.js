import axios from "axios";

export const LOGIN_URL = `${process.env.REACT_APP_API_URL}users/login`;

// export const LOGIN_URL = `${process.env.REACT_APP_API_URL}/users/login`;
// export const LOGIN_URL = "http://localhost:5001/api/v1/users/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";
export const ME_URL = `${process.env.REACT_APP_API_URL}/auth/me`;

// export function login(email, password) {
//   return axios.post(LOGIN_URL, { email, password });
// }
export const login = async (email, password) => {
  return fetch(LOGIN_URL, {
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
       
    },
    body: JSON.stringify({
    "email": email,
    "password":password
    
  })
   
})    
  
};

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

// export function getUserByToken() {
//   // Authorization head should be fulfilled in interceptor.
//   var userToken = localStorage.getItem("user");
//   return userToken;
//   //return axios.get(ME_URL);
// }
