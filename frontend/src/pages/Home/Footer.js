import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleAdminLoginClick = () => {
    navigate('/admin-login');
  };

  return (
    <div className='py-10'>
      <div className='h-[1px] w-full bg-gray-700'></div>
      <div className='flex items-center justify-center flex-col mt-10 opacity-70'>
        <h1 className='text-white'>Designed & Developed By</h1>
        <h1 className='text-white'>
          <span className='text-tertiary cursor-pointer hover:text-blue-600'>Sridhar.C</span>
        </h1>
      </div>
      <div>
        <h3 className='text-secondary '>Admin Use Only</h3>
        <button onClick={handleAdminLoginClick} className='text-tertiary bg-primary border-tertiary border px-4 py-2 hover:text-primary hover:font-semibold hover:bg-tertiary'>Admin Login</button>
      </div>
    </div>
  );
}

export default Footer;
