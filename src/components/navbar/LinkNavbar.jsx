import { Link } from 'react-router-dom';

function LinkNavbar({ label, link }) {
  return (
    <li className='mb-1 md:mb-0'>
      <Link
        to={link}
        className='block px-3 rounded text-gray-600 hover:bg-primary-500 hover:text-gray-50 focus:bg-primary-500 focus:text-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-primary-500 md:focus:bg-transparent md:focus:text-primary-500 md:p-0 dark:text-gray-300 dark:hover:bg-secondary-500 dark:hover:text-gray-50 dark:focus:bg-secondary-500 dark:focus:text-gray-50 dark:md:hover:bg-transparent dark:md:hover:text-secondary-500 dark:md:focus:bg-transparent dark:md:focus:text-secondary-500'
      >
        {label}
      </Link>
    </li>
  );
}

export default LinkNavbar;
