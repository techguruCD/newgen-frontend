import sendRequest from "./BaseClient";

// set up the base auth path
const BASE_MARKET_PATH = '/api/v1/market';

const getTicker = async (token, ticker) => {
  console.log('get ticker with token: ', token)
  const path = `${BASE_MARKET_PATH}/ticker/${ticker}`;
  const opts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  return await sendRequest(path, opts);
}

const createOrderRequest = async (token, orderMarketType, orderType, symbol, price, amount) => {
  const path = `${BASE_MARKET_PATH}/order/create`;
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({orderMarketType, orderType, symbol, price, amount})
  }
  return await sendRequest(path, opts);
}

export {getTicker, createOrderRequest};