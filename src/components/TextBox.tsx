import * as React from 'react';
import { useEffect, useRef, useState } from "react";

import * as ClientTextBox from "../client/textbox";
import { WordsInChars } from '../interfaces/WordsInChars';
import { CharObject } from '../interfaces/CharObject';
import { text } from 'node:stream/consumers';
import BouncingDotsLoader from './BouncingDotsLoader';
import { Language } from '@/enums/language';
import { useAppContext } from '@/app/context/AppContext';


interface Props {
  InputWords: WordsInChars[];
  language: Language;
  textFieldRef: React.RefObject<HTMLInputElement>;
  allWordsArr: (words: WordsInChars[]) => void;
}

interface Words {
  id: number;
  word: string;
};

const TextBox: React.FC<Props> = ({ InputWords, language, textFieldRef, allWordsArr }) => {

  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(Language.English);
  const [wordId, setWordId] = useState<number>(0);
  const [charId, setCharId] = useState<number>(0);
  const [allWords, setAllWords] = useState<Array<Words>>([]);
  const [toSkip, setToSkip] = useState<number>(10);
  const [toTake, setToTake] = useState<number>(10);
  const initialWordCount = 30;
  const [allWordsInChars, setAllWordsInChars] = useState<Array<WordsInChars>>([]);
  const [inputWordsInChars, setInputWordsInChars] = useState<Array<WordsInChars>>([]);
  const [allChars, setAllChars] = useState<Array<CharObject>>([]);
  const [isCorrect, setIsCorrect] = useState<boolean>(true);
  const textboxRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState<number>(1);
  const [wordsToDel, setWordsToDel] = useState([]);
  const { data } = useAppContext();
  var isCurrentRowDeletable = false;

  useEffect(() => {
    setInputWordsInChars(InputWords);
  }, [InputWords])

  useEffect(() => {
    setCurrentLanguage(language);
  }, [language])

  useEffect(() => {
    getWords();
  }, [currentLanguage])

  useEffect(() => {
    getWords();
  }, [])

/* for debugging 

  useEffect(() => {
    if (data?.currentTime !== undefined) {
      console.log(data.currentTime);
    }
  }, [data.currentTime])
*/

  useEffect(() => {
    assertInputText();
  }, [inputWordsInChars])

  useEffect(() => {
    if (inputWordsInChars.length - 1 > 0) {
      isNewLine(inputWordsInChars.length - 1);
    }
    assertInputText();
  }, [inputWordsInChars.length])

  useEffect(() => {
    splitWordsToChars(allWords);
  }, [allWords])

  useEffect(() => {
    setTextboxHeight(2);
    sendAllWordsArr(allWordsInChars);
  }, [allWordsInChars])

  const sendAllWordsArr = (wordsArr: Array<WordsInChars>) => {
    allWordsArr(wordsArr);
  }

  const isNewLine = (index): boolean => {
    let wordElements;

    if (textboxRef.current && index !== 0) {
      const computedStyle = getComputedStyle(textboxRef.current);
      const textBoxWidth = textboxRef.current.clientWidth - (parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight));
      wordElements = textboxRef.current.querySelectorAll('div.word') as NodeListOf<HTMLDivElement> | null;

      let prevWordElement = document.getElementById(`word-${index - 1}`);
      let currentWordElement = document.getElementById(`word-${index}`);
      if (prevWordElement === null) {
        prevWordElement = currentWordElement;
      }

      if (currentWordElement.offsetTop !== prevWordElement.offsetTop) {
        isCurrentRowDeletable = true;
        setWordIndex(1);
      }
    }

    if (isCurrentRowDeletable === true) {
      deleteWordsUpToIndex(index);
      fetchMoreWords();
    }
    return isCurrentRowDeletable;
  }

  const setTextboxHeight = (visibleRowAmount: number) => {
    let charFontHeight;

    if (textboxRef.current) {
      let childSpan = textboxRef.current.querySelector('span.char') as HTMLSpanElement | null;
      if (childSpan) {
        charFontHeight = childSpan.offsetHeight;
      }

    }
    let finalTextboxHeight = charFontHeight * visibleRowAmount - 5;
    let textBoxInner = textboxRef.current.querySelector('#text-box-inner') as HTMLSpanElement | null;
    textBoxInner.style.height = finalTextboxHeight + "px";
    textBoxInner.style.overflow = "hidden";
  }

  const deleteWordsUpToIndex = (index) => {
    for (let i = 0; i < index; i++) {
      const wordElement = document.getElementById(`word-${i}`);
      if (wordElement) {
        wordElement.remove();
      }
    }
    isCurrentRowDeletable = false;
  }

  const getWords = () => {
    setAllWords([]);
    setAllWordsInChars([]);
    setIsFetchingData(true);
    ClientTextBox.getWords(currentLanguage, toSkip, initialWordCount)
      .then((response) => {
        const words: Array<Words> = response.data.map((item: any) => ({
          id: item.id,
          word: item.words
        }));
        setAllWords(words);
      })
      .finally(() => {
        setIsFetchingData(false);
        isNewLine(0);
        setToSkip(prevToSkip => prevToSkip + toTake)
      });
  };

  const fetchMoreWords = () => {

    ClientTextBox.getWords(currentLanguage, toSkip, toTake)
      .then((response) => {
        const words: Array<Words> = response.data.map((item: any) => ({
          id: item.id,
          word: item.words
        }));

        setAllWords(words);
      })
      .finally(() => {
        isNewLine(inputWordsInChars.length - 1);
        setToSkip(prevToSkip => prevToSkip + toTake)
      });
  }

  const splitWordsToChars = (allWords: Array<Words>) => {

    allWords.forEach((word) => {
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
    let newLineIs = false;

    let inputword = inputWordsInChars[inputWordsInChars.length - 1];

    let textboxchars = allWordsInChars[inputWordsInChars.length - 1];

    if (typeof textboxchars !== 'undefined') {

      if (inputword.chars.length == 0 || inputword !== undefined) {
        let textboxcharsCopy = [...allWordsInChars]

        for (let z = 0; z < textboxchars.chars.length; z++) {
          textboxcharsCopy[inputWordsInChars.length - 1].chars[z].opacity = 0.6;
        }

        setAllWordsInChars(textboxcharsCopy);
      }
    }
    if (typeof inputword !== 'undefined') {
      //create copy to set state
      let textboxcharsCopy = [...allWordsInChars];

      for (let j = 0; j < inputword.chars.length; j++) {
        if (typeof textboxchars !== 'undefined') {
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
            textboxcharsCopy[inputWordsInChars.length - 1].isCorrect = true;
            textboxcharsCopy[inputWordsInChars.length - 1].chars[j].isCorrect = true;
            // make text full white when it's correct
            textboxcharsCopy[inputWordsInChars.length - 1].chars[j].color = "white";
            textboxcharsCopy[inputWordsInChars.length - 1].chars[j].opacity = 100;
            // reset all char isCurrent properties to false
            textboxcharsCopy.forEach(textbox => { textbox.chars.forEach(char => { char.isCurrent = false; }); });
            textboxcharsCopy[inputWordsInChars.length - 1].chars[j].isCurrent = true;
            textboxcharsCopy[inputWordsInChars.length - 1].chars[j].isTyped = true;
            textboxcharsCopy[inputWordsInChars.length - 1].chars[j].timeStampTyped = data.currentTime;

            setAllWordsInChars(textboxcharsCopy);
          } else {

            setIsCorrect(false);
            textboxchars.isCorrect = isCorrect;
            textboxchars.chars[j].isCorrect = false;
            textboxcharsCopy[inputWordsInChars.length - 1].isCorrect = false;
            textboxcharsCopy[inputWordsInChars.length - 1].chars[j].isCorrect = false;
            // make text red when it's incorrect
            textboxcharsCopy[inputWordsInChars.length - 1].chars[j].color = "red";
            textboxcharsCopy[inputWordsInChars.length - 1].chars[j].opacity = 100;
            textboxcharsCopy.forEach(textbox => { textbox.chars.forEach(char => { char.isCurrent = false; }); });
            textboxcharsCopy[inputWordsInChars.length - 1].chars[j].isCurrent = true;
            textboxcharsCopy[inputWordsInChars.length - 1].chars[j].isTyped = true;
            textboxcharsCopy[inputWordsInChars.length - 1].chars[j].timeStampTyped = data.currentTime;

            // check if current char in word is typed
            if (j === textboxcharsCopy[inputWordsInChars.length - 1].chars.length - 1) {
              textboxcharsCopy[inputWordsInChars.length - 1].isTyped = true;
            }
            setAllWordsInChars(textboxcharsCopy);
          }

        }
      }

      // #region correct current mouse cursor between spaces

      // set isTyped property for entire word
      let wordIsTyped = true;
      for (let l = 0; l < textboxcharsCopy[inputWordsInChars.length - 1].chars.length; l++) {
        if (textboxcharsCopy[inputWordsInChars.length - 1].chars[l].isTyped !== true) {
          wordIsTyped = false;
        }
      }
      if (wordIsTyped) {
        textboxcharsCopy[inputWordsInChars.length - 1].isTyped = true;
        textboxcharsCopy[inputWordsInChars.length - 1].timeStampTyped = data.currentTime;
      }

      // initially set isCurrentPrev to false, also clears future changes in input
      // isCurrentPrev is needed to set current typing cursor between spaces
      textboxcharsCopy[inputWordsInChars.length].chars[0].isCurrentPrev = false;
      textboxcharsCopy[inputWordsInChars.length - 1].chars[0].isCurrentPrev = false;

      if (inputWordsInChars.length > 1) {
        textboxcharsCopy[inputWordsInChars.length].chars[0].isCurrentPrev = false;
        textboxcharsCopy[inputWordsInChars.length - 1].chars[0].isCurrentPrev = false;

        // setting isCurrentPrev when previous word is typed and current input is not typed
        if (textboxcharsCopy[inputWordsInChars.length - 2].isTyped && inputword.chars.length === 0) {
          textboxcharsCopy[inputWordsInChars.length - 1].chars[0].isCurrentPrev = true;
          // update allWordsInChars state var to trigger rerender
          setAllWordsInChars(textboxcharsCopy);
        }

        // set isCurrent of previous word false when new current word hasn't been typed yet
        if (textboxcharsCopy[inputWordsInChars.length - 2].chars[textboxcharsCopy[inputWordsInChars.length - 2].chars.length - 1] && inputword.chars.length === 0) {
          textboxcharsCopy[inputWordsInChars.length - 2].chars[textboxcharsCopy[inputWordsInChars.length - 2].chars.length - 1].isCurrent = false;
        }

      }
      setAllWordsInChars(textboxcharsCopy);
      // #endregion
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
        <BouncingDotsLoader />
      ) : (
        <>
          <div className='fade-transition fade-transition fade-in'>
            {allWordsInChars.map((item, index) => (
              <div className='word' id={`word-${index}`} key={`word-${index}`} style={{ display: 'inline' }}>
                {item.chars.map((char, charIndex) => (
                  <span className={`char ${char.isCurrent ? 'currentChar' : ''} ${char.isCurrentPrev ? 'currentCharPrev' : ''}`} key={`${index}-${charIndex}`} style={{ color: char.color, opacity: char.opacity }} >{char.char}</span>
                ))} <span> </span>
              </div>
            ))}
          </div>
        </>
      )
    );
  }

  return (
    <>
      <div ref={textboxRef} className='container h-full min-h-[calc(100vh-200px)] flex align-center items-center text-box justify-center '>
        <div onClick={handleInputFieldRef} className='text-white text-center text-4xl text-box-inner' id='text-box-inner'>
          {isLoaded()}
        </div>
      </div>
    </>
  );

}
export default TextBox;