'use client'

import { faList, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Cookies from 'js-cookie';
import Image from 'next/image';
import * as Auth from "@/client/Authentication";
import * as User from "@/client/User";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Language } from "@/enums/language";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/app/context/AppContext';

export const Navigation = ({ className = '' }) => {

  const [language, setLanguage] = useState<Language>(Language.English);
  const [authLink, setAuthLink] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { setData, data } = useAppContext();

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setData({ language: language });

  }, [language]);

  const logoutUser = async () => {
    let response: any;
    try {
      response = await Auth.logout();
      location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const getUser = async () => {
    let userRes: any;
    try {
      setAuthLink('/login');
      const token = Cookies.get('jwtToken');
      userRes = await User.getUser();
      setUsername(userRes.data.userName);
      if (userRes.data.request.status === 200 || userRes.data.request.status === 201) {
        setIsAuthenticated(true);
        setAuthLink('/profile');
      } else {
        setIsAuthenticated(false);
        router.push('/login');
      }

    } catch (error) {
      setAuthLink('/login');
      console.log(error);
    }
  }

  return (
    <>
      <div className={`${className} flex justify-between`}>
        <Link href={"/"}>
          <Image
            src="/logo.png"
            width={60}
            height={500}
            alt="logo" />
        </Link>
        <div className={`flex items-center space-x-4 relative justify-end`}>
          <Link href="/leaderboard">
            <FontAwesomeIcon icon={faList} />
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost">{language}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Languages</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLanguage(Language.English)}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage(Language.German)}>German (Switzerland)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Separator orientation="vertical" className="h-12" />
          <Link href={authLink}>
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <Button className='w-auto' variant='ghost' onClick={logoutUser}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </Button>
        </div>
      </div>
    </>
  )
}
function setUsername(userName: any) {
  throw new Error("Function not implemented.");
}

