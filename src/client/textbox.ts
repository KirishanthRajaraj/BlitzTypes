import * as React from "react";
import axios from "axios";

export const getAllEnglishWords = () => {
    return axios.get("https://localhost:7141/api/EnglishWords/GetAllEnglishWords");
}

export const getEnglishWords = (toSkip: number, toTake: number)  => {
    return axios.get("https://localhost:7141/api/EnglishWords/GetEnglishWords", { params: { toSkip, toTake } });
}

export const getAverageWordLength = () => {
    return axios.get("https://localhost:7141/api/EnglishWords/GetAverageWordLength");
}