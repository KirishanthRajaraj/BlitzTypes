import * as React from "react";
import axios from "axios";
import { Language } from "@/enums/language";

export const getAllCandidates = () => {
    return axios.get("https://blitztypes-gnb3fehseygja5ad.westeurope-01.azurewebsites.net/api/User/getAllUsersForLeaderboard");
}