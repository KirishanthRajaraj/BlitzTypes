import * as React from "react";
import axios from "axios";
import { Language } from "@/enums/language";

axios.defaults.withCredentials = true;

export const login = (username, password, rememberMe) => {
    return axios.post("https://localhost:7141/api/Authentication/login", {
        Username: username,
        Password: password,
        RememberMe: rememberMe
    }, {
        withCredentials: true
    });
}

export const register = (username, email, password) => {
    return axios.post("https://localhost:7141/api/Authentication/register", {
        Username: username,
        Email: email,
        Password: password,
    });
}

export const isAuthenicated = () => {
    return axios.get("https://localhost:7141/api/Authentication/isAuthenticated");
}

export const getToken = () => {
    return axios.post("https://localhost:7141/api/Authentication/getToken", {
        withCredentials: true
    });
}

export const getTokenFetch = () => {
    return fetch("https://localhost:7141/api/Authentication/getToken", {
        method: 'POST',
        credentials: 'include',
    });
}

export const logout = () => {
    return axios.post("https://localhost:7141/api/Authentication/logout");
}