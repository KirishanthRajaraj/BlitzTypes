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
  const { setData } = useAppContext();

  const router = useRouter();

  useEffect(() => {
    if (inputWordsArr.length > 0) {
      setIsStartedTyping(true);
    }
  }, [inputWordsArr]);

  useEffect(() => {
    setData({ language: language });
  }, [language]);

  return (
    <>
      <div className="">
        <div className="flex justify-between items-start">
          <Counter CountDownAt={10} isStartedTyping={isStartedTyping} setTimerFinished={setTimerFinished} allWords={allWordsArr} />

        </div>
        <TextBox InputWords={inputWordsArr} language={language} textFieldRef={textFieldReference} allWordsArr={setAllWordsArr} />
        <TextField InputArr={setInputWordsArr} textFieldRef={textFieldReference} />
      </div>

    </>
  );
}
