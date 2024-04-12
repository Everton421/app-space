
import axios from "axios";

    export const api = axios.create({
        baseURL:"http://000000000000000:3000",
        headers:{
            "authorization": "token 000000000000000000000",
        }
    })