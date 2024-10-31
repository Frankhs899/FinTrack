import { useContext, useState } from 'react';
import { Context } from '../context/GlobalState';
import TransactionForm from '../components/forms/TransactionForm';
import TransactionTable from '../components/transactions/TransactionTable';

function Income() {
  const { setTransactions, setIncome, setBalance } = useContext(Context);

  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Creando objeto con los datos de ingreso
    const newIncome = {
      id: Date.now(),
      date,
      description,
      value: parseFloat(value),
      type: 'income',
    };

    setTransactions((prevTransactions) => [...prevTransactions, newIncome]);

    setIncome((prevIncome) => prevIncome + parseFloat(value));

    setBalance((prevBalance) => prevBalance + parseFloat(value));

    setDate('');
    setDescription('');
    setValue('');
  };

  return (
    <div className='flex flex-col items-center w-full min-h-full gap-4 overflow-x-hidden lg:flex-row'>
      {/* <h1>Ingresos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='date'>Fecha:</label>
          <input
            type='date'
            id='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className='text-black'
          />
        </div>
        <div>
          <label htmlFor='description'>Descripción:</label>
          <input
            type='text'
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className='text-black'
          />
        </div>
        <div>
          <label htmlFor='value'>Valor:</label>
          <input
            type='number'
            id='value'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            className='text-black'
          />
        </div>
        <button type='submit'>Agregar Ingreso</button>
      </form> */}
      <TransactionForm />
      <TransactionTable />
    </div>
  );
}

export default Income;
