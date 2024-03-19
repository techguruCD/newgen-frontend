import sendRequest from "./BaseClient";

// set up the base auth path
const BASE_MARKET_PATH = '/api/v1/user';

const getWatchListRequest = async (token) => {
  const path = `${BASE_MARKET_PATH}/watchlist`;
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  return await sendRequest(path, opts);
}

const addTickerToList = async (token, watchlistName, symbol) => {
  const path = `${BASE_MARKET_PATH}/watchlist/add`;
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({name: watchlistName, symbol})
  }
  return await sendRequest(path, opts);
}

const removeTickerFromList = async (token, watchlistName, symbol) => {
  const path = `${BASE_MARKET_PATH}/watchlist/delete`;
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({name: watchlistName, symbol})
  }
  return await sendRequest(path, opts);
}


const createWatchlistRequest = async (token, name) => {
  const path = `${BASE_MARKET_PATH}/watchlist/create`;
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({name: name})
  }
  return await sendRequest(path, opts);
}

const getCurrentHoldings = async (token) => {
  const path = `${BASE_MARKET_PATH}/orders/holdings`;
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }
  return await sendRequest(path, opts);
}


export {getWatchListRequest, addTickerToList, createWatchlistRequest, removeTickerFromList, getCurrentHoldings};