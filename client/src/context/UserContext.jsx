import React, { createContext, useState, useContext } from "react";

// Create the context
export const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user state

  return (
    //Provide the context value to the children
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
