import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Protected = () => {
  const { user } = useContext(AuthContext);

  if (user === null) {
    return <div>Loading....</div>;
  }

  return user ? (
    <Navigate to={"/"} replace={true} />
  ) : (
    <Navigate to={"/signin"} replace={true} />
  );
};

export default Protected;
