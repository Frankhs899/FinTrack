import TransactionTable from '../components/transactions/TransactionTable';
import Balance from '../components/balance/Balance';

function Home() {
  return (
    <div className='flex flex-col items-center w-full min-h-full gap-4 overflow-x-hidden lg:flex-row'>
      <Balance />
      <TransactionTable />
    </div>
  );
}

export default Home;
