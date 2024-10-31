import React from 'react';

function FinTrackerLogo() {
  return (
    <svg
      className='h-8 w-8'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 200 200'
    >
      <rect
        width='100%'
        height='100%'
        fill='white'
        fillOpacity='0'
      />
      <circle
        cx='100'
        cy='100'
        r='100'
        fill='#eab308'
      />
      <polyline
        points='40,140 80,100 120,110 160,60'
        stroke='#a855f7'
        fill='none'
        strokeWidth='8'
        strokeLinecap='round'
      />
    </svg>
  );
}

export default FinTrackerLogo;
