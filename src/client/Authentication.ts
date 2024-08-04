import * as React from "react";
import axios from "axios";
import { Language } from "@/enums/language";

export const login = (username, password) => {
    return axios.post("https://localhost:7141/api/Authentication/login", {
        Username: username,
        Password: password,
        RememberMe: false
    });
}

export const register = (username, email, password) => {
    return axios.post("https://localhost:7141/api/Authentication/register", {
        Username: username,
        Email: email,
        Password: password,
    });
}

export const getUser = (token: string) => {
    return axios.get("https://localhost:7141/api/User/getUser", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}