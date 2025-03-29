import CircularProgress from '@/utils/CircularProgress';
import { useState, useEffect, useRef } from 'react';
import './Pomo.scss';

const Pomo = () => {
  const [TimerStart, TimerStop] = ['Start', 'Pause'];

  // Timer Switch
  const [timerSwitch, setTimerSwitch] = useState(false);
  
  // timing
  const [timer, setTimer] = useState(0);
  const intervalIdTimer = useRef(null);

  // setInput
  const timeInputRef = useRef(null)
  const taskInputRef = useRef(null)
  const defaultTime = 25

  // timer Switch func
  const switchTimer = () => {
    const newTimerSwitch = !timerSwitch;
    setTimerSwitch(newTimerSwitch);
  };

  // timer countdown func
  useEffect(() => {
    if (timerSwitch && timer > 0) {
      intervalIdTimer.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(intervalIdTimer.current);
    }

    // destroy
    return () => clearInterval(intervalIdTimer.current);
  }, [timerSwitch, timer]);

  // skip timer  
  const resetTimer = () => {
    clearInterval(intervalIdTimer.current);
    let secInput = (timeInputRef.current.value)*60
    setTimer(secInput);
    setTimerSwitch(false);
  };

  // input time & task
  const handleTaskInput = (e) => {
    e.preventDefault();
    clearInterval(intervalIdTimer.current);

    let secInput = (timeInputRef.current.value)*60
    

    setTimer(secInput);
    setTimerSwitch(false);
  };

  return (
    <div className="pomo__wrapper">
      <div className="pomo__display">
        <CircularProgress
          className="pomo__circular"
          timer={timer}
          timeInput={timeInputRef.current}
          size={400}
          strokeWidth={50}
        ></CircularProgress>
        <h2 className="pomo__task">{taskInputRef.current?.value || 'Time to focus!'}</h2>
      </div>

      <div className="pomo__btn">
        <button
          className={`pomo__btn pomo__btn${timerSwitch ? '--pause' : '--start'}`}
          onClick={switchTimer}
        >
          {timerSwitch ? TimerStop : TimerStart}
        </button>

        <button
          className={`pomo__btn ${timerSwitch ? 'pomo__btn--skip' : 'pomo__btn--hide'}`}
          onClick={resetTimer}
        >
          SKIP
        </button>
      </div>

      <div className="pomo__input">
        <form className="pomo__form">
          <input
            className="pomo__form pomo__form--time"
            type="number"
            ref={timeInputRef}
            defaultValue={defaultTime}
            disabled={timerSwitch}
          />
          <input
            className="pomo__form pomo__form--task"
            type="text"
            ref={taskInputRef}
            placeholder="Enter task"
            disabled={timerSwitch}
          />
          <button
            onClick={handleTaskInput}
            disabled={timerSwitch}
          >
            Add task
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pomo;
