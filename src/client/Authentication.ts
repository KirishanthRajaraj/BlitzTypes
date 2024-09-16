import * as React from "react";
import axios from "axios";
import { Language } from "@/enums/language";

axios.defaults.withCredentials = true;
const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log(API_URL);
export const login = (username, password, rememberMe) => {
        return axios.post(`${API_URL}/Authentication/login`, {
        Username: username,
        Password: password,
        RememberMe: rememberMe
    }, {
        withCredentials: true
    });
}

export const register = (username, email, password) => { 
        return axios.post(`${API_URL}/Authentication/register`, {
        Username: username,
        Email: email,
        Password: password,
    });
}

export const isAuthenicated = () => {
    return axios.get(`${API_URL}/Authentication/isAuthenticated`);
}

export const getToken = () => {
    return axios.post(`${API_URL}/Authentication/getToken`, {
        withCredentials: true
    });
}

export const logout = () => {
    return axios.post(`${API_URL}/Authentication/logout`);
}