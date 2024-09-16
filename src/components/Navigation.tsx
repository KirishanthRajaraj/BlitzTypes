'use client'

import { faList, faRightFromBracket, faUser as faUserSolid } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

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
    isUserAuthenticated();
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

  const isUserAuthenticated = async () => {
    try {
      let res = await Auth.isAuthenicated();
      setIsAuthenticated(true);
    } catch (error) {
      try {
        await Auth.getToken();
        await isUserAuthenticated();
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
      }

      console.error(error);
    }
  }

  return (
    <>
      <div className={`${className} flex justify-between`}>
        <Link href={"/"}>
          <Image
            src="/logo.png"
            width={60}
            height={95}
            alt="logo" />
        </Link>
        <div className={`${data.isStartedTyping ? ' opacity-0' : 'opacity-100'} transition-opacity ease-in-out duration-300 flex items-center space-x-4 relative justify-end`}>
          <Link href="/leaderboard">
            <Button className='w-auto' variant='ghost'>
              <FontAwesomeIcon icon={faList} />
            </Button>
          </Link>


          <Separator orientation="vertical" className="h-12" />
          <Link href={"/profile"}>
            {isAuthenticated ? (
              <FontAwesomeIcon icon={faUserSolid} />
            ) : (<FontAwesomeIcon icon={faUser} />)}
          </Link>
          {isAuthenticated ? (
            <Button className='w-auto' aria-label="logout" variant='ghost' onClick={logoutUser}>
              <FontAwesomeIcon icon={faRightFromBracket} />
            </Button>
          ) : (<></>)}
        </div>
      </div>
    </>
  )
}
