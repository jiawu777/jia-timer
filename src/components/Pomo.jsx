import CircularProgress from '@/utils/CircularProgress';
import { useState, useEffect, useRef } from 'react';
import './Pomo.scss';

const Pomo = () => {
  // Config
  const [TimerStart, TimerStop, TimerSkip] = ['Start', 'Pause','Skip'];
  const [CircularSize,CircularStrokeWidth] = [400, 50];
  const [addTaskBtn ,delBtn] = ["Add task","del"];
  const defaultTask = " Time to focus! ";
  const defaultTime = 25;
  
  // Timer Switch
  const [timerSwitch, setTimerSwitch] = useState(false);
  
  // timing
  const [timer, setTimer] = useState(defaultTime*60);
  const intervalIdTimer = useRef(null);

  // forceUpdate
  const[,setForceUpdate] = useState(0);
  const forceUpdate = () => setForceUpdate((prev)=>prev+1);

  // setInput
  const timeInputRef = useRef(null)
  const taskInputRef = useRef(null)


  // get UserInfo
  const userInfoRef = useRef(
    localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):{ tasks: [], currentTaskId: null }
  )
  
// taskId
  const [,setTaskId]=useState(userInfoRef.current.currentTaskId);

  // get current task
  const currentTaskIndex = userInfoRef.current?.tasks?.findIndex(
    (task) => task.id === userInfoRef.current?.currentTaskId
  ) ?? -1;

  const currentTask = currentTaskIndex >= 0 ? 
  userInfoRef.current.tasks[currentTaskIndex] : null;

  useEffect(()=>{
    if(currentTask){
      setTaskId(currentTask.id);
      setTimer(currentTask.time);
    }
  },[currentTask])

  // timer Switch func
  const switchTimer = () => {
    const newTimerSwitch = !timerSwitch;
    setTimerSwitch(newTimerSwitch);
  };

  // timer countdown func
  useEffect(() => {
    if (timerSwitch) {
      intervalIdTimer.current = setInterval(() => {
        setTimer((prevTimer) => {
          if(prevTimer <= 0){
            clearInterval(intervalIdTimer.current);
            nextTask();
            return 0;
          }
          return prevTimer - 1});
      }, 1000);
    } else {
      clearInterval(intervalIdTimer.current);
    }

    // destroy
    return () => clearInterval(intervalIdTimer.current);
  }, [timerSwitch]);

  // next task func
  const nextTask = () => {
    clearInterval(intervalIdTimer.current);

    const { tasks, currentTaskId } = userInfoRef.current;

    if(!tasks || tasks.length === 0 ){
      userInfoRef.current.currentTask = {defaultTask}
      const secInput = Number(defaultTime)*60;
      userInfoRef.current.currentTime = {secInput};
      setTimer(secInput);
      setTimerSwitch(false);
      console.log("No tasks available.");
      
      return;
    }

    const currentIndex = tasks.findIndex((task)=>task.id === currentTaskId)
    if(currentIndex === -1){
      userInfoRef.current.currentTask = {defaultTask}
      const secInput = Number(defaultTime)*60;
      userInfoRef.current.currentTime = {secInput};
      setTimer(secInput);
      setTimerSwitch(false);
      console.log("Current task not found.");

      return;
    }

    const nextTaskIndex = currentIndex +1;

    if(nextTaskIndex < tasks.length){
      const nextTask = tasks[nextTaskIndex];
      if(!nextTask){
        console.log("Next task undefined.");
        return;
      }

      userInfoRef.current.currentTaskId = nextTask.id;
      const nextTaskTime = nextTask.time;
      setTimer(nextTaskTime);
      setTimerSwitch(false);
      localStorage.setItem('userInfo',JSON.stringify(userInfoRef.current))
    }else{
      console.log("No tasks available.");
      userInfoRef.current.currentTaskId = 0;
      setTaskId(0)
      setTimer(defaultTime*60);
      setTimerSwitch(false);
      localStorage.setItem('userInfo',JSON.stringify(userInfoRef.current))
    }
    
  };

  // input time & task
  const handleTaskInput = (e) => {
    // prevent default render
    e.preventDefault();
    clearInterval(intervalIdTimer.current);

    const secInput = Number(timeInputRef.current.value)*60;
    const taskName = taskInputRef.current.value.trim();

    if(!taskName) return;

    const newTask = {
      id: userInfoRef.current.tasks.length+1,
      name: taskName,
      time: secInput
    }

    userInfoRef.current.tasks.push(newTask);
    userInfoRef.current.currentTaskId = newTask.id;
    setTaskId(newTask.id);
    setTimer(secInput);
    setTimerSwitch(false);

    localStorage.setItem('userInfo',JSON.stringify(userInfoRef.current));

    taskInputRef.current.value = "";
  };

  // Task List
  const forMapTasks = (item) => {
    
    const handleTaskSelection = (item)=>{
      userInfoRef.current.currentTaskId = item.id;
      setTaskId(item.id);
      setTimer(item.time);
      setTimerSwitch(false);
      localStorage.setItem("userInfo",JSON.stringify(userInfoRef.current))
    }

    const handleTaskDeletion = () =>{
      if(userInfoRef.current.currentTaskId === item.id){
        nextTask();
      }
      userInfoRef.current.tasks = userInfoRef.current.tasks.filter((task)=>task.id !== item.id)
      
      if(userInfoRef.current.tasks.length <= 0){
        userInfoRef.current.currentTaskId = 0;
      }
    localStorage.setItem("userInfo",JSON.stringify(userInfoRef.current));
      setTimer(defaultTime*60);
      setTimerSwitch(false);
      clearInterval(intervalIdTimer.current);
      forceUpdate();
    }

      return(
        <li key={`${item.id}`} className="taskList__LI" >
          <label className="taskList__label"> 
            <input className="taskList__radio" type="radio" name="listGroupRadio" value="" id="" 
            checked={userInfoRef.current.currentTaskId === item.id}
            onChange={()=>handleTaskSelection(item)}/>
            <div className="taskList__time">{item.time/60}min</div>
            <div className="taskList__taskName">{item.name}</div>
            <button className="taskList__delBtn" type="button" 
            onClick={handleTaskDeletion}>{delBtn}</button>
            </label>
        </li>
      )
  }

const child = userInfoRef.current?.tasks?.map(forMapTasks) ?? [];

  return (
    <div className={`pomo__wrapper ${timerSwitch ? 'pomo__wrapper--start' : ''}`}>
      <div className="display__wrapper">
        <CircularProgress
          className="display__circular"
          timer={timer}
          timeInput={currentTask?.time||1500}
          size={CircularSize}
          strokeWidth={CircularStrokeWidth}
        ></CircularProgress>
        <h2 className="display__currentTaskName">{currentTask?.name || 'Time to focus!'}</h2>
      </div>

      <div className="switch__wrapper">
        <button
          className={`switch__timer ${timerSwitch ? 'switch__timer--pause' : 'switch__timer--start'}`}
          onClick={switchTimer}
        >
          {timerSwitch ? TimerStop : TimerStart}
        </button>

        <button
          className={`switch__next ${timerSwitch ? 'switch__next--skip' : 'switch__next--hide'}`}
          onClick={nextTask}
        >
          {TimerSkip}
        </button>

      </div>

      <div className={`input__wrapper ${timerSwitch ? 'input__wrapper--start' : ''}`}>
        <form className="input__form">
          <input
            className="input__time"
            type="number"
            ref={timeInputRef}
            defaultValue={defaultTime}
            placeholder="Enter time(min)"
            required
          />
          <input
            className="input__task"
            type="text"
            ref={taskInputRef}
            placeholder="Enter task"
            required
          />
          <button
            className="input__addTaskBtn"
            onClick={handleTaskInput}
          >
            {addTaskBtn}
          </button>
        </form>
      </div>
      <div className={`taskList__wrapper ${timerSwitch ? 'input__wrapper--start' : ''}`}>
            <ul className="taskList__UL">
              {child}
            </ul>
        </div>
    </div>
  );
};

export default Pomo;