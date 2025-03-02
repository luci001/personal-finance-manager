import React from 'react';

const CircularProgressBar = ({ percentage, size = 120, strokeWidth = 10, color = '#3498db' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - percentage) / 100) * circumference;

  return (
    <div className="circular-progressbar" style={{ width: size, height: size, position: 'relative' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff7e5f" />
            <stop offset="100%" stopColor="#feb47b" />
          </linearGradient>
        </defs>
        <circle
          className="circle bg"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth}
          fill="white"
        />
        <circle
          className="circle progress"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          stroke="url(#progressGradient)"
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease-in-out', filter: 'drop-shadow(0px 0px 5px rgba(255, 126, 95, 0.8))' }}
          fill="none"
        />
      </svg>
      <div className="percentage" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'black', fontWeight: 'bold', fontSize: '1.5em' }}>{percentage}%</div>
    </div>
  );
};

export default CircularProgressBar;
