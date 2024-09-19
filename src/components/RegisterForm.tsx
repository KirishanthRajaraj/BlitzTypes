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
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';
import { toast } from "./ui/use-toast"

export function RegisterForm() {

    const { token, saveToken, removeToken } = useAppContext();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [pwIdentical, setPwIdentical] = useState(false);
    const [registrationErrors, setRegistrationErrors] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    const [error, setError] = useState('');

    useEffect(() => {
        if (isAuthenticated === true) {
            router.push("/profile")
        }
    }, [isAuthenticated]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        var response;
        try {
            if (confirmPw === password) {
                setPwIdentical(true);
                response = await Auth.register(username, email, password);
                if (response.status === 200) {
                    saveToken(response.data.token);
                    router.push("/profile");
                }
                router.push("/profile");
            } else {
                setPwIdentical(false);
            }
        } catch (error) {
            let errArr = [];
            error.response.data.error.forEach((error) => {
                errArr.push(error);
            });
            const errors = errArr.join('\n');
            toast({
                variant: "destructive",
                title: "Login failed",
                description: errors,
              });
            setError('Invalid sign up attempt.');
        }
    };

    useEffect(() => {
        if (confirmPw === password) {
            setPwIdentical(true);
        } else {
            setPwIdentical(false);
        }
    }, [password, confirmPw])

    return (
        <form onSubmit={handleSubmit} className="mx-auto min-w-96 max-w-sm border-0">
            <Card className="mx-auto max-w-sm  min-w-96">
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription>
                        Register below
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="example@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
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
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="new-password"
                            />
                            {pwIdentical ? null : (<span className="text-xs text-red-700">Passwords do not match</span>)}
                            {registrationErrors.length > 0 && (
                                <div>
                                    {registrationErrors.map((error, index) => (
                                        <div key={index} className="text-xs text-red-700">
                                            {error}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="repeat-password">Confirm Password</Label>
                            </div>
                            <Input
                                id="repeat-password"
                                type="password"
                                value={confirmPw}
                                onChange={(e) => setConfirmPw(e.target.value)}
                                required
                                autoComplete="new-password"
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Sign up
                        </Button>
                        <Button variant="outline" className="w-full">
                            Sign up with Google
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>

    )
}