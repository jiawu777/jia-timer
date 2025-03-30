const CircularProgress = ({ timer, timeInput, size, strokeWidth }) => {
  const progress = (timer / timeInput) * 100; // 計算進度百分比
  return (
    <svg
      width={size}
      height={size}
    >
      {/* background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={(size - strokeWidth) / 2}
        stroke="#B60E0E"
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={(size - strokeWidth) / 2}
        stroke="#4d7c57"
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
        fill="#E6E6EA"
      >
        {`${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(Math.floor(timer % 60)).padStart(2, '0')}`}
      </text>
    </svg>
  );
};

export default CircularProgress;
