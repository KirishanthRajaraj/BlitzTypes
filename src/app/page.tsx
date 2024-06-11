'use client'

import TextBox from "@/components/TextBox";
import TextField from "@/components/TextFieldLogic";
import { WordsInChars } from "@/interfaces/WordsInChars";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Home() {
  const [inputWordsArr, setInputWordsArr] = useState<Array<WordsInChars>>([])
  const textFieldReference = useRef<HTMLInputElement>(null);
  return (
    
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <TextBox InputWords={inputWordsArr} textFieldRef={textFieldReference}/>
        <TextField InputArr={setInputWordsArr} textFieldRef={textFieldReference}/>
    </main>
  );
}
