import PropTypes from 'prop-types';

function TableHeader({ label }) {
  return (
    <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white'>
      {label}
    </th>
  );
}

TableHeader.propTypes = {
  label: PropTypes.string.isRequired,
};

export default TableHeader;
