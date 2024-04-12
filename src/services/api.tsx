
import axios from "axios";

    export const api = axios.create({
        baseURL:"http://100.100.226.100:3000",
        headers:{
            "authorization": "token h43895jt9858094bun6098grubn48u59",
        }
    })