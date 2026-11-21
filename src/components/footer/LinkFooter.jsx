import PropTypes from 'prop-types';
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

LinkFooter.propTypes = {
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default LinkFooter;
