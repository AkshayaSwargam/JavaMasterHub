import React, { createContext, useContext } from 'react';

// Define the FirebaseContext. This will be the single source of truth for Firebase instances.
export const FirebaseContext = createContext(null);

// Custom hook to easily consume the FirebaseContext.
// This hook will return the value provided by the FirebaseContext.Provider.
export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    // This error check helps debug if a component tries to use the context
    // without being wrapped by its Provider.
    console.error('useFirebase must be used within a FirebaseContext.Provider');
  }
  return context;
};