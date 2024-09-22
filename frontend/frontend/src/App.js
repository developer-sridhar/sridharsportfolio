import React, { useEffect, useCallback, useState } from "react";
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

function App() {
  const { portfolioData, loading, reloadData } = useSelector(
    (state) => state.root
  );
  const dispatch = useDispatch();
  const [showScrollToTop, setShowScrollToTop] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Show button when scrolled down 300px
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <BrowserRouter>
      {loading && <Loader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<Login />} />
      </Routes>
      {showScrollToTop && (
        <div
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 cursor-pointer p-2 bg-secondary text-white rounded-full shadow-lg hover:text-primary hover:bg-tertiary transition-all"
        >
          <FontAwesomeIcon icon={faArrowUp} size="2x" />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
