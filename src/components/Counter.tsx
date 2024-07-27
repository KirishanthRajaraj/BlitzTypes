import React, { useEffect, useState } from 'react'

interface Props {
    CountDownAt: number;
    isStartedTyping: boolean;
    setTimerFinished: (timerFinished: boolean) => void;
  }

const Counter: React.FC<Props> = ({ CountDownAt, isStartedTyping, setTimerFinished }) => {
    const [count, setCount] = useState<number>(CountDownAt);

    useEffect(() => {
        if(count > 0 && isStartedTyping === true){
        const interval = setInterval(() => {
            setCount(prevCount => prevCount - 1);
          }, 1000);
          return () => clearInterval(interval);
        } 
        if(count <= 0) {
            setTimerFinished(true);
        }
    }, [count, isStartedTyping]);

    return (
        <div className='counter text-6xl text-white'>
            <p>{count}</p>
        </div>
    )
}

export default Counter