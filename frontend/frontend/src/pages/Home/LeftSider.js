import React from "react";

const LeftSider = () => {
  const emailAddress = "programmer.sridhar@gmail.com";

  return (
    <div className="fixed left-0 bottom-0 px-10 sm:static">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-3 sm:flex-row sm:pb-5">
          <a
            href="https://github.com/developer-sridhar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-github-fill text-gray-400 text-xl hover:text-black"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/sridharfsd/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="ri-linkedin-fill text-gray-400 text-xl hover:text-[#57a0ff]"></i>
          </a>
          <a href={`mailto:${emailAddress}`}>
            <i className="ri-mail-line text-gray-400 text-xl hover:text-[#4285F4]"></i>
          </a>
          <a href="https://www.instagram.com/_sridhar_developer_/">
            <i className="ri-instagram-fill text-gray-400 text-xl"></i>
          </a>
          <a href="https://www.facebook.com/developer-sridhar">
            <i className="ri-facebook-circle-fill text-gray-400 text-xl"></i>
          </a>
        </div>
        <div className="w-[1px] h-52 bg-[#125f63] sm:hidden"></div>
      </div>
    </div>
  );
};

export default LeftSider;
