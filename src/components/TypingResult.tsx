'use client';
import { useAppContext } from '@/app/context/AppContext';
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, Legend, Line, LineChart, PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import * as Evaluation from "@/client/evaluation";
import * as Auth from "@/client/Authentication";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Separator } from '@radix-ui/react-dropdown-menu';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "./ui/chart"
import { Button } from './ui/button';
import { WordsInChars } from '@/interfaces/WordsInChars';
import { CharObject } from '@/interfaces/CharObject';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import BouncingDotsLoader from './BouncingDotsLoader';

const TypingResult = () => {
    const router = useRouter()
    const { data, setData } = useAppContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [segments, setSegments] = useState([]);
    const [consistencyInterval, setConsistencyInterval] = useState<number>(2);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    var correctCharAmount = 0;
    var incorrectCharAmount = 0;
    var amountTyped = 0;
    var correctWordsAmount = 0;
    var missedChars = 0;

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

                    if (char.isCorrect == false && char.isTyped) {
                        incorrectCharAmount++;
                    }

                    if (char.isTyped) {
                        amountTyped++;
                    }

                    if (word.isTyped && !char.isTyped) {
                        missedChars++;
                    }

                });

            });
            let percentageCorrect = (correctCharAmount / amountTyped) * 100;
            percentageCorrect = Math.round(percentageCorrect);

            return percentageCorrect;
        }
    }

    function calculateConsistency(numbers): number {

        if (numbers === undefined) {
            numbers = [];
        }
        if (numbers.length === 0) return 0;

        const mean = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;

        const variance = numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / numbers.length;
        const standardDeviation = Math.sqrt(variance);

        const consistency = (1 - (standardDeviation / mean)) * 100;

        // Ensure the consistency is between 0% and 100%
        return Math.max(0, Math.round(Math.min(100, consistency)));
    }


    const prepareConsistencyChartdata = () => {
        let currentGroup: CharObject[] = [];
        let intervalStartTime = 0;
        let finalCharsSegmented: CharObject[][] = [];
        let wordAmountSegmented: { wpm: number; currentStamp: number }[] = [];

        const averageWordLength = 5; // Average word length in characters

        // Ensure finalWords is an array
        const finalWords: WordsInChars[] = Array.isArray(data.finalWords) ? data.finalWords : [];

        // Flatten the finalWords into a single array of CharObject
        const allChars = finalWords.flatMap(word => word.chars);

        for (const char of allChars) {
            const currentCharTime = char.timeStampTyped;

            if (currentCharTime !== undefined) {

                // Check if we need to start a new interval
                if (currentCharTime >= (intervalStartTime + consistencyInterval) && char.isTyped == true) {
                    finalCharsSegmented.push(currentGroup);
                    currentGroup = [];
                    intervalStartTime = currentCharTime;
                }

                // Add character to the current group
                if (char.isTyped) {
                    currentGroup.push(char);
                }
            }

        }

        // Add the last group if it contains any characters
        if (currentGroup.length > 0) {
            finalCharsSegmented.push(currentGroup);
        }

        // Fill with empty arrays if there are fewer segments than needed
        const requiredSegments = Math.ceil(data.typingTime / (consistencyInterval * 1000));
        while (finalCharsSegmented.length < requiredSegments) {
            finalCharsSegmented.push([]);
        }

        // Calculate WPM for each interval
        finalCharsSegmented.forEach((chars, index) => {
            const charAmountPerMin = (chars.length / consistencyInterval) * 60;
            const wpm = charAmountPerMin / averageWordLength;
            wordAmountSegmented.push({ wpm: wpm, currentStamp: consistencyInterval * (index + 1) });
        });

        return wordAmountSegmented;
    }

    const typingSpeed = calcTypingSpeedPerMin();
    const correctPercentage = calcCorrectTypingPercentage();
    const consistencyData = prepareConsistencyChartdata();
    const consistencyPercentage = calculateConsistency(consistencyData.map(val => val.wpm));

    useEffect(() => {
        if (!data.finalWords || data.finalWords.length <= 0) {
            router.push("/");
        } else {
            setIsLoading(false);
        }
        setWPMHighscore();
    }, []);

    const setWPMHighscore = async () => {
        let res: any;
        try {
            const token = Cookies.get('jwtToken');
            res = await Evaluation.setWPMHighscore(typingSpeed, token);
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
            console.log(error);
        }
    }

    return (
        isLoading ? (
            <BouncingDotsLoader />
        ) : (
            <>

                <div className='grid gap-12'>

                    <div className='flex gap-4'>
                        <div className='grid flex-1 gap-4'>

                            <div className='flex flex-1 gap-4'>
                                <Card className='flex-1'>
                                    <CardHeader>
                                        <CardDescription>WPM</CardDescription>
                                        <CardTitle className="text-4xl">{typingSpeed}</CardTitle>
                                    </CardHeader>

                                </Card>

                                <Card className='flex-1'>
                                    <CardHeader>
                                        <CardDescription>Accuracy</CardDescription>
                                        <CardTitle className="text-4xl">{correctPercentage}%</CardTitle>
                                    </CardHeader>
                                </Card>
                            </div>

                            <div className='flex-1'>

                                <Card
                                    className="w-100" x-chunk="charts-01-chunk-5"
                                >
                                    <CardContent className="flex gap-4 p-4">
                                        <div className="grid items-center gap-2">
                                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                                <div className="text-sm text-muted-foreground">Correct</div>
                                                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                                                    {correctCharAmount}
                                                    <span className="text-sm font-normal text-muted-foreground">

                                                    </span>
                                                </div>
                                            </div>
                                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                                <div className="text-sm text-muted-foreground">Incorrect</div>
                                                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                                                    {incorrectCharAmount}
                                                    <span className="text-sm font-normal text-muted-foreground">

                                                    </span>
                                                </div>
                                            </div>
                                            <div className="grid flex-1 auto-rows-min gap-0.5">
                                                <div className="text-sm text-muted-foreground">Missed</div>
                                                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                                                    {missedChars}
                                                    <span className="text-sm font-normal text-muted-foreground">

                                                    </span>
                                                </div>
                                            </div>

                                        </div>
                                        <ChartContainer
                                            config={{
                                                move: {
                                                    label: "Correct",
                                                    color: "#22c55e",
                                                },
                                                exercise: {
                                                    label: "Wrong",
                                                    color: "#dc2626",
                                                },
                                                stand: {
                                                    label: "Not Typed",
                                                    color: "#6b7280",
                                                },
                                            }}
                                            className="mx-auto aspect-square w-full max-w-[50%]"
                                        >
                                            <RadialBarChart
                                                margin={{
                                                    left: -10,
                                                    right: -10,
                                                    top: -10,
                                                    bottom: -10,
                                                }}
                                                data={[
                                                    {
                                                        activity: "stand",
                                                        value: (8 / 12) * 100,
                                                        fill: "var(--color-stand)",
                                                    },
                                                    {
                                                        activity: "exercise",
                                                        value: (46 / 60) * 100,
                                                        fill: "var(--color-exercise)",
                                                    },
                                                    {
                                                        activity: "move",
                                                        value: (245 / 360) * 100,
                                                        fill: "var(--color-move)",
                                                    },
                                                ]}
                                                innerRadius="20%"
                                                barSize={24}
                                                startAngle={90}
                                                endAngle={450}
                                            >
                                                <PolarAngleAxis
                                                    type="number"
                                                    domain={[0, 100]}
                                                    dataKey="value"
                                                    tick={false}
                                                />
                                                <RadialBar dataKey="value" background cornerRadius={5} />
                                            </RadialBarChart>
                                        </ChartContainer>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className='flex-[1_1_33.333333%]'>

                            {consistencyData && Array.isArray(consistencyData) && (
                                <>
                                    <div className='text-2xl font-black text-center mb-6'>Consistency</div>
                                    <ResponsiveContainer width="100%" height={300} >
                                        <LineChart
                                            width={500}
                                            data={consistencyData}
                                            margin={{

                                                bottom: 20,
                                            }}
                                        >
                                            <XAxis dataKey="currentStamp" label={{
                                                value: 'Time in seconds',
                                                offset: -10,
                                                dy: 25,
                                            }} />
                                            <YAxis label={{
                                                value: 'WPM',
                                                angle: -90,
                                                dx: -20,
                                            }}
                                            />
                                            <Line type="monotone" dataKey="wpm" stroke="#82ca9d" strokeWidth={3} fill='#82ca9d' activeDot={{ stroke: "#82ca9d" }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </>
                            )}
                        </div>
                    </div>

                    <div className='flex gap-4'>

                        <Card className='flex-1'>
                            <CardHeader>
                                <CardDescription>Time</CardDescription>
                                <CardTitle className="text-xl">{data.typingTime}s</CardTitle>
                            </CardHeader>
                        </Card>

                        <Card className='flex-1'>
                            <CardHeader>
                                <CardDescription>Language</CardDescription>
                                <CardTitle className="text-xl">{data.language}</CardTitle>
                            </CardHeader>
                        </Card>

                        <Card className='flex-1'>
                            <CardHeader>
                                <CardDescription>Consistency in %</CardDescription>
                                <CardTitle className="text-xl">{consistencyPercentage}%</CardTitle>
                            </CardHeader>
                        </Card>

                    </div>


                </div>

                <div className='w-full text-center py-10'>
                    <Link href="/"><Button variant="ghost" color='dark'><FontAwesomeIcon size='2x' icon={faRotateRight} /></Button></Link>
                </div>

            </>)
        )
}

export default TypingResult