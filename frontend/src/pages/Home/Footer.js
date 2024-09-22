import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon

const Footer = () => {

  return (
    <div className='py-10'>
      <div className='h-[1px] w-full bg-gray-700'></div>
      <div className='flex items-center justify-center flex-col mt-10 opacity-70'>
        <h1 className='text-white'>Designed & Developed By</h1>
        <h1 className='text-white'>
          <span className='text-tertiary cursor-pointer hover:text-blue-600'>Sridhar.C</span>
        </h1>
      </div>
    </div>
  );
};

export default Footer;
