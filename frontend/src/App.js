import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Loader";
import {
  HideLoading,
  ReloadData,
  SetPortfolioData,
  ShowLoading,
} from "./redux/rootSlice";
import Admin from "./pages/Home/admin";
import Login from "./pages/Home/admin/Login";
import Home from "./pages/Home";

function App() {
  
  const { portfolioData, loading, reloadData } = useSelector(
    (state) => state.root
  );
  const dispatch = useDispatch();

  const getPortfolioData = useCallback(async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get("https://sridharsportfolio.onrender.com/api/portfolio/get-portfolio-data");
      dispatch(SetPortfolioData(response.data));
      dispatch(ReloadData(false));
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      console.error("Failed to fetch portfolio data:", error);
    }
  }, [dispatch]);
  

  useEffect(() => {
    if (!portfolioData || reloadData) {
      getPortfolioData();
    }
  }, [portfolioData, reloadData, getPortfolioData]);

  return (
    <BrowserRouter>
      {loading && <Loader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
