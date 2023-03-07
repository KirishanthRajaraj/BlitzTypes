import * as React from 'react';
import { useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import { makeStyles, useTheme, styled } from '@material-ui/core/styles';
import { WordsInChars } from '../interfaces/WordsInChars';


interface Props {
    wordsArr: WordsInChars[];
}

const TextFieldLogic: React.FC<Props> = ({ wordsArr }) => {

    const [allWordsInChars, setAllWordsInChars] = useState<Array<WordsInChars>>([]);
    const [allInputWordsInChars, setAllInputWordsInChars] = useState<Array<WordsInChars>>([]);
    const [charId, setCharId] = useState<number>(0);


    useEffect(() => {
        setAllWordsInChars(wordsArr);
    })

    const handleInputChange = (e: any) => {
        assertInputText(e.target.value);
    }

    const assertInputText = (input: string) => {
        let inputCharArr : Array<string> = [];
        let charGroupedInputWords : Array<WordsInChars> = [];
        if(input === " "){
            setCharId(charId + 1);
        }
        inputCharArr = input.split("");
        
        setAllInputWordsInChars(prevState => [...prevState, {id: charId, chars: inputCharArr} ]);
        inputCharArr = [];
        console.log(allInputWordsInChars);
        console.log(allWordsInChars);

    }

    return (
        <>
            <TextField variant='outlined'
                onChange={handleInputChange}></TextField>
        </>
    )

}

export default TextFieldLogic;