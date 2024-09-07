import React from "react";
import SideBar from "./SideBar";
import Main from "./Main";

const Home = () => {
  return (
    <div className="flex">
      <SideBar />
      <Main />
    </div>
  );
};

export default Home;
