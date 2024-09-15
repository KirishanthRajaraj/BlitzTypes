import * as React from "react";
import axios from "axios";
import { Language } from "@/enums/language";
import { Countdown } from "@/enums/countdown";

export const submitTypingResult = (score: number, typingTime: number) => {
    const data = {
        highScore: score,
    };

    return axios.post(
        'https://blitztypes-gnb3fehseygja5ad.westeurope-01.azurewebsites.net/api/User/submitTypingResult',
        { score: score, typingTime: typingTime },
        {
            params: { score: score, typingTime: typingTime },
            withCredentials: true
        },
    );
}