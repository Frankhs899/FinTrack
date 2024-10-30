import { useContext } from 'react';
import { Context } from './context/GlobalState';

function App() {
  const { theme, handleChangeTheme } = useContext(Context);
  return (
    <div
      className={`min-h-screen flex flex-col bg-gray-100 text-gray-950 dark:bg-gray-950 dark:text-gray-50 ${
        theme === 'dark' ? 'dark' : ''
      }`}
    >
      App
      <button
        className='bg-indigo-500 text-white'
        onClick={handleChangeTheme}
      >
        Theme
      </button>
    </div>
  );
}

export default App;
