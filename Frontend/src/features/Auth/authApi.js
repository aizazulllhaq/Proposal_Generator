import apiClient from "../../Components/Utils/apiClient";

export async function signin(data) {
  try {
    const response = await apiClient.post("/api/v1/users/auth/signin", {
      data,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("Login Error ", error);
  }
}

export async function signup(data) {
  try {
    const response = await apiClient.post("/api/v1/users/auth/signup", {
      data,
    });
    console.log("signup response : ", response);
    return response.data;
  } catch (error) {
    console.log("signup Error ", error);
  }
}

export async function authCheck() {
  try {
    const response = await apiClient.get("/api/v1/users/auth/check");
    console.log("check : ", response);
    return response.data;
  } catch (error) {
    console.log("auth check error : ", error);
  }
}
