import * as React from 'react';
import { useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';

import * as ClientTextBox from "../client/textbox";
import { makeStyles, useTheme, styled } from '@material-ui/core/styles';
import { WordsInChars } from '../interfaces/WordsInChars';
import { CharObject } from '../interfaces/CharObject';
import { text } from 'node:stream/consumers';


interface Props {
  InputWords: WordsInChars[];
  textFieldRef: React.RefObject<HTMLInputElement>;
}

interface EnglishWords {
  id: number;
  word: string;
};

const TextBox: React.FC<Props> = ({ InputWords, textFieldRef }) => {

  const theme = useTheme();

  const useStyles = makeStyles({
    box: {
      height: 200,
      overflow: 'hidden',
      backgroundColor: theme.palette.secondary.main,
    },
  });

  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [wordId, setWordId] = useState<number>(0);
  const [charId, setCharId] = useState<number>(0);
  const [allEnglishWords, setAllEnglishWords] = useState<Array<EnglishWords>>([]);
  const [allEnglishChars, setAllEnglishChars] = useState<Array<EnglishWords>>([]);
  const [toSkip, setToSkip] = useState<number>(0);
  const [toTake, setToTake] = useState<number>(100);
  const [allWordsInChars, setAllWordsInChars] = useState<Array<WordsInChars>>([]);
  const [inputWordsInChars, setInputWordsInChars] = useState<Array<WordsInChars>>([]);
  const [allChars, setAllChars] = useState<Array<CharObject>>([]);
  const [isCorrect, setIsCorrect] = useState<boolean>(true);


  useEffect(() => {
    setInputWordsInChars(InputWords);
  }, [InputWords])

  useEffect(() => {
    getEnglishWords();
  }, [])

  useEffect(() => {
    assertInputText();
  }, [inputWordsInChars])

  useEffect(() => {
    splitWordsToChars(allEnglishWords);

  }, [allEnglishWords])

  const getEnglishWords = () => {
    setIsFetchingData(true);
    console.log("fetching data")
    ClientTextBox.getEnglishWords(toSkip, toTake)
      .then((response) => {
        const englishWords: Array<EnglishWords> = response.data.map((item: any) => ({
          id: item.id,
          word: item.words
        }));
        setAllEnglishWords(englishWords);
      })
      .finally(() => {
        setIsFetchingData(false);
      });
  };

  const splitWordsToChars = (allEnglishWords: Array<EnglishWords>) => {

    allEnglishWords.forEach((word) => {
      let tempCharGroupedWord: Array<CharObject> = [];
      let charGroupedWord: Array<WordsInChars> = [];
      let wholeWord: Array<{ wordId: number, word: string }> = [];
      let charObject: Array<CharObject> = [];


      word.word.split(" ").forEach((word) => {
        setWordId(wordId + 1);
        wholeWord.push({ wordId: wordId, word: word })
      });

      wholeWord.forEach((wholeword) => {
        wholeword.word.split("").forEach((char) => {
          setCharId(charId + 1);
          tempCharGroupedWord.push({ char: char, opacity: 0.6, isCorrect: false });
        });
        setAllChars(tempCharGroupedWord);
        charGroupedWord.push({ chars: tempCharGroupedWord });
        tempCharGroupedWord = [];
      });

      setAllWordsInChars((prevAllWordsInChars) => [...prevAllWordsInChars, ...charGroupedWord]);
    });

    return allWordsInChars;
  }

  const assertInputText = () => {
    for (let i = 0; i < inputWordsInChars.length; i++) {
      let inputword = inputWordsInChars[i];
      let textboxchars = allWordsInChars[i];

      if ( typeof textboxchars !== 'undefined' ) {

        if (inputword.chars.length == 0 || inputword !== undefined) {
          let textboxcharsCopy = [...allWordsInChars]

          for (let z = 0; z < textboxchars.chars.length; z++) {
            textboxcharsCopy[i].chars[z].opacity = 0.6;
          }

          setAllWordsInChars(textboxcharsCopy);
        }
      }

      for (let j = 0; j < inputword.chars.length; j++) {
        console.log("input " + inputword.chars.length)
        console.log("j " + j)
        if ( typeof textboxchars !== 'undefined' ) {
        // reset inactive chars
        for (let k = 0; k < textboxchars.chars.length - inputword.chars.length; k++) {


          textboxchars.chars[inputword.chars.length + k].opacity = 0.6;
          textboxchars.chars[inputword.chars.length + k].color = "white";
        }
      }

        if (typeof textboxchars.chars[j] !== 'undefined') {
          if (inputword.chars[j].char === textboxchars.chars[j].char) {
            setIsCorrect(true);
            textboxchars.isCorrect = isCorrect;
            textboxchars.chars[j].isCorrect = true;
            //create copy to set state
            let textboxcharsCopy = [...allWordsInChars]
            // make text full white when it's correct
            textboxcharsCopy[i].chars[j].color = "white";
            textboxcharsCopy[i].chars[j].opacity = 100;
            // reset all char isCurrent properties to false
            textboxcharsCopy.forEach(textbox => {textbox.chars.forEach(char => {char.isCurrent = false;});});
            textboxcharsCopy[i].chars[j].isCurrent = true;

            setAllWordsInChars(textboxcharsCopy);
          } else {

            setIsCorrect(false);
            textboxchars.isCorrect = isCorrect;
            textboxchars.chars[j].isCorrect = false;
            // make text red when it's incorrect
            let textboxcharsCopy = [...allWordsInChars]
            textboxcharsCopy[i].chars[j].color = "red";
            textboxcharsCopy[i].chars[j].opacity = 100;
            textboxcharsCopy.forEach(textbox => {textbox.chars.forEach(char => {char.isCurrent = false;});});
            textboxcharsCopy[i].chars[j].isCurrent = true;

            setAllWordsInChars(textboxcharsCopy);
          }
        }

      }
    }
  }

  const handleInputFieldRef = () => {
    if (textFieldRef.current) {
      textFieldRef.current.focus();
    }
  };

  const isLoaded = () => {
    return (
      isFetchingData ? (
        <h3>Loading ...</h3>
      ) : (
        <div>
          {allWordsInChars.map((item, index) => (
            <span className='word'>
              {item.chars.map((char, charIndex) => (
                <span className={`char ${char.isCurrent ? 'currentChar' : ''}`}  key={charIndex} style={{ color: char.color, opacity: char.opacity }}>{char.char}</span>
              ))} <span> </span>
            </span>
          ))}
        </div>
      )
    );
  }

  return (
    <>
      <Grid item sm={6}>
        <Box sx={{
          color: 'white',
          height: '300px',
          width: '700px',

          overflow: 'hidden',
          border: '5px solid white',
          padding: '20px',
          borderRadius: '20px'
        }}
          onClick={handleInputFieldRef}>
          <Typography variant='h4' component="span">
            {isLoaded()}
          </Typography>
        </Box>
      </Grid>
    </>
  );

}
export default TextBox;