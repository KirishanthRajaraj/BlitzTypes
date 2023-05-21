import * as React from 'react';
import { useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid';
import TextFieldMUI from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import { makeStyles, useTheme, styled } from '@material-ui/core/styles';
import { WordsInChars } from '../interfaces/WordsInChars';
import { CharObject } from '../interfaces/CharObject';
import { convertToObject } from 'typescript';


interface Props {
    InputArr: (words: WordsInChars[]) => void;
}

const TextField: React.FC<Props> = ({ InputArr }) => {

    const [allWordsInChars, setAllWordsInChars] = useState<Array<WordsInChars>>([]);
    const [allInputWordsInChars, setAllInputWordsInChars] = useState<Array<WordsInChars>>([]);
    const [charId, setCharId] = useState<number>(0);
    const [wordId, setWordId] = useState<number>(0);
    const [allChars, setAllChars] = useState<Array<CharObject>>([]);
    const [inputValue, setInputValue] = useState('');
    const [wholeInputWord, setWholeInputWord] = useState<Array<{ wordId: number, word: string }>>([]);
    const [wholeWordHistory, setWholeWordHistory] = useState<Array<{ wordId: number, word: string }>>([]);




    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    useEffect(() => {
        splitInputTextIntoChars(inputValue);
    }, [inputValue]);

    useEffect(() => {
        //console.log(allInputWordsInChars);
        sendInputArr(allInputWordsInChars);
    }, [allInputWordsInChars]);

    const sendInputArr = (InputWords: Array<WordsInChars>) => {
        InputArr(InputWords);
    }

    const splitInputTextIntoChars = (input: string) => {
        let inputCharArr: Array<CharObject> = [];
        let charGroupedInputWords: Array<WordsInChars> = [];
        let charObject: Array<CharObject> = [];
        let wholeWord: Array<{ wordId: number, word: string }> = [];
        let wholeWordCopy: Array<{ wordId: number, word: string }> = [];




        input.split(" ").forEach((word) => {
            setWordId(allInputWordsInChars.length);
            if (word.length > 0) {
                if (inputValue.length > 0) {
                    wholeWord.push({ wordId: wordId, word: word });
                }
            }

        });

        if (input.includes(" ")) {
            setWholeWordHistory(prevWholeWordHistory => [...prevWholeWordHistory, ...wholeWord]);
            setWholeInputWord(prevWholeInputWord => [...prevWholeInputWord, ...wholeWord]);

        } else {
            wholeWordCopy = [...wholeWordHistory]
            wholeWordCopy[wholeWordCopy.length - 1] = wholeWord[0];
            console.log(wholeWord[0])

            console.log(wholeWordCopy)

            setWholeWordHistory(prevWholeWordHistory => [...prevWholeWordHistory, ...wholeWordCopy]);
            

        }


        wholeInputWord.forEach((wholeword) => {
            wholeword.word.split("").forEach((char) => {
                inputCharArr.push({ char: char });
            });
            charGroupedInputWords.push({ chars: inputCharArr });
            setAllChars(inputCharArr);

            inputCharArr = [];

        });
        setAllInputWordsInChars(charGroupedInputWords);
        if (input.includes(" ")) {
            setInputValue("");
        }
    }

    return (
        <>
            <TextFieldMUI variant='outlined'
                onChange={handleInputChange} value={inputValue}></TextFieldMUI>
        </>
    )

}

export default TextField;