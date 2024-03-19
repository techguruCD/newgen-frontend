// const axios = require('axios');
import axios from 'axios'

const apiV1Request = axios.create({
    // baseURL: 'http://localhost:5000/api/v1',
    baseURL: 'http://localhost:8080/api/v1',
})
export const getHistory =  (data) => 
    apiV1Request.post("/yfinance/getHistory/" + data.symbl,  
    {       
            interval : data.interval,
            period : data.period
    }
    ).then((data) => {
        // console.log(data.data.result);
        return data.data.result;
    }).catch((error) => {
        console.log(error);
        return null;
    })


export const getFundamentals = (symbl) =>
    apiV1Request.post("yfinance/getFundamentals/"+symbl)
        .then((data) => {
            return data.data.result;
        }).catch((error) => {
            return null;
        })



// {
//     "AMY" = " I just do it for fun";
// }