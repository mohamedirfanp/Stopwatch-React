import React, { useEffect, useState } from 'react';
import './StopWatch.css';

function StopWatchComponent() {

    const [minute, setMinite] = useState(0);
    const [second,setSecond] = useState(0);
    const [milliSecond, setMilliSecond] = useState(0);
    const [isRunning, setRunning] = useState(false);
    const [lapArray, setLapArray] = useState([]);

    useEffect(()=> {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setMilliSecond(prevMilliSecond => {
                    if(prevMilliSecond === 999)
                    {
                        setSecond(prevSecond => {
                            if(prevSecond === 59)
                            {
                                setMinite(prevMinite => prevMinite + 1);
                                return 0;
                            }
                            return prevSecond + 1;
                        })
                        return 0;
                    }
                    return prevMilliSecond + 1;
                })

            }, 1);
        }
        else
        {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        }

    }, [isRunning])


    const startTimer = () => {
        setRunning(true);
    }

    const resetTimer = () => {
        setRunning(false)
        setMinite(0);
        setSecond(0);
        setMilliSecond(0);
        setLapArray([])
    }

    const stopTimer = () => {
        setRunning(false)
    }

    const lapTimer = () => {
        let lapTime = `${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}:${milliSecond.toString().padStart(3, '0')}`
        setLapArray(prevArray => [...prevArray, lapTime]);

    }

  return (
    <React.Fragment>
        <article className='card'>
            <h1>StopWatch</h1>
            <div className='circle'>
            <p>{minute.toString().padStart(2, '0')} : {second.toString().padStart(2, '0')} : {milliSecond.toString().padStart(3, '0')}</p>
            <p className='text'>min sec msec</p>
            </div>
            <div className='btnDiv'>
            <button onClick={resetTimer} className='btn'>Reset</button>
            {isRunning ? (<div><button onClick={stopTimer} className='btn'>Stop</button> <button onClick={lapTimer} className='btn'>Lap</button></div>) : <button onClick={startTimer} className='btn'>Start</button>}
            </div>
            <div className='lapDiv'>
            {(lapArray.length > 0 ? <div className='lapHeader'>
                <p>Lap No.</p>
                <p>Lap Time</p>
            </div> : null)}
            {(lapArray.length > 0 ? 
            (
                
                lapArray.map((element,index) => {
                    return (<p key={index} className='lapContent'>{index+1} {element}</p>)
                })
            ) : null)}
            </div>
        </article>
    </React.Fragment>
  )
}

export default StopWatchComponent
