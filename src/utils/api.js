import axios from 'axios';
const url = process.env.API_URL


export const api = axios.create({
    baseURL: url
})