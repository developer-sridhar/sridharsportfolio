import React from "react";
import { useSelector } from "react-redux";

const Intro = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData || {}; // Provide a default empty object

  const { firstName, lastName, welcomeText, description, caption } = intro || {}; // Provide a default empty object

  return (
    <div className="h-[80vh] bg-primary flex flex-col items-start justify-center gap-8">
      <h1 className="text-white">{welcomeText || ''}</h1>
      <h2 className="text-7xl sm:text-3xl text-secondary">{firstName || ''} {lastName || ''}</h2>
      <h3 className="text-6xl sm:text-3xl text-white font-semibold">
        {caption || ''}
      </h3>
      <p className="text-white w-2/3">
        {description || ''}
      </p>
      <button className="border-2 border-tertiary text-tertiary px-10 py-3 rounded">Get Started</button>
    </div>
  );
};

export default Intro;
