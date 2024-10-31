import { useContext } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Context } from './context/GlobalState';
import Home from './pages/Home';
import About from './pages/About';
import Income from './pages/Income';
import Expense from './pages/Expense';
import Transactions from './pages/Transactions';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

function App() {
  const { theme } = useContext(Context);
  return (
    <HashRouter>
      <div
        className={`min-h-screen flex flex-col font-[Poppins] bg-gray-100 text-gray-950 dark:bg-gray-950 dark:text-gray-50 ${
          theme === 'dark' ? 'dark' : ''
        }`}
      >
        <Navbar />

        <main className='flex flex-grow min-h-full p-4'>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/about'
              element={<About />}
            />
            <Route
              path='/income'
              element={<Income />}
            />
            <Route
              path='/expense'
              element={<Expense />}
            />
            <Route
              path='/transactions'
              element={<Transactions />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
