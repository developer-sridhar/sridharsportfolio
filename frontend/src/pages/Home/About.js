import React from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle";

const About = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const { about } = portfolioData || {};
  const { skills, lottieURL, description1, description2 } = about || {};

  return (
    <div className="p-6 md:p-8 xl:p-12">
      <SectionTitle title="About" />

      <div className="flex flex-col md:flex-row w-full items-center gap-6 md:gap-8 xl:gap-12">
        <div className="w-full md:w-1/2 h-[40vh] md:h-[60vh] xl:h-[70vh] bg-transparent lg:bg-primary">
          <dotlottie-player
            src={lottieURL || "Please check your Internet"}
            background="transparent"
            speed="1"
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          ></dotlottie-player>
        </div>
        <div className="flex flex-col gap-4 md:gap-6 w-full md:w-1/2">
          <p className="text-white text-base sm:text-lg md:text-xl xl:text-2xl">
            {description1 || "No description available."}
          </p>
          <p className="text-white text-base sm:text-lg md:text-xl xl:text-2xl">
            {description2 || "No additional details provided."}
          </p>
        </div>
      </div>

      <div className="py-6 md:py-8 xl:py-12">
        <h1 className="text-tertiary text-lg md:text-xl xl:text-2xl">
          Technologies I've been working with recently:
        </h1>
        <div className="flex flex-wrap gap-6 md:gap-8 xl:gap-10 mt-4">
          {skills && skills.map((skill, index) => (
            <div
              className="skill-box bg-tertiary text-white rounded-lg p-4 text-center text-base sm:text-lg md:text-xl xl:text-2xl"
              key={index}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
