'use client';

import { useAppContext } from '@/app/context/AppContext';
import { WordsInChars } from '@/interfaces/WordsInChars';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface Props {
    CountDownAt: number;
    isStartedTyping: boolean;
    setTimerFinished: (timerFinished: boolean) => void;
    allWords: Array<WordsInChars>;
}

const Counter: React.FC<Props> = ({ CountDownAt, isStartedTyping, setTimerFinished, allWords }) => {
    const [count, setCount] = useState<number>(CountDownAt);
    const [allWordsInChars, setAllWordsInChars] = useState<Array<WordsInChars>>([]);
    const { setData, data } = useAppContext();
    const router = useRouter();
    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        setAllWordsInChars(allWords);
    }, [allWords])

    useEffect(() => {
        setData({ currentTime: time });
    }, [time])

    useEffect(() => {
        setCount(data.typingTime);
    }, [data.typingTime, data.isStartedTyping]);

    useEffect(() => {
        if (count > 0 && data.isStartedTyping) {

            setData({ isStartedTyping: true });
            const interval = setInterval(() => {
                setCount(prevCount => prevCount - 1);
                setTime(prevTime => prevTime + 1);
            }, 1000);
            return () => clearInterval(interval);
        }

        if (count <= 0) {
            sendTimerFinished();
        }
    }, [count, data.isStartedTyping]);

    const sendTimerFinished = () => {
        router.push('/evaluation');
        setData({ finalWords: allWordsInChars, isFinished: true, typingTime: CountDownAt });
    }

    return (
        <div className={`${data.isStartedTyping ? 'opacity-100' : 'opacity-0'} transition-opacity ease-in-out duration-300 counter text-6xl text-white`}>
            <p>{count}</p>
        </div>
    )
}

export default Counter