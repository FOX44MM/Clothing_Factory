import axios from "axios";

export let apiClient = axios.create({
    baseURL: "http://localhost:8081/api",
    headers: {},
    timeout: 5000,
})