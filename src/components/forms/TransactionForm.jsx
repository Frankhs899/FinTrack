import { useContext, useState } from 'react';
import { Context } from '../../context/GlobalState';
import { EXPENSE, INCOME } from '../../lib/transactions';

const INPUT_CLASSES =
  'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-secondary-500';

const LABEL_CLASSES =
  'block mb-2 text-sm font-medium text-gray-900 dark:text-white';

function TransactionForm() {
  const { addTransaction } = useContext(Context);

  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const amount = Number.parseFloat(value);
    if (!Number.isFinite(amount)) {
      alert('El valor ingresado no es un número válido.');
      return;
    }
    if (amount <= 0) {
      alert('El valor debe ser mayor a 0.');
      return;
    }

    // The button that submitted the form decides the movement type.
    const type = event.nativeEvent.submitter?.value ?? INCOME;
    addTransaction(type, { date, description, value: amount });

    setDate('');
    setDescription('');
    setValue('');
  };

  return (
    <div className='bg-gray-50 text-gray-950 rounded-xl shadow-lg w-full flex flex-col items-center justify-center max-w-md h-full dark:bg-gray-900 dark:text-gray-50 p-4'>
      <h2 className='text-center text-sm font-semibold mb-2'>Registros</h2>
      <form
        className='w-full max-w-sm mx-auto'
        onSubmit={handleSubmit}
      >
        <div className='mb-5'>
          <label
            className={LABEL_CLASSES}
            htmlFor='date'
          >
            Fecha:
          </label>
          <input
            type='date'
            id='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className={INPUT_CLASSES}
          />
        </div>

        <div className='mb-5'>
          <label
            className={LABEL_CLASSES}
            htmlFor='description'
          >
            Descripción:
          </label>
          <input
            type='text'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className={INPUT_CLASSES}
          />
        </div>

        <div className='mb-5'>
          <label
            className={LABEL_CLASSES}
            htmlFor='value'
          >
            Valor:
          </label>
          <input
            type='number'
            id='value'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            min='0.01'
            step='0.01'
            className={INPUT_CLASSES}
          />
        </div>

        <div className='flex items-center justify-around w-full'>
          <button
            type='submit'
            name='type'
            value={INCOME}
            className='text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm w-full px-5 py-2.5 me-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none'
          >
            Ingreso
          </button>
        </div>
        <div className='flex items-center justify-around w-full'>
          <button
            type='submit'
            name='type'
            value={EXPENSE}
            className='text-white bg-secondary-500 hover:bg-secondary-600 font-medium rounded-lg text-sm w-full px-5 py-2.5 me-2 mb-2 dark:bg-secondary-400 dark:hover:bg-secondary-500 focus:outline-none'
          >
            Gasto
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
