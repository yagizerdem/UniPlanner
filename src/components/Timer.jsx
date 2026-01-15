import React, { useState, useEffect, useRef } from 'react';
import '../styles/Timer.css';

function Timer() {
  const [mode, setMode] = useState('countdown'); // 'countdown' or 'chronometer'
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState(25);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (mode === 'countdown') {
            if (prevTime <= 0) {
              setIsRunning(false);
              playNotification();
              return 0;
            }
            return prevTime - 1;
          } else {
            return prevTime + 1;
          }
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, mode]);

  const playNotification = () => {
    try {
      // Simple audio notification using Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);
    } catch (error) {
      console.log('Audio notification not available:', error);
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (mode === 'countdown' && time === 0) {
      setTime(inputMinutes * 60);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(mode === 'countdown' ? inputMinutes * 60 : 0);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTime(newMode === 'countdown' ? inputMinutes * 60 : 0);
  };

  const presetTimes = [5, 10, 15, 25, 30, 45, 60];

  return (
    <div className="timer-container">
      <div className="timer-mode-selector">
        <button 
          className={mode === 'countdown' ? 'active' : ''}
          onClick={() => handleModeChange('countdown')}
        >
          Countdown Timer
        </button>
        <button 
          className={mode === 'chronometer' ? 'active' : ''}
          onClick={() => handleModeChange('chronometer')}
        >
          Chronometer
        </button>
      </div>

      <div className="timer-display">
        <div className="time">{formatTime(time)}</div>
      </div>

      {mode === 'countdown' && !isRunning && (
        <div className="timer-input">
          <label>
            Set minutes:
            <input 
              type="number" 
              min="1" 
              max="999"
              value={inputMinutes}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 0;
                setInputMinutes(val);
                if (!isRunning) {
                  setTime(val * 60);
                }
              }}
            />
          </label>
          <div className="preset-buttons">
            {presetTimes.map((minutes) => (
              <button 
                key={minutes}
                onClick={() => {
                  setInputMinutes(minutes);
                  setTime(minutes * 60);
                }}
              >
                {minutes}m
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="timer-controls">
        {!isRunning ? (
          <button className="control-btn start" onClick={handleStart}>
            ▶️ Start
          </button>
        ) : (
          <button className="control-btn pause" onClick={handlePause}>
            ⏸️ Pause
          </button>
        )}
        <button className="control-btn reset" onClick={handleReset}>
          🔄 Reset
        </button>
      </div>

      {mode === 'countdown' && (
        <div className="timer-info">
          <p>💡 Perfect for Pomodoro technique and focused study sessions!</p>
        </div>
      )}
      {mode === 'chronometer' && (
        <div className="timer-info">
          <p>💡 Track how long you spend on tasks and projects!</p>
        </div>
      )}
    </div>
  );
}

export default Timer;
