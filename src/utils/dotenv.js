import axios from 'axios';

const url = process.env.EXPO_PUBLIC_API_URL;

export const api = axios.create({
    baseURL: url
})