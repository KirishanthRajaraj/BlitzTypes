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

export function LoginForm() {

    const { token, saveToken, removeToken } = useAppContext();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const { toast } = useToast()

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (isAuthenticated === true) {
            router.push("/profile")
        }
    }, [isAuthenticated]);

    // to determine if there is already an active user logged in
    const getUser = async () => {
        let userRes: any;
        try {
            const token = Cookies.get('jwtToken');
            console.log(token);
            userRes = await Auth.getUser();
            setIsAuthenticated(true);
            router.push('/profile');
        } catch (error) {
            setIsAuthenticated(false);
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Auth.login(username, password);
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
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <form method='POST' action={`https://localhost:7141/api/Authentication/ExternalLogin?provider=Google&returnUrl=https://localhost:3000/profile`} >
                            <Button variant="outline" className="w-full"
                                    type="submit"
                                    name='provider'
                                    value='Google'
                            >
                                Login with Google
                            </Button>
                        </form>

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

        </>
    )
}