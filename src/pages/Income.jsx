import TransactionForm from '../components/forms/TransactionForm';
import TransactionTable from '../components/transactions/TransactionTable';

function Income() {
  return (
    <div className='flex flex-col items-center w-full min-h-full gap-4 overflow-x-hidden lg:flex-row'>
      <TransactionForm />
      <TransactionTable />
    </div>
  );
}

export default Income;
