import * as React from "react";
import axios from "axios";
import { Language } from "@/enums/language";

export const setWPMHighscore = (score: number, token: string) => {
    const data = {
        highScore: score,
    };

    const headers: any = {
        'Authorization': `Bearer ${token}`,
    };

    return axios.post(
        'https://localhost:7141/api/User/SetWPMHighscore',
        { score: score },
        {
            params: { score: score },
            withCredentials: true
        },
    );
}