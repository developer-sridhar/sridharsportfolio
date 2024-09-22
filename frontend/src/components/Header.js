import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleAdminLoginClick = () => {
    navigate('/admin-login');
  };
  return (
    <div className='p-5 bg-primary flex justify-between'>
        <h1 className='text-secondary text-4xl font-semibold'>S</h1>
        <h1 className='text-tertiary text-4xl font-semibold'>R</h1>
        <h1 onClick={handleAdminLoginClick} className='text-white text-4xl font-semibold'>I</h1>
        <h1 className='text-secondary text-4xl font-semibold'>D</h1>
        <h1 className='text-tertiary text-4xl font-semibold'>H</h1>
        <h1 className='text-white text-4xl font-semibold'>A</h1>
        <h1 className='text-secondary text-4xl font-semibold'>R</h1>
    </div>
  )
}

export default Header
