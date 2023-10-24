import axios from "axios";



const api = axios.create({

    baseURL: 'http://localhost:3223'
})

export default api;