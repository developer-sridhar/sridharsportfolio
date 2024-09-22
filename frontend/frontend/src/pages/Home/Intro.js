import React from "react";
import { useSelector } from "react-redux";

const Intro = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData || {}; // Provide a default empty object

  const { firstName, lastName, welcomeText, description, caption } = intro || {}; // Provide a default empty object

  return (
    <div className="h-[80vh] bg-primary flex flex-col items-start justify-center gap-6 p-6 sm:p-4 md:p-8">
      <h1 className="text-white text-3xl md:text-2xl">{welcomeText || ''}</h1>
      <h2 className="text-4xl md:text-3xl sm:text-2xl text-secondary font-bold">
        {firstName || ''} {lastName || ''}
      </h2>
      <h3 className="text-3xl md:text-2xl sm:text-xl text-white font-semibold">
        {caption || ''}
      </h3>
      <p className="text-white text-lg md:text-base sm:text-sm w-full ">
        {description || ''}
      </p>
      <button className="border-2 border-tertiary text-tertiary hover:bg-tertiary hover:text-primary px-6 py-2 rounded-md text-base md:text-sm">
        Get Started
      </button>
    </div>
  );
};

export default Intro;
