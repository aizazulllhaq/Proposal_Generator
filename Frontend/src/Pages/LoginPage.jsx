import React from "react";
import Login from "../Components/Login";

const LoginPage = ({ user, setUser }) => {
  return (
    <div>
      <Login user={user} setUser={setUser} />
    </div>
  );
};

export default LoginPage;
