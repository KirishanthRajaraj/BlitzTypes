'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import * as Auth from "../client/Authentication";
import { useAppContext } from '@/app/context/AppContext';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation"
import { Toast, ToastAction } from "./ui/toast"
import { toast, useToast } from "./ui/use-toast"
import { Toaster } from "./ui/toaster"
import { Checkbox } from "./ui/checkbox"
import axios from "axios"
import BouncingDotsLoader from "./BouncingDotsLoader"

export function LoginForm() {

    const { token, saveToken, removeToken } = useAppContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    const router = useRouter();
    const { toast } = useToast()

    useEffect(() => {
        console.log(rememberMe);
    }, [rememberMe]);

    useEffect(() => {
        isUserAuthenticated();
    }, []);

    useEffect(() => {
        if (isAuthenticated === true) {
            router.push("/profile")
        }
    }, [isAuthenticated]);

    const isUserAuthenticated = async () => {
        try {
            let res = await Auth.isAuthenicated();
            setIsAuthenticated(true);
            console.log(res);

        } catch (error) {

            try {

                await Auth.getToken();
                await isUserAuthenticated();
                setIsAuthenticated(true);

            } catch (error) {
                setIsLoading(false);
                setIsAuthenticated(false);
                toast({
                    variant: "destructive",
                    title: "Login failed",
                    description: error.response.data.error,
                })
            }
            toast({
                variant: "destructive",
                title: "Login failed",
                description: error.response.data.error,
            })
            console.error(error);
        }
    }

    async function loginWithGoogle() {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://localhost:7141/api/Authentication/ExternalLogin?provider=Google&returnUrl=https://localhost:3000/profile';
        document.body.appendChild(form);
        form.submit();
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Auth.login(username, password, rememberMe);
            if (response.status === 200) {
                router.push('/profile');
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Login failed",
                description: error.response.data.error,
            })
            console.log(error);
        }
    };

    return (
        <>
            {isLoading ? (<BouncingDotsLoader></BouncingDotsLoader>) : (
                <form onSubmit={handleSubmit} className="mx-auto max-w-sm border-0">
                    <Card className="mx-auto max-w-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl">Login</CardTitle>
                            <CardDescription>
                                Enter your username or email below to login to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="example"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        autoComplete="email"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        <Link href="#" className="ml-auto inline-block text-sm underline">
                                            Forgot your password?
                                        </Link>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="on"
                                        required
                                    />
                                </div>

                                <div className="group flex gap-2 items-end">
                                    <Checkbox id="rememberMe" checked={rememberMe} onCheckedChange={() => setRememberMe(prev => !prev)} />
                                    <Label htmlFor="rememberMe">Remember me</Label>
                                </div>

                                <Button type="submit" className="w-full">
                                    Login
                                </Button>

                                <Button onClick={loginWithGoogle} variant="outline" className="w-full"
                                    name='provider'
                                    value='Google'
                                    type="button"
                                >
                                    Login with Google
                                </Button>

                            </div>
                            <div className="mt-4 text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href="/register" className="underline">
                                    Sign up
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            )}
        </>
    )
}