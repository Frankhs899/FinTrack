import React from 'react';

function TableHeader({ label }) {
  return (
    <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white'>
      {label}
    </th>
  );
}

export default TableHeader;
