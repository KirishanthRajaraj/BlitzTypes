import * as React from "react";
import axios from "axios";
import { Language } from "@/enums/language";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllWords = (language: Language) => {
    return axios.get(`${API_URL}/Words/GetAllWords`, {
        params: {
            language: language
        }
    });
}

export const getWords = (language: Language, toSkip: number, toTake: number) => {
    return axios.get(`${API_URL}/Words/GetWords`, {
        params: {
            language: language,
            toSkip,
            toTake
        }
    });
}