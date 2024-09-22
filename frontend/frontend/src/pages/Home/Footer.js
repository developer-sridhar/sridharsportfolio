import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon

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
      <div className='flex flex-row space-x-2 items-center mt-4 '>
        <h3 className='text-secondary'>Admin Use Only</h3>
        <FontAwesomeIcon
          onClick={handleAdminLoginClick}
          icon={faRightToBracket}
          className='text-tertiary cursor-pointer hover:text-green-600 text-2xl mt-2 mb-2'
        />
        
      </div>
    </div>
  );
};

export default Footer;
