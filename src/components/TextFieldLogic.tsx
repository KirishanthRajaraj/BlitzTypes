import * as React from 'react';
import { useEffect, useState } from "react";
import { WordsInChars } from '../interfaces/WordsInChars';
import { CharObject } from '../interfaces/CharObject';
import { useRef } from 'react';


interface Props {
    InputArr: (words: WordsInChars[]) => void;
    textFieldRef: React.RefObject<HTMLInputElement>;
}

const TextFieldLogic: React.FC<Props> = ({ InputArr, textFieldRef }) => {

    const [allWordsInChars, setAllWordsInChars] = useState<Array<WordsInChars>>([]);
    const [allInputWordsInChars, setAllInputWordsInChars] = useState<Array<WordsInChars>>([]);
    const [charId, setCharId] = useState<number>(0);
    const [wordId, setWordId] = useState<number>(0);
    const [allChars, setAllChars] = useState<Array<CharObject>>([]);

    const [currentWord, setCurrentWord] = useState<string>();

    const firstInputRef = useRef<HTMLInputElement>(null);

    const handleSecondInputClick = () => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    };

    const handleInputChange = (e: any) => {
        splitInputTextIntoChars(e.target.value);
    }

    useEffect(() => {
        sendInputArr(allInputWordsInChars);
        handleCurrentWord(allInputWordsInChars);
    }, [allInputWordsInChars]);

    const sendInputArr = (InputWords: Array<WordsInChars>) => {
        InputArr(InputWords);
    }

    const splitInputTextIntoChars = (input: string) => {
        let inputCharArr: Array<CharObject> = [];
        let charGroupedInputWords: Array<WordsInChars> = [];
        let charObject: Array<CharObject> = [];
        let wholeWord: Array<{ wordId: number, word: string }> = [];

        input.split(" ").forEach((word) => {
            setWordId(allInputWordsInChars.length);
            wholeWord.push({ wordId: wordId, word: word })
        });

        wholeWord.forEach((wholeword) => {
            wholeword.word.split("").forEach((char) => {
                inputCharArr.push({ char: char });

            });
            charGroupedInputWords.push({ chars: inputCharArr });
            setAllChars(inputCharArr);

            inputCharArr = [];

        });
        setAllInputWordsInChars(charGroupedInputWords);
    }

    const handleCurrentWord = (InputWords: Array<WordsInChars>) => {
        if (InputWords.length > 0) {
            const lastWordChars = InputWords[InputWords.length - 1].chars;
            setCurrentWord(lastWordChars.map(charObj => charObj.char).join('').toString());
        }
    }

    return (
        <>
            <input className='rounded-xl h-16 focus:outline-none opacity-0 padding-0 margin-0 absolute' 
            onChange={handleInputChange}
            ref={textFieldRef} />
        </>
    )

}

export default TextFieldLogic;