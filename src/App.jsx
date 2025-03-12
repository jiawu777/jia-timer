
import { useState, useEffect, useRef } from 'react';
// import { useRouter } from '@/router';
// import { useTimerData } from '@/hooks/useTimerData';
import './App.scss';

function App(){
  const [ TimerStart, TimerStop, TimerReset ] = ["開始","停止","重置"]
  // Timer Switch
  const [timerSwitch, setTimerSwitch] = useState(false);
  const switchTimer = () => {
    const newTimerSwitch = !timerSwitch;
    setTimerSwitch(newTimerSwitch);
  };

  // timing
  const [timer, setTimer] = useState(0);
  const intervalIdTimer = useRef();

  //RefTimer可以計時但無法即時渲染畫面，可用於使用者流程計時器提升使用感
  // const refTimer = useRef(0);

  useEffect(() => {
    if (timerSwitch) {
      intervalIdTimer.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
        // refTimer.current = refTimer.current+1
      }, 1000);
    } else {
      clearInterval(intervalIdTimer.current);
    }

    // destroy
    return () => clearInterval(intervalIdTimer.current);
  }, [timerSwitch]);

  const resetTimer = () => {
    setTimer(0);
    clearInterval(intervalIdTimer.current);
    setTimerSwitch(false);
  };

  return (
    <div className="timer">
      <div className="timer__wrapper">
        <div className="timer__display">{timer}</div>
        <div className="timer__btn">
          <button
            className="timer__btn timer__btn--switch"
            onClick={switchTimer}
          >
            {timerSwitch ? TimerStop : TimerStart}
          </button>
          <button
            className="timer__btn timer__btn--reset"
            onClick={resetTimer}
          >
            {TimerReset}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
