import * as React from "react";
import axios from "axios";
import { Language } from "@/enums/language";

export const getAllWords = (language: Language) => {
    return axios.get("https://blitztypes-gnb3fehseygja5ad.westeurope-01.azurewebsites.net/api/Words/GetAllWords", {
        params: {
            language: language
        }
    });
}

export const getWords = (language: Language, toSkip: number, toTake: number) => {
    return axios.get("https://blitztypes-gnb3fehseygja5ad.westeurope-01.azurewebsites.net/api/Words/GetWords", {
        params: {
            language: language,
            toSkip,
            toTake
        }
    });
}