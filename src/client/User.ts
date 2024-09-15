import * as React from "react";
import axios from "axios";
import { Language } from "@/enums/language";
import type { NextApiRequest, NextApiResponse } from 'next';

export const getUser = async () => {
    return axios.get("https://blitztypes-gnb3fehseygja5ad.westeurope-01.azurewebsites.net/api/User/getCurrentUser", {
        withCredentials: true
    });
}