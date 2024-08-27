import React from "react";
import axios from "axios";
import { message } from 'antd';
import { HideLoading, ShowLoading } from "../../../redux/rootSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post('https://sridharsportfolio.onrender.com/api/portfolio/admin-login', user);
      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem('token', JSON.stringify(response.data.token));
        navigate('/admin');
      } else {
        message.error("Please enter the correct username or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      message.error("Please enter the correct username or password.");
      message.error("Login Failed!. Admin only Allowed");
    } finally {
      dispatch(HideLoading());
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-secondary">
      <motion.div
        className="w-96 flex flex-col p-8 shadow-lg border border-gray-500 bg-white rounded-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Sridhar - Admin Login</h1>
        <hr className="mb-4 border-gray-300" />
        <motion.input
          type="text"
          value={user.username}
          placeholder="Username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="p-3 border border-gray-300 rounded mb-4 w-full focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
          whileFocus={{ scale: 1.05 }}
        />
        <motion.input
          type="password"
          value={user.password}
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="p-3 border border-gray-300 rounded mb-6 w-full focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
          whileFocus={{ scale: 1.05 }}
        />
        <motion.button
          className="bg-primary text-white p-3 rounded-lg hover:bg-primary-dark transition-colors duration-300"
          onClick={login}
          whileHover={{ scale: 1.05 }}
        >
          Login
        </motion.button>
        <motion.button
          className="bg-secondary text-white p-3 rounded-lg mt-4 hover:bg-secondary-dark transition-colors duration-300"
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
        >
          Go Back to Home Page
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Login;
