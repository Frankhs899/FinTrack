import React from 'react';
import { Link } from 'react-router-dom';

function LinkFooter({ label, link }) {
  return (
    <li>
      <Link
        to={link}
        className='hover:underline hover:text-primary-500 dark:hover:text-secondary-500 me-4 md:me-6'
      >
        {label}
      </Link>
    </li>
  );
}

export default LinkFooter;
