import PropTypes from 'prop-types';

function TableData({ data }) {
  return (
    <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center dark:text-white'>
      {data}
    </td>
  );
}

TableData.propTypes = {
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TableData;
