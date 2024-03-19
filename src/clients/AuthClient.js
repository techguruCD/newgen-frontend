import sendRequest from "./BaseClient";

// set up the base auth path
// const BASE_AUTH_PATH = '/api/v1/auth';
const BASE_AUTH_PATH = 'http://localhost:8080/api/v1/auth';

function getRefreshToken() {
  return localStorage.getItem("token");
}

const loginRequest = async (email, password) => {
  const path = `${BASE_AUTH_PATH}/login`;
  const opts = {
    method: 'POST',
    body: JSON.stringify({email, password}),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return await sendRequest(path, opts);
}

const addBalanceRequest = async (balance) => {
  const path = `${BASE_AUTH_PATH}/addBalance`;
  const opts = {
    method: 'PUT',
    body: JSON.stringify({ balance, 
      token : getRefreshToken()}),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include' // This includes cookies in the request
  };
  
  return await sendRequest(path, opts);
}
const registerRequest = async (email, password) => {
  const path = `${BASE_AUTH_PATH}/register`;
  const opts = {
    method: 'POST',
    body: JSON.stringify({email, password}),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return await sendRequest(path, opts);
}

export {loginRequest, registerRequest, addBalanceRequest};