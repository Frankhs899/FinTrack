import { useContext } from 'react';
import { Context } from '../../context/GlobalState';

function DarkModeToggle() {
  const { theme, handleChangeTheme } = useContext(Context);
  return (
    <button
      className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg text-primary-500 border border-primary-500  hover:text-gray-50 hover:bg-primary-500 dark:text-secondary-500 dark:border-secondary-500 dark:hover:text-gray-50 dark:hover:bg-secondary-500 md:border-none'
      onClick={handleChangeTheme}
    >
      <span className='sr-only'>Toggle Dark Mode</span>
      {theme === 'dark' ? (
        <svg
          className='w-5 h-5'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z' />
        </svg>
      ) : (
        <svg
          className='w-5 h-5'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle
            cx='12'
            cy='12'
            r='5'
          />
          <path d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' />
        </svg>
      )}
    </button>
  );
}

export default DarkModeToggle;
