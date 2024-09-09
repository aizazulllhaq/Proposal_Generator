import { useQuery } from "@tanstack/react-query";
import React, { createContext, useState } from "react";
import apiClient from "../Components/Utils/apiClient";

export const AuthContext = createContext();

export const AuthProvider = () => {
  const [user, setUser] = useState(null);

  const { data } = useQuery(
    "checkAuth",
    async () => {
      const response = await apiClient.get("/api/v1/users/auth/check");
      return response.data;
    },
    {
      retry: false,
      onSuccess: (data) => {
        setUser(data);
      },
      onError: () => setUser(null),
    }
  );
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
