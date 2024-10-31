import React from 'react';
import { Link } from 'react-router-dom';
import LinkFooter from './LinkFooter';

function Footer() {
  return (
    <footer className='bg-gray-50 text-gray-500 shadow dark:bg-gray-900 dark:text-gray-400'>
      <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
        <div className='sm:flex sm:items-center sm:justify-between'>
          <span className='text-sm sm:text-center'>
            © 2024{' '}
            <Link
              to='/'
              class='hover:underline hover:text-primary-500 dark:hover:text-secondary-500'
            >
              FinTrack
            </Link>
            . Todos los derechos reservados.
          </span>

          <ul className='flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0'>
            <LinkFooter
              link={'/about'}
              label={'Acerca de'}
            />
            <LinkFooter
              link={'/about'}
              label={'Contacto'}
            />
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
