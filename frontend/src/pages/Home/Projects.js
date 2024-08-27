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
      <SectionTitle title="Projects" />

      <div className="flex py-10 gap-20 flex-col md:flex-row">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-full md:w-1/3 md:overflow-y-auto">
          {project && project.map((project, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedItemIndex(index);
              }}
              className="cursor-pointer"
            >
              <h1
                className={`text-xl px-5 ${
                  selectedItemIndex === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3"
                    : "text-white"
                }`}
              >
                {project.title}
              </h1>
            </div>
          ))}
        </div>

        {project && (
          <div className="flex items-center justify-center gap-10 flex-col md:flex-row">
          <Link to={project[selectedItemIndex].link}>
            <img
              src={project[selectedItemIndex].image}
              alt={project[selectedItemIndex].title}
              className="h-60 w-72"
            />
          </Link> 
            <div className="flex flex-col gap-5">
              <h1 className="text-secondary text-2xl font-semibold">
                {project[selectedItemIndex].title}
              </h1>
              <p className="text-white">
                {project[selectedItemIndex].description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;
