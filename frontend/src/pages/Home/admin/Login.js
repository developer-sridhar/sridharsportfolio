// Login.js
import React from "react";
import axios from "axios";
import { message } from 'antd';
import { HideLoading, ShowLoading } from "../../../redux/rootSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
        localStorage.setItem('token', JSON.stringify(response.data));
        window.location.href = '/admin';
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      message.error("Login failed. Please try again later.");
      dispatch(HideLoading());
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 flex gap-5 p-5 shadow border border-gray-500 flex-col">
        <h1>Sridhar - Admin Login</h1>
        <hr />
        <input
          type="text"
          value={user.username}
          placeholder="User Name"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          type="password"
          value={user.password}
          placeholder="Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button className="bg-primary text-white p-2" onClick={login}>Login</button>
        <button className="bg-secondary text-white p-2 mt-2" onClick={() => navigate('/')}>Go Back to Home Page</button>
      </div>
    </div>
  );
};

export default Login;
