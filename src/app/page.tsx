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
import { faRotateRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import * as Auth from "@/client/Authentication";
import Cookies from 'js-cookie';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useAppContext } from "./context/AppContext";
import { Countdown } from "@/enums/countdown";

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
  const { setData, data } = useAppContext();


  const router = useRouter();

  useEffect(() => {
    if (inputWordsArr.length > 0) {
      setData({ isStartedTyping: true });
      setIsStartedTyping(true);
    } else {
      setData({ isStartedTyping: false });
      setIsStartedTyping(false);
    }
  }, [inputWordsArr]);

  useEffect(() => {
    setData({ language: language });
  }, [language]);

  useEffect(() => {
    setData({ typingTime: Countdown.Seconds_15 });
  }, []);

  const isUserAuthenticated = async () => {
    try {
      let res = await Auth.isAuthenicated();
      setIsAuthenticated(true);
    } catch (error) {

      try {

        await Auth.getToken();
        await isUserAuthenticated();

      } catch (error) {
        // your are currently not logged in toast or so
        console.log(error);
        setIsAuthenticated(false);
      }

      console.error(error);
    }
  }

  return (
    <>
      <div className="">
        <div className="flex justify-between items-start">
          <Counter CountDownAt={data.typingTime} isStartedTyping={isStartedTyping} setTimerFinished={setTimerFinished} allWords={allWordsArr} />
        </div>
        <TextField InputArr={setInputWordsArr} textFieldRef={textFieldReference} />
        <TextBox InputWords={inputWordsArr} language={language} textFieldRef={textFieldReference} allWordsArr={setAllWordsArr} />
      </div>

    </>
  );
}
