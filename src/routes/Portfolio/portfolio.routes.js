import axios from 'axios'


export const  getPortFolio = async () => {

}

const apiV1Request = axios.create({
//   baseURL: 'http://localhost:5000/api/v1',
  baseURL: 'http://localhost:8080/api/v1',
})
function getRefreshToken() {
  return localStorage.getItem("token");
}

export const getFunds = async () =>
    await apiV1Request.post("/portfolio/getFund", {
        token : getRefreshToken()
    }).then((response) => {
        console.log("RESULT AYA HAIN", response)
        localStorage.setItem("funds",response.data.funds);
    }).catch((error) => {
        console.log("RESULT NAHI AYA HAIN")
    })


export const getPortfolio = async () =>
    await apiV1Request.post("/portfolio/getPortfolio", {
        token : getRefreshToken()
    }).then((response) => {
        // console.log("RESULT AYA HAIN", response)
        return response.data.result
    }).catch((error) => {
        console.log("RESULT NAHI AYA HAIN");
    })
    
export const updatePortfolio = async (amount) => 
    await apiV1Request.post("/portfolio/update", {
        token : getRefreshToken(),
    }).then((response)=> {
        if(response.data.message === "success") {
            return true;
        } else {
            return false
        }
    }).catch((error) => {
        return false
    });