'use client'

import Counter from "@/components/Counter";
import ResultPopup from "@/components/ResultPopup";
import TextBox from "@/components/TextBox";
import TextField from "@/components/TextFieldLogic";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Language } from "@/enums/language";
import { WordsInChars } from "@/interfaces/WordsInChars";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import * as Auth from "@/client/Authentication";
import Cookies from 'js-cookie';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Link from "next/link";
import { useRouter } from 'next/navigation'

export default function Home() {
  const [inputWordsArr, setInputWordsArr] = useState<Array<WordsInChars>>([])
  const [allWordsArr, setAllWordsArr] = useState<Array<WordsInChars>>([])
  const textFieldReference = useRef<HTMLInputElement>(null);
  const [isStartedTyping, setIsStartedTyping] = useState<boolean>(false);
  const [timerFinished, setTimerFinished] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>(Language.English);
  const [username, setUsername] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLink, setAuthLink] = useState('');

  const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (inputWordsArr.length > 0) {
      setIsStartedTyping(true);
    }
  }, [inputWordsArr]);

  const getUser = async () => {
    let userRes: any;
    try {
      setAuthLink('/login');
      const token = Cookies.get('jwtToken');
      userRes = await Auth.getUser(token);
      setUsername(userRes.data.userName);
      if (userRes.data.request.status === 200 || userRes.data.request.status === 201) {
        setIsAuthenticated(true);
        setAuthLink('/profile');
      }  else {
        setIsAuthenticated(false);
        router.push('/login');
      }

    } catch (error) {
      setAuthLink('/login');
      console.log(error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <Counter CountDownAt={10} isStartedTyping={isStartedTyping} setTimerFinished={setTimerFinished} allWords={allWordsArr} />
        </div>
        <div className="flex items-center space-x-4 relative">
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
        </div>
      </div>
      <TextBox InputWords={inputWordsArr} language={language} textFieldRef={textFieldReference} allWordsArr={setAllWordsArr} />
      <TextField InputArr={setInputWordsArr} textFieldRef={textFieldReference} />

    </main>
  );
}
