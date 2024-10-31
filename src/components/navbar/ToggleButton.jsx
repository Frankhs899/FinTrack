import React from 'react';

function ToggleButton({ toggleMenu }) {
  return (
    <button
      className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden text-primary-500 border border-primary-500 hover:text-gray-50 hover:bg-primary-500 dark:text-secondary-500 dark:border-secondary-500 dark:hover:text-gray-50 dark:hover:bg-secondary-500 '
      onClick={toggleMenu}
    >
      <span className='sr-only'>Open main menu</span>
      <svg
        className='w-5 h-5'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 17 14'
      >
        <path
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M1 1h15M1 7h15M1 13h15'
        />
      </svg>
    </button>
  );
}

export default ToggleButton;
