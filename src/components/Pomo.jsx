import CircularProgress from '@/utils/CircularProgress';
import { useState, useEffect, useRef } from 'react';
import './Pomo.scss';

const Pomo = () => {
    const [ TimerStart, TimerStop] = ["Start","Pause"]
  
  
    // Timer Switch
  const [timerSwitch, setTimerSwitch] = useState(false);

  // timing
  const [timer, setTimer] = useState(0);
  const intervalIdTimer = useRef(null);

  // setInput
  const [timeInput,setTimeInput]=useState(25)
  const [taskInput,setTaskInput]=useState("")



  const switchTimer = () => {
    const newTimerSwitch = !timerSwitch;
    setTimerSwitch(newTimerSwitch);
  };

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

  const resetTimer = () => {
    clearInterval(intervalIdTimer.current);
    setTimer(timeInput)
    setTimerSwitch(false);
  };

// input time & task
const handleTaskInput=(e)=>{
  e.preventDefault()
  clearInterval(intervalIdTimer.current);
  setTimer(timeInput)
  setTimerSwitch(false)
}

  return (
    <div className="pomo__wrapper">
        <div className="pomo__display">
        <CircularProgress className="pomo__circular" 
          timer={timer} 
          timeInput={timeInput} 
          size={400} 
          strokeWidth={50}>
          </CircularProgress>
        <h2 className="pomo__task">{taskInput || "Time to focus!"}</h2>
        </div>
        
        <div className="pomo__btn">
          <button
            className={`pomo__btn pomo__btn${timerSwitch? "--pause":"--start"}`}
            onClick={switchTimer}
          >
            {timerSwitch ? TimerStop : TimerStart}
          </button>
          
          <button
            className={`pomo__btn ${timerSwitch? "pomo__btn--skip":"pomo__btn--hide"}`}
            onClick={resetTimer}
          >
            SKIP
          </button>
        </div>
      <div className="pomo__input">
          <form className="pomo__form">
          <input className="pomo__form pomo__form--time" 
          type="number"
          onChange={(e)=>{
            let secInput = Number(e.target.value)*60
            setTimeInput(secInput)
          }}
          disabled = { timerSwitch ? true : false }
          />
          <input className="pomo__form pomo__form--task" 
          type="text"
          onChange={(e)=>{
            let taskInput = e.target.value
            setTaskInput(taskInput)
          }}
          disabled={timerSwitch}
          />
          <button 
          type="submit"
          onClick={handleTaskInput} 
          disabled={timerSwitch}>Add task</button>
          </form>
      </div>
    </div>
  );
}

export default Pomo;