import { createContext, useEffect, useState } from 'react';

export const Context = createContext();

export const GlobalProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [transactions, setTransactions] = useState(() => {
    const storedTransactions = localStorage.getItem('transactions');
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  });

  const [balance, setBalance] = useState(() => {
    const storedBalance = localStorage.getItem('balance');
    return storedBalance ? parseFloat(storedBalance) : 0;
  });

  const [income, setIncome] = useState(() => {
    const storedIncome = localStorage.getItem('income');
    return storedIncome ? parseFloat(storedIncome) : 0;
  });

  const [expense, setExpense] = useState(() => {
    const storedExpense = localStorage.getItem('expense');
    return storedExpense ? parseFloat(storedExpense) : 0;
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('balance', balance.toString());
  }, [balance]);

  // Guardar income en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('income', income.toString());
  }, [income]);

  // Guardar expense en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('expense', expense.toString());
  }, [expense]);

  const handleChangeTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
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
        setTransactions,
        setBalance,
        setIncome,
        setExpense,
      }}
    >
      {children}
    </Context.Provider>
  );
};
