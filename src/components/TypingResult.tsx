'use client';
import { useAppContext } from '@/app/context/AppContext';
import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

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

    const chartData = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

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

            <br>
            </br>
            {chartData && Array.isArray(chartData) && (
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    width={500}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
            )}

        </>
    )
}

export default TypingResult