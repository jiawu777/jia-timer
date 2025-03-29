import React from "react";

interface CircularProgressProps {
  time: number; // 以秒為單位的時間
  initialTime: number; // 倒數計時的總時間
  size: number;
  strokeWidth: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  time,
  initialTime,
  size,
  strokeWidth,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (time / initialTime) * circumference;

  return (
    <svg width={size} height={size}>
      {/* 背景圓環 */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke="#561D25"
        strokeWidth={strokeWidth}
      />
      {/* 進度圓環 */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke="#D3E298"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`} // 讓進度從頂部開始
      />
      {/* 文字顯示時間 */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="5rem"
        fill="black"
      >
        {Math.floor(time/60)}:{Math.floor(time%60)}
      </text>
    </svg>
  );
};

export default CircularProgress;
