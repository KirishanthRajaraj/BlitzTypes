'use client'

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Alert, AlertTitle } from './ui/alert';
import { CookieIcon } from "lucide-react"
import { Card, CardContent, CardFooter } from './ui/card';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasAccepted, setHasAccepted] = useState(false);

    useEffect(() => {
        const hasAcceptedCookies = localStorage.getItem('acceptedCookies');
        if (!hasAcceptedCookies) {
            setIsVisible(true)
        } else {
            setHasAccepted(true);
        }
    }, []);

    const handleDismiss = () => {
        localStorage.setItem('acceptedCookies', 'true');
        setIsVisible(false);
    };

    if (hasAccepted) return null;

    return (
        <div
            className={`fixed bottom-4 right-4 z-50 max-w-sm w-full sm:w-96 
            transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-[300px]'}`}>
            <Card className="dark:bg-gray-800">
                <CardContent className="pt-6">
                    <div className="flex items-center space-x-2">
                        <CookieIcon className="h-5 w-5 text-muted-foreground dark:text-gray-400" />
                        <h3 className="font-semibold leading-none tracking-tight dark:text-white">Cookie Notice</h3>
                    </div>
                    <p className="text-sm text-muted-foreground dark:text-gray-300 mt-2">
                        We use essential cookies to ensure the proper functioning of the website.
                    </p>
                    <a className='text-sm mt-2 inline-block text-gray-400 underline hover:text-white duration-200' href="/privacy-policy">
                        learn more
                    </a>
                </CardContent>
                <CardFooter>
                    <Button
                        onClick={handleDismiss}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
                    >
                        I understand
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default CookieBanner;
