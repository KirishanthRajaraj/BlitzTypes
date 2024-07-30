'use client'

import Counter from "@/components/Counter";
import ResultPopup from "@/components/ResultPopup";
import TextBox from "@/components/TextBox";
import TextField from "@/components/TextFieldLogic";
import { WordsInChars } from "@/interfaces/WordsInChars";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [inputWordsArr, setInputWordsArr] = useState<Array<WordsInChars>>([])
  const [allWordsArr, setAllWordsArr] = useState<Array<WordsInChars>>([])
  const textFieldReference = useRef<HTMLInputElement>(null);
  const [isStartedTyping, setIsStartedTyping] = useState<boolean>(false);
  const [timerFinished, setTimerFinished] = useState<boolean>(false);

  useEffect(() => {
    if (inputWordsArr.length > 0) {
      setIsStartedTyping(true);
    }

  }, [inputWordsArr]);
  
  return (
    <main className="flex min-h-screen flex-col p-24">
      <Counter CountDownAt={12222} isStartedTyping={isStartedTyping} setTimerFinished={setTimerFinished} allWords={allWordsArr}/>
      <TextBox InputWords={inputWordsArr} textFieldRef={textFieldReference} allWordsArr={setAllWordsArr} />
      <TextField InputArr={setInputWordsArr} textFieldRef={textFieldReference} />
    </main>
  );
}
