import { formToJSON } from 'axios';
import userAuth from '../hooks/userAuth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { handleLogin } = userAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await handleLogin(formData);
    if (data) {
      setFormData({
        email: '',
        password: '',
      });
      navigate('/');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-pink-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
