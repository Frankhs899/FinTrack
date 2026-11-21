import { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  EXPENSE,
  INCOME,
  createId,
  loadStoredTransactions,
  normalizeType,
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

  const { balance, income, expense } = useMemo(() => {
    if (!Array.isArray(transactions)) {
      return { balance: 0, income: 0, expense: 0 };
    }
    let incomeTotal = 0;
    let expenseTotal = 0;
    for (const transaction of transactions) {
      const amount = Number.isFinite(transaction?.value)
        ? transaction.value
        : 0;
      if (transaction?.type === INCOME) {
        incomeTotal += amount;
      } else if (transaction?.type === EXPENSE) {
        expenseTotal += amount;
      }
    }
    return {
      income: incomeTotal,
      expense: expenseTotal,
      balance: incomeTotal - expenseTotal,
    };
  }, [transactions]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleChangeTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Single entry point for adding a movement: it appends to the transaction list;
  // totals are derived from that list via useMemo.
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
