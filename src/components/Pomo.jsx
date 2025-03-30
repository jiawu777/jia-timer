import CircularProgress from '@/utils/CircularProgress';
import { useState, useEffect, useRef } from 'react';
import './Pomo.scss';

const Pomo = () => {
  // Config
  const [TimerStart, TimerStop, TimerSkip] = ['Start', 'Pause','Skip'];
  const [CircularSize,CircularStrokeWidth] = [400, 50] 
  
  // Timer Switch
  const [timerSwitch, setTimerSwitch] = useState(false);
  
  // timing
  const [timer, setTimer] = useState(0);
  const intervalIdTimer = useRef(null);

  // setInput
  const timeInputRef = useRef(null)
  const taskInputRef = useRef(null)
  const defaultTime = 25

  // get UserInfo
  const userInfoRef = useRef(
    localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):{ tasks: [], currentTaskId: null }
  )
  
  // get current task
  const currentTaskIndex = userInfoRef.current?.tasks?.findIndex(
    (task) => task.id === userInfoRef.current?.currentTaskId
  ) ?? -1;

  const currentTask = currentTaskIndex >= 0 ? 
  userInfoRef.current.tasks[currentTaskIndex] : null;

  useEffect(()=>{
    if(currentTask){
      setTimer(currentTask.time)
    }
  },[currentTask])

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
    if(currentTask){
      setTimer(currentTask.time)
    }
    setTimerSwitch(false);
  };

  // input time & task
  const handleTaskInput = (e) => {
    // prevent default render
    e.preventDefault();
    clearInterval(intervalIdTimer.current);

    const secInput = Number(timeInputRef.current.value)*60;
    const taskName = taskInputRef.current.value.trim();

    if(!taskName) return

    const newTask = {
      id: userInfoRef.current.tasks.length+1,
      name: taskName,
      time: secInput
    }

    userInfoRef.current.tasks.push(newTask);
    userInfoRef.current.currentTaskId = newTask.id;
    setTimer(secInput);
    setTimerSwitch(false);

    localStorage.setItem('userInfo',JSON.stringify(userInfoRef.current));

    taskInputRef.current.value = "";
  };

  // Task List
  const forMapTasks = (item) => {
      return(
        <li key={`${item.id}`} className="pomo__taskListLI" >
          <label className="pomo__taskListItem" for="pomo__taskListItem"> 
            <input className="pomo__taskListItem pomo__taskListItem--radio" type="radio" name="listGroupRadio" value="" id="" checked/>
            <div className="pomo__taskListItem pomo__taskListItem--time">{item.time/60}min</div>
            <div className="pomo__taskListItem pomo__taskListItem--task">{item.name}</div>
            <button className="pomo__taskListItem pomo__taskListItem--closeBtn" type="button" class="btn-close" aria-label="Close"></button>
            </label>
        </li>
      )
  }

const child = userInfoRef.current?.tasks?.map(forMapTasks) ?? [];

  return (
    <div className="pomo__wrapper">
      <div className="pomo__display">
        <CircularProgress
          className="pomo__circular"
          timer={timer}
          timeInput={currentTask?.time||1500}
          size={CircularSize}
          strokeWidth={CircularStrokeWidth}
        ></CircularProgress>
        <h2 className="pomo__currentTaskName">{currentTask?.name || 'Time to focus!'}</h2>
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
          {TimerSkip}
        </button>

      </div>

      <div className="pomo__input">
      <h2 className="pomo__taskListTitle"> Task List </h2>
        <form className="pomo__form">
          <input
            className="pomo__input pomo__input--time"
            type="number"
            ref={timeInputRef}
            defaultValue={defaultTime}
            disabled={timerSwitch}
            required
          />
          <input
            className="pomo__input pomo__input--task"
            type="text"
            ref={taskInputRef}
            placeholder="Enter task"
            disabled={timerSwitch}
            required
          />
          <button
            onClick={handleTaskInput}
            disabled={timerSwitch}
          >
            Add task
          </button>
        </form>
        
        <div className="pomo__taskList">
            <ul className="pomo__taskListUL">
              {child}
            </ul>
          </div>
      </div>
    </div>
  );
};

export default Pomo;
