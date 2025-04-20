import { createContext, useState } from 'react';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    console.log(userData.data);
    setUser(userData.data);
  };

  const logout = () => {
    setUser(null);
  };
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
