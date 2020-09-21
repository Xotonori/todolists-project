import axios from "axios";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    // headers: {"API-KEY": "6e863487-7e15-440d-bed9-55795c7bd9f6"}
});