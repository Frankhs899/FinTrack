// Nesecito anteponel el signo '$' al inicio de 'transaction.value'

import { useContext } from 'react';
import { Context } from '../../context/GlobalState';
import TableHeader from './TableHeader';
import TableData from './TableData';

function TransactionTable() {
  const { transactions } = useContext(Context);
  return (
    <div className='bg-gray-50 text-gray-950 rounded-xl shadow-xl w-full flex items-center justify-center h-full dark:bg-gray-900 dark:text-gray-50 p-4'>
      <div className='overflow-x-auto w-full'>
        <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900'>
          <thead className='ltr:text-left rtl:text-right'>
            <tr>
              <TableHeader label={'Fecha'} />
              <TableHeader label={'Tipo'} />
              <TableHeader label={'Descripción'} />
              <TableHeader label={'Valor'} />
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
            {transactions.map((transaction, index) => (
              <tr>
                <TableData data={transaction.date} />
                <TableData data={transaction.type} />
                <TableData data={transaction.description} />
                <TableData data={`$ ${transaction.value}`} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;
