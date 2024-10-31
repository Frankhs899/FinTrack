import { useContext, useState } from 'react';
import { Context } from '../context/GlobalState';

function Expense() {
  const { setTransactions, setExpense, setBalance } = useContext(Context);

  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del ingreso
    const newExpense = {
      id: Date.now(),
      date,
      description,
      value: parseFloat(value),
      type: 'expense',
    };

    // Agregar el nuevo ingreso al arreglo de transacciones
    setTransactions((prevTransactions) => [...prevTransactions, newExpense]);

    // Actualizar el ingreso total
    setExpense((prevExpense) => prevExpense + parseFloat(value));

    // Actualizar el balance total
    setBalance((prevBalance) => prevBalance - parseFloat(value));

    // Limpiar los campos del formulario
    setDate('');
    setDescription('');
    setValue('');
  };
  return (
    <div>
      <h1>Gastos</h1>
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
        <button type='submit'>Agregar Gasto</button>
      </form>
    </div>
  );
}

export default Expense;
