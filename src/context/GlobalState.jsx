import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  INCOME,
  createId,
  loadStoredTransactions,
  normalizeType,
  readStoredNumber,
} from '../lib/transactions';

export const Context = createContext();

const readInitialTheme = () => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    return storedTheme;
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const GlobalProvider = ({ children }) => {
  const [theme, setTheme] = useState(readInitialTheme);
  const [transactions, setTransactions] = useState(loadStoredTransactions);
  const [balance, setBalance] = useState(() => readStoredNumber('balance'));
  const [income, setIncome] = useState(() => readStoredNumber('income'));
  const [expense, setExpense] = useState(() => readStoredNumber('expense'));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('balance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('income', income.toString());
  }, [income]);

  useEffect(() => {
    localStorage.setItem('expense', expense.toString());
  }, [expense]);

  const handleChangeTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Single entry point for adding a movement: it keeps the transaction list and
  // the stored totals in sync, so no caller has to update them by hand.
  const addTransaction = (type, { date, description, value }) => {
    const normalizedType = normalizeType(type);
    const amount = Number.parseFloat(value);
    if (!Number.isFinite(amount)) {
      return;
    }

    setTransactions((prevTransactions) => [
      ...prevTransactions,
      {
        id: createId(),
        date,
        type: normalizedType,
        description,
        value: amount,
      },
    ]);

    if (normalizedType === INCOME) {
      setIncome((prevIncome) => prevIncome + amount);
      setBalance((prevBalance) => prevBalance + amount);
    } else {
      setExpense((prevExpense) => prevExpense + amount);
      setBalance((prevBalance) => prevBalance - amount);
    }
  };

  return (
    <Context.Provider
      value={{
        theme,
        handleChangeTheme,
        transactions,
        balance,
        income,
        expense,
        addTransaction,
      }}
    >
      {children}
    </Context.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
