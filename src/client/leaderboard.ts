import * as React from "react";
import axios from "axios";
import { Language } from "@/enums/language";

export const getAllCandidates = () => {
    return axios.get("https://localhost:7141/api/User/getAllUsersForLeaderboard");
}