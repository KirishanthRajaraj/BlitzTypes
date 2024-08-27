'use client';
import React, { useEffect, useState } from 'react'
import * as Auth from "../../client/Authentication";
import { useAppContext } from '../context/AppContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/components/Profile'

export default function Profile() {
    const [username, setUsername] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const router = useRouter()

    useEffect(() => {

    }, [isAuthenticated]);

    return (
        <>
            <h1 className='text-5xl font-bold mb-6'>Profile</h1>
            <UserProfile></UserProfile>

        </>
    )
}