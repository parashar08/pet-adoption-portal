import { useContext } from 'react';
import { UserContext } from '../contextAPI/UserContext';

const userAuth = () => {
  const { user, login, logout } = useContext(UserContext);

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await fetch('https://pet-adoption-portel-backenpet-adopd.onrender.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      localStorage.setItem('token', data.token);
      if (response.ok) {
        login(data);
        return data;
      }
    } catch (error) {
      console.log('LOGIN ERROR!!!', error);
    }
  };

  const handleSignup = async ({ name, email, role, password }) => {
    try {
      const response = await fetch('https://pet-adoption-portel-backenpet-adopd.onrender.com/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, role, password }),
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      }
      return null;
    } catch (error) {
      console.log('SIGNUP ERROR!!!', error);
    }
  };

  const handleLogout = async () => {
    logout();
  };

  return { user, handleLogin, handleSignup, handleLogout };
};

export default userAuth;
