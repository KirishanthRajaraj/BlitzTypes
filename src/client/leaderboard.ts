import * as React from "react";
import axios from "axios";
import { Language } from "@/enums/language";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllCandidates = () => {
    return axios.get(`${API_URL}/User/getAllUsersForLeaderboard`);
}