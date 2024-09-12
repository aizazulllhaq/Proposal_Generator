import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUserID } from "../authSlice";

const Protected = ({ children }) => {
  const LoggedInUserID = useSelector(selectLoggedInUserID);

  if (!LoggedInUserID) {
    return <Navigate to="/signin" replace={true} />;
  }

  return children;
};

export default Protected;
