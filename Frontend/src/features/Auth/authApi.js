import apiClient from "../../Components/Utils/apiClient";

export async function signin(data) {
  const { email, password } = data;
  try {
    const response = await apiClient.post("/api/v1/users/auth/signin", {
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
    return response.data.msg;
  } catch (error) {
  }
}

export async function authCheck() {
  const response = await apiClient.get("/api/v1/users/auth/check");
  return response.data;
}
