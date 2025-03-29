const CircularProgress = ({ timer, timeInput, size, strokeWidth }) => {
    const progress = (timer / timeInput) * 100; // 計算進度百分比
    return (
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          stroke="#561D25"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          stroke="#D3E298"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={Math.PI * (size - strokeWidth)}
          strokeDashoffset={(progress / 100) * Math.PI * (size - strokeWidth)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`} // 讓進度從頂部開始
        />
        <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="5rem"
        fill="black"
      >
         {`${String(Math.floor(timer/60)).padStart(2,"0")}:${String(Math.floor(timer%60)).padStart(2,"0")}`}
      </text>
      </svg>
    );
  };
  

  export default CircularProgress;