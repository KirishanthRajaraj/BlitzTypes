'use client';
import { useAppContext } from '@/app/context/AppContext';
import React from 'react'

const TypingResult = () => {
    const { data } = useAppContext();

    var correctCharAmount = 0;
    var amountTyped = 0;
    var correctWordsAmount = 0;

    const calcTypingSpeedPerMin = () => {
        if (data && data.finalWords && data.typingTime) {
            data.finalWords.forEach(word => {
                if (word.isCorrect) {
                    correctWordsAmount++;
                }
            });
            let wordsPerMin = (correctWordsAmount / data.typingTime) * 60;

            return wordsPerMin;
        }
    }

    const calcCorrectTypingPercentage = () => {
        if (data && data.finalWords && data.typingTime) {
            data.finalWords.forEach(word => {
                word.chars.forEach(char => {

                    if (char.isCorrect) {
                        correctCharAmount++;
                    }

                    if (char.isTyped) {
                        amountTyped++;
                    }

                });
            });

            console.log(correctCharAmount);
            console.log(amountTyped);

            let percentageCorrect = (correctCharAmount / amountTyped) * 100;
            percentageCorrect = Math.max(Math.round(percentageCorrect), 100);

            return percentageCorrect;
        }
    }

    const typingSpeed = calcTypingSpeedPerMin();
    const correctPercentage = calcCorrectTypingPercentage(); 

    return (
        <>
            <br></br>

            <h3>
                Typing speed: {typingSpeed}
            </h3>

            <br></br>

            <h3>
                Percentage: {correctPercentage}%
            </h3>
        </>
    )
}

export default TypingResult