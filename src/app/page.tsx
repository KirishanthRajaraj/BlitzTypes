'use client'

import Counter from "@/components/Counter";
import ResultPopup from "@/components/ResultPopup";
import TextBox from "@/components/TextBox";
import TextField from "@/components/TextFieldLogic";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Language } from "@/enums/language";
import { WordsInChars } from "@/interfaces/WordsInChars";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [inputWordsArr, setInputWordsArr] = useState<Array<WordsInChars>>([])
  const [allWordsArr, setAllWordsArr] = useState<Array<WordsInChars>>([])
  const textFieldReference = useRef<HTMLInputElement>(null);
  const [isStartedTyping, setIsStartedTyping] = useState<boolean>(false);
  const [timerFinished, setTimerFinished] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>(Language.English);

  useEffect(() => {
    if (inputWordsArr.length > 0) {
      setIsStartedTyping(true);
    }
  }, [inputWordsArr]);

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex justify-between">
        <Counter CountDownAt={10} isStartedTyping={isStartedTyping} setTimerFinished={setTimerFinished} allWords={allWordsArr} />
        <DropdownMenu>
          <DropdownMenuTrigger>Open</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Languages</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setLanguage(Language.English)}>English</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage(Language.German)}>German (Switzerland)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <TextBox InputWords={inputWordsArr} language={language} textFieldRef={textFieldReference} allWordsArr={setAllWordsArr} />
      <TextField InputArr={setInputWordsArr} textFieldRef={textFieldReference} />

    </main>
  );
}
