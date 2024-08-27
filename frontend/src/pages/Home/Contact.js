import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

const Contact = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const { contact } = portfolioData || {};

  return (
    <div>
      <SectionTitle title="Say Hello!!!" />

      <div className="flex sm:flex-col items-center">
        <div className="flex flex-col gap-1">
          <p className="text-tertiary">{"{"}</p>
          {contact &&
            Object.keys(contact).map(
              (key) =>
                key !== "_id" && (
                  <p className="ml-5" key={key}>
                    <span className="text-tertiary">{key} : </span>:{" "}
                    <span className="text-tertiary">{contact[key]}</span>
                  </p>
                )
            )}
          <p className="text-tertiary">{"}"}</p>
        </div>
        <div className="h-[400px]">
          <dotlottie-player
            src="https://lottie.host/46c6ffc7-8702-412f-ac26-1ed51f757aec/DyZCEjubhM.json"
            background="transparent"
            speed="1"
            autoplay
          ></dotlottie-player>
        </div>
      </div>
    </div>
  );
};

export default Contact;
