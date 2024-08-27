import React from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle";

const About = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const { about } = portfolioData;
  const { skills, lottieURL, description1, description2 } = about || {};
  console.log("abouts:", about);

  return (
    <div>
      <SectionTitle title="About" />

      <div className="flex w-full items-center sm:flex-col">
        <div className="h-[70vh] w-1/2 sm:w-full">
          <dotlottie-player
            src={lottieURL || "Please check your Internet"}
            background="transparent"
            speed="1"
            loop
            autoplay
          ></dotlottie-player>
        </div>
        <div className="flex flex-col gap-5 w-1/2 sm:w-full">
          <p className="text-white">
            {description1 || "No description available."}
          </p>
          <p className="text-white">
            {description2 || "No additional details provided."}
          </p>
        </div>
      </div>

      <div className="py-5">
        <h1 className="text-tertiary text-xl">
          Technologies I've been working with recently:
        </h1>
        <div className="flex flex-wrap gap-10 mt-5">
          {skills &&
            skills.map((skill, index) => (
              <div className="border border-tertiary py-3 px-5" key={index}>
                <h1 className="text-tertiary">{skill}</h1>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default About;
