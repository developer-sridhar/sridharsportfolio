import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className='h-screen flex items-center justify-center fixed inset-0 bg-primary z-[10000]'>
      <div className='flex gap-5 text-4xl font-semibold'>
        <h1 className='text-secondary s'>S</h1>
        <h1 className='text-white r'>R</h1>
        <h1 className='text-tertiary i'>I</h1>
      </div>
    </div>
  );
};

export default Loader;
