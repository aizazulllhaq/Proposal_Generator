import apiClient from "../../Components/Utils/apiClient";

export async function signin(data) {
  const { email, password } = data;
  try {
    const response = await apiClient.post("/api/v1/users/auth/signin", {
      email,
      password,
    });
    console.log("login response : ", response);
    const msg = response.data.msg;
    const id = response.data.data.id;
    return { msg, id };
  } catch (error) {
    throw error.response.data.message;
  }
}

export async function signup(data) {
  try {
    const { name, email, password } = data;
    const response = await apiClient.post("/api/v1/users/auth/signup", {
      name,
      email,
      password,
    });
    const msg = response.data.msg;
    const id = response.data.data.id;
    return { msg, id };
  } catch (error) {
    throw error.response.data.message;
  }
}

export async function logout() {
  try {
    const response = await apiClient.post("/api/v1/users/logout");
    console.log("response : ", response.data.msg);
    return response.data.msg;
  } catch (error) {
    console.log("logout error : ", error);
  }
}

export async function authCheck() {
  const response = await apiClient.get("/api/v1/users/auth/check");
  console.log("check : ", response.data);
  return response.data;
}
