// Localiza cualquier error lógico en el siguiente código

import { useState, useContext } from 'react';
import { Context } from '../../context/GlobalState';

function TransactionForm() {
  const { setTransactions, setIncome, setBalance, setExpense } =
    useContext(Context);

  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const incomeSubmit = (e) => {
    e.preventDefault();

    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
      alert('El valor ingresado no es un número válido.');
      return;
    }

    // Creando objeto con los datos de ingreso
    const newIncome = {
      id: Date.now(),
      date,
      type: 'Ingreso',
      description,
      value: parsedValue,
    };

    setTransactions((prevTransactions) => [...prevTransactions, newIncome]);

    setIncome((prevIncome) => prevIncome + parsedValue);

    setBalance((prevBalance) => prevBalance + parsedValue);

    setDate('');
    setDescription('');
    setValue('');
  };

  const expenseSubmit = (e) => {
    e.preventDefault();

    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
      alert('El valor ingresado no es un número válido.');
      return;
    }

    // Crear un objeto con los datos del gasto
    const newExpense = {
      id: Date.now(),
      date,
      type: 'Gasto',
      description,
      value: parsedValue,
    };

    // Agregar el nuevo ingreso al arreglo de transacciones
    setTransactions((prevTransactions) => [...prevTransactions, newExpense]);

    setExpense((prevExpense) => prevExpense + parsedValue);
    setBalance((prevBalance) => prevBalance - parsedValue);

    // Limpiar los campos del formulario
    setDate('');
    setDescription('');
    setValue('');
  };

  return (
    <div className='bg-gray-50 text-gray-950 rounded-xl shadow-lg w-full flex flex-col items-center justify-center max-w-md h-full dark:bg-gray-900 dark:text-gray-50 p-4'>
      <h2 className='text-center text-sm font-semibold mb-2'>Registros</h2>
      <form className='w-full max-w-sm mx-auto'>
        <div className='mb-5'>
          <label
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
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
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-secondary-500'
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='description'>Descripción:</label>
          <input
            type='text'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-secondary-500'
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='value'>Valor:</label>
          <input
            type='number'
            id='value'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-secondary-500'
          />
        </div>

        <div className='flex items-center justify-around w-full'>
          <button
            type='submit'
            onClick={incomeSubmit}
            className='text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm w-full px-5 py-2.5 me-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none'
          >
            Ingreso
          </button>
        </div>
        <div className='flex items-center justify-around w-full'>
          <button
            type='submit'
            onClick={expenseSubmit}
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
