import React, { useState, useEffect, useRef } from 'react';

function LapTimer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 10);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  const recordLap = () => {
    setLaps(prevLaps => [...prevLaps, time]);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const formatTime = (timeValue) => {
    const minutes = Math.floor(timeValue / 6000);
    const remainingAfterMinutes = timeValue % 6000;
    const seconds = Math.floor(remainingAfterMinutes / 100);
    const centiseconds = remainingAfterMinutes % 100;
    return `${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
  };

  const pad = (number) => {
    return number.toString().padStart(2, '0');
  };

  return (
    <div>
      <h1>{formatTime(time)}</h1>
      <div>
        <button onClick={isRunning ? stopTimer : startTimer}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        
        <button onClick={recordLap} disabled={!isRunning}>
          Lap
        </button>
        <button onClick={resetTimer}>
          Reset
        </button>
      </div>
      {laps.length > 0 && (
        <div>
          <h3>Laps</h3>
          <ul>
            {laps.map((lapTime, index) => (
              <li key={index}>Lap {index + 1}: {formatTime(lapTime)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LapTimer;
