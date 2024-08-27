import React, { useEffect } from "react";
import { Tabs } from "antd";
import Header from "../../../components/Header";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import { useSelector } from "react-redux";
import Experiences from "./AdminExperiences.js";
import AdminProjects from "./AdminProjects.js";
import AdminCourses from "./AdminCourses.js";
import AdminContact from "./AdminContact.js";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Admin = () => {
  const { portfolioData } = useSelector((state) => state.root);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/admin-login";
    }
  }, []);

  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  const items = [
    { key: "1", label: "Intro", children: <AdminIntro /> },
    { key: "2", label: "About", children: <AdminAbout /> },
    { key: "3", label: "Experiences", children: <Experiences /> },
    { key: "4", label: "Projects", children: <AdminProjects /> },
    { key: "5", label: "Courses", children: <AdminCourses /> },
    { key: "6", label: "Contact", children: <AdminContact /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin-login";
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <h1 className="text-2xl px-5 py-2 pr-0 mr-2 text-primary font-semibold">
          Portfolio Admin
        </h1>
        <FontAwesomeIcon
          icon={faCircleCheck}
          className="text-green-400 text-2xl mt-3"
          title="Verified Admin"
        />
        <div className="ml-auto px-5 py-1 cursor-pointer" onClick={handleLogout}>
          <FontAwesomeIcon 
            icon={faRightFromBracket} 
            className="text-red-600 text-2xl mt-3"
            title="Logout"
          />
        </div>
      </div>
      <hr className="m-5 mt-0" />
      {portfolioData && (
        <div className="px-5">
          <Tabs
            defaultActiveKey="1"
            items={items}
            tabPosition={isLargeScreen ? "left" : "top"}
          />
        </div>
      )}
    </div>
  );
};

export default Admin;
