import React from 'react';
import TransactionTable from '../components/transactions/TransactionTable';

function Transactions() {
  return (
    <div className='flex flex-col items-center w-full min-h-full gap-4 overflow-x-hidden'>
      <TransactionTable />
    </div>
  );
}

export default Transactions;
