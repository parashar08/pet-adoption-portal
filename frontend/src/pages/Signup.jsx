import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Signup Data:', formData);
    try {
      const data = await axios.post(
        'http://localhost:3000/api/user/register',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('API SIGNUP RESPONSE!', data);

      setFormData({
        name: '',
        email: '',
        role: '',
        password: '',
      });
      navigate('/login');
    } catch (error) {
      console.log('SIGNUP ERROR!!', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200 rounded-lg">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
            required
          />
          <select
            name="role"
            id="tole"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg foucs:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            onChange={handleChange}
          >
            <option value="">Select your role!</option>
            <option value="user">user</option>
            <option value="shelter">shelter</option>
            <option value="admin">admin</option>
          </select>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
