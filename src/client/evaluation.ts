import * as React from "react";
import axios from "axios";
import { Language } from "@/enums/language";
import { Countdown } from "@/enums/countdown";

export const submitTypingResult = (score: number, typingTime: number) => {

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const data = {
        highScore: score,
    };

    return axios.post(
        `${API_URL}/User/submitTypingResult`,
        { score: score, typingTime: typingTime },
        {
            params: { score: score, typingTime: typingTime },
            withCredentials: true
        },
    );
}