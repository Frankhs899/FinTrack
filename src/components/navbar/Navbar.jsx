import { useState } from 'react';

import { Link } from 'react-router-dom';
import ToggleButton from './ToggleButton';
import DarkModeToggle from './DarkModeToggle';
import LinkNavbar from './LinkNavbar';
import FinTrackerLogo from './FinTrackerLogo';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='bg-gray-50 shadow-xl dark:bg-gray-900'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <Link
          to={'/'}
          className='flex items-center space-x-3'
        >
          <FinTrackerLogo />
          <span className='self-center text-2xl font-semibold whitespace-nowrap text-primary-600 dark:text-secondary-500'>
            FinTrack
          </span>
        </Link>

        <div className='inline-flex gap-2 md:hidden'>
          <ToggleButton toggleMenu={toggleMenu} />
          <DarkModeToggle />
        </div>

        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } w-full md:block md:w-auto`}
        >
          <ul className='font-medium flex flex-col p-4 mt-4 border border-primary-500 rounded-lg bg-gray-50 md:flex-row md:items-center md:space-x-8 md:mt-0 md:border-0 md:p-0 dark:bg-gray-900 dark:border-secondary-500'>
            <LinkNavbar
              link={'/income'}
              label={'Ingreso'}
            />
            <LinkNavbar
              link={'/expense'}
              label={'Gasto'}
            />
            <LinkNavbar
              link={'/transactions'}
              label={'Movimientos'}
            />
            <li className=' hidden md:block'>
              <DarkModeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
