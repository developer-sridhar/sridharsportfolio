import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const Project = () => {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { project } = portfolioData;

  return (
    <div>
      <SectionTitle title="Projects"/>

      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {project.map((projectItem, index) => (
            <div
              key={index}
              onClick={() => setSelectedItemIndex(index)}
              className="cursor-pointer"
            >
              <h1
                className={`text-xl px-5 ${
                  selectedItemIndex === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3"
                    : "text-white"
                }`}
              >
                {projectItem.title}
              </h1>
            </div>
          ))}
        </div>

        {project.length > 0 && (
          <div className="flex items-center justify-center gap-10 sm:flex-col">  
            <img
              src={project[selectedItemIndex].image}
              alt={project[selectedItemIndex].title}
              className="h-52 w-80"
            />        
            <div className="flex flex-col gap-5">
              <h1 className="text-secondary text-2xl font-semibold">
                {project[selectedItemIndex].title}
              </h1>
              <p className="text-white">
                {project[selectedItemIndex].description}
              </p>
              <Link to={project[selectedItemIndex].link}>
                <button className="border-2 hover:bg-tertiary hover:text-primary hover:font-semibold border-tertiary text-tertiary px-5 py-3 rounded">
                  View
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;
