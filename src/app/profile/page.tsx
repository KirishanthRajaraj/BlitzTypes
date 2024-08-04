'use client';
import React, { useEffect, useState } from 'react'
import * as Auth from "../../client/Authentication";
import { useAppContext } from '../context/AppContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'

export default function Profile() {
    const [username, setUsername] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const router = useRouter()

    useEffect(() => {
        getUser();
    }, []);


    useEffect(() => {

    }, [isAuthenticated]);

    const getUser = async () => {
        let userRes: any;
        try {
            const token = Cookies.get('jwtToken');
            userRes = await Auth.getUser(token);
            setUsername(userRes.data.userName);
            console.log(userRes.data.request);
            setIsAuthenticated(true);
        } catch (error) {
            router.push('/login');
            console.log(error);
        }
    }

    return (
        <main className="flex min-h-screen flex-col p-24">
            <h1>Profile</h1>
            <h1>Welcome {username}</h1>
        </main>
    )
}