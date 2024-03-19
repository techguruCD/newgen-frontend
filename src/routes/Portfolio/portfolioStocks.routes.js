import axios from 'axios'

const apiV1Request = axios.create({
//   baseURL: 'http://localhost:5000/api/v1',
  baseURL: 'http://localhost:8080/api/v1',
})
function getRefreshToken() {
  return localStorage.getItem("token");
}

export const getAllStocks = async () =>
    await apiV1Request.post("/portfolioStocks/getAll", {
        token : getRefreshToken()
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log("RESULT NAHI AYA HAIN")
    })

export const buy = async (symbl, quantity, price) => 
    await apiV1Request.post("/portfolioStocks/buy", {
        token : getRefreshToken(),
        symbl: symbl,
        quantity: quantity,
        cost: price
    }).then((response)=> {
        if(response.data.message === "success") {
            return true;
        } else {
            return false
        }
    }).catch((error) => {
        return false
    });


export const sell = async (symbl, quantity, price) => 
    await apiV1Request.post("/portfolioStocks/sell", {
        token : getRefreshToken(),
        symbl: symbl,
        quantity: quantity,
        cost: price
    }).then((response)=> {
        if(response.data.message === "success") {
            return true;
        } else {
            return false
        }
    }).catch((error) => {
        return false
    });

export const sellLimit = async (symbl) => 
    await apiV1Request.post("/portfolioStocks/getSellLimit", {
        token: getRefreshToken(),
        symbl: symbl,
    }).then((response)=> {
        if(response.data.result) {
            return response.data.result
        } else {
            return 0;
        }
    }).catch((error) => {
        return 0;
    });