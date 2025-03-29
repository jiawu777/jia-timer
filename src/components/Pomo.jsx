import './Pomo.scss';
import CircularProgress from '@/utils/CircularProgress';
import TaskForm from '@/hooks/inputForm';

import { useState, useEffect, useRef } from 'react';

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

  // const resetTimer = () => {
  //   clearInterval(intervalIdTimer.current);
  //   setTimer(minInput*60)
  //   setTimerSwitch(false);
  // };

// input time & task
const handleTaskInput=(e)=>{
  e.preventDefault()
  setTimer(timeInput)
  setTimerSwitch(false)
}

  return (
    <div className="pomo__wrapper">
        <div className="pomo__display">
        <CircularProgress className="pomo__circular" time={timer} initialTime={timer} size={400} strokeWidth={50}></CircularProgress>
        <h2 className="pomo__task">{taskInput || "Time to focus!"}</h2>
        </div>
        
        <div className="pomo__btn">
          <button
            className={`pomo__btn pomo__btn${timerSwitch? "--pause":"--start"}`}
            onClick={switchTimer}
          >
            {timerSwitch ? TimerStop : TimerStart}
          </button>
          
          {/* <button
            className="timer__btn timer__btn--reset"
            onClick={resetTimer}
          >
            {TimerReset}
          </button> */}
        </div>
      <div className="task__wrapper">
        <div className="task__timeInput">
          <form action="">
          <input type="number"
          onChange={(e)=>{
            let secInput = Number(e.target.value)*60
            setTimeInput(secInput)
          }}
          disabled = { timerSwitch ? true : false }
          />

          <input type="text"
          onChange={(e)=>{
            let taskInput = e.target.value
            setTaskInput(taskInput)
          }}
          disabled={timerSwitch}
          />
          <button onClick={handleTaskInput} disabled={timerSwitch}>設定任務</button>
          </form>
        {/* <input type="number" disabled=""
        onChange={e=> 
          {
            
            minInput=Number(e.target.value)*60
            setTimer(minInput)}
        }
        />
        {min} */}
        {/* <button
        onClick={
          ()=>{
            setTimer((minInput)=>minInput+5)}}>加5分鐘</button> */}
        </div>
      </div>
    </div>
  );
}

export default Pomo;