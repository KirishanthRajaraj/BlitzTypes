import * as React from 'react';
import { useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import { makeStyles, useTheme, styled } from '@material-ui/core/styles';
import { WordsInChars } from '../interfaces/WordsInChars';
import { CharObject } from '../interfaces/CharObject';


interface Props {
    InputArr: (words: WordsInChars[]) => void;
}

const TextFieldLogic: React.FC<Props> = ({ InputArr }) => {

    const [allWordsInChars, setAllWordsInChars] = useState<Array<WordsInChars>>([]);
    const [allInputWordsInChars, setAllInputWordsInChars] = useState<Array<WordsInChars>>([]);
    const [charId, setCharId] = useState<number>(0);
    const [wordId, setWordId] = useState<number>(0);
    const [allChars, setAllChars] = useState<Array<CharObject>>([]);


    const handleInputChange = (e: any) => {
        splitInputTextIntoChars(e.target.value);
    }

    useEffect(() => {
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

    return (
        <>
            <TextField variant='outlined'
                onChange={handleInputChange}></TextField>
        </>
    )

}

export default TextFieldLogic;