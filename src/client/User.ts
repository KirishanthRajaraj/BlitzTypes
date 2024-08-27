import * as React from "react";
import axios from "axios";
import { Language } from "@/enums/language";
import type { NextApiRequest, NextApiResponse } from 'next';

export const getUser = async () => {
    return axios.get("https://localhost:7141/api/User/getCurrentUser", {
        withCredentials: true
    });
}