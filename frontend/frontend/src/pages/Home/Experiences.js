import React from "react";
import SectionTitle from "./../../components/SectionTitle";
import { useSelector } from "react-redux";

const Experiences = () => {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { experience } = portfolioData;

  return (
    <div>
      <SectionTitle title="Experience" />

      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {experience && experience.map((experience, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedItemIndex(index);
              }}
              className="cursor-pointer"
            >
              <h1
                className={`text-xl px-5
                ${
                  selectedItemIndex === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3"
                    : "text-white"
                }`}
              >
                {experience.period}
              </h1>
            </div>
          ))}
        </div>

        {experience && (
          <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-2xl text-semibold">
              {experience[selectedItemIndex].title}
            </h1>
            <h1 className="text-tertiary text-xl">
              {experience[selectedItemIndex].company}
            </h1>
            <p className="text-white">
              {experience[selectedItemIndex].description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Experiences;
