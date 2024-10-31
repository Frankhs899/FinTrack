import { useContext } from 'react';
import { Context } from '../context/GlobalState';

function Home() {
  const { balance, income, expense } = useContext(Context);
  return (
    <div className='flex flex-col w-full gap-4'>
      <div className='bg-gray-50 text-gray-950 rounded-xl w-full shadow-lg dark:bg-gray-900 dark:text-gray-50 p-4 '>
        <div className='bg-primary-500 rounded-lg p-6 text-gray-50 dark:bg-secondary-500'>
          <h2 className='text-center text-sm font-semibold mb-2'>
            BALANCE TOTAL
          </h2>
          <p className='text-4xl font-bold text-center text-secondary-500 mb-4 dark:text-primary-500'>
            $ {balance}
          </p>
          <div className='flex justify-between'>
            <div>
              <p className='text-sm font-semibold'>INGRESOS</p>
              <p className='text-lg text-green-300 dark:text-green-500'>
                +$ {income}
              </p>
            </div>
            <div>
              <p className='text-sm font-semibold'>GASTOS</p>
              <p className='text-lg text-red-300 dark:text-red-500'>
                -$ {expense}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
