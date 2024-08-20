'use client';
import React, { useEffect, useState } from 'react'
import * as Auth from "../../client/Authentication";
import { useAppContext } from '../context/AppContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';

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
            userRes = await Auth.getUser();
            setUsername(userRes.data.userName);
            setIsAuthenticated(true);
        } catch (error) {
            if (error.request.status === 401) {
                try {
                    await Auth.getToken();
                    getUser();
                } catch (error) {
                    router.push("/login");
                    console.log(error);
                }
            }
            console.log(error);
        }
    }

    const logoutUser = async () => {
        let response: any;
        try {
            response = await Auth.logout();
            location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h1>Profile</h1>
            <h1>Welcome {username}</h1>
            <Button className='w-auto' variant='ghost' onClick={logoutUser}>
                Logout
            </Button>
        </>
    )
}