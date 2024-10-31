import React from 'react';

function TableData({ data }) {
  return (
    <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center dark:text-white'>
      {data}
    </td>
  );
}

export default TableData;
