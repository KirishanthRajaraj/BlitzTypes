import * as React from "react";
import axios from "axios";
import { Language } from "@/enums/language";
import type { NextApiRequest, NextApiResponse } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUser = async () => {
    return axios.get(`${API_URL}/User/getCurrentUser`, {
        withCredentials: true
    });
}