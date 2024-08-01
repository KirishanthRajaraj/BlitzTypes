import * as React from "react";
import axios from "axios";
import { Language } from "@/enums/language";

export const getAllWords = (language: Language) => {
    return axios.get("https://localhost:7141/api/Words/GetAllWords", {
        params: {
            language: language
        }
    });
}

export const getWords = (language: Language, toSkip: number, toTake: number) => {
    return axios.get("https://localhost:7141/api/Words/GetWords", {
        params: {
            language: language,
            toSkip,
            toTake
        }
    });
}