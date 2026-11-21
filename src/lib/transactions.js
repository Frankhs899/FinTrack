export const INCOME = 'income';
export const EXPENSE = 'expense';

export const TRANSACTION_TYPES = [INCOME, EXPENSE];

// Display labels stay in Spanish; the stored values stay in English.
export const TRANSACTION_TYPE_LABELS = {
  [INCOME]: 'Ingreso',
  [EXPENSE]: 'Gasto',
};

// Transactions written by older versions stored the Spanish label as the type.
const TYPE_ALIASES = {
  income: INCOME,
  ingreso: INCOME,
  expense: EXPENSE,
  gasto: EXPENSE,
};

export const createId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `t-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
};

export const normalizeType = (type) => {
  if (typeof type !== 'string') {
    return INCOME;
  }
  return TYPE_ALIASES[type.trim().toLowerCase()] ?? INCOME;
};

export const normalizeTransaction = (record) => {
  if (!record || typeof record !== 'object') {
    return null;
  }

  const value = Number.parseFloat(record.value);

  return {
    id: record.id ?? createId(),
    date: typeof record.date === 'string' ? record.date : '',
    type: normalizeType(record.type),
    description:
      typeof record.description === 'string' ? record.description : '',
    value: Number.isFinite(value) ? value : 0,
  };
};

export const loadStoredTransactions = (storage = localStorage) => {
  const raw = storage.getItem('transactions');
  if (!raw) {
    return [];
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed.map(normalizeTransaction).filter(Boolean);
};
