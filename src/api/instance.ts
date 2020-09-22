import axios from "axios";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {"API-KEY": "0ae27cf7-fe1b-4884-bd4b-0216c7edb73d"}
});