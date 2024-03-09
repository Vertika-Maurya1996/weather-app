import axios from "axios"
const baseURL = "https://api.open-meteo.com/"

const api = axios.create({baseURL:baseURL,headers:{
    "Content-Type":"application/json"
}})
export default api;