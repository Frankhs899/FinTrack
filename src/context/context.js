import { createContext } from 'react';

// The context lives in its own module so GlobalState.jsx exports a component
// only: a file exporting both a hook-free value and a component breaks Fast
// Refresh (react-refresh/only-export-components).
export const Context = createContext();
