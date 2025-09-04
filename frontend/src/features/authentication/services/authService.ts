import apiClient from "../../../lib/apiClient";

export async function login(email: string, password: string) {
  const res = await apiClient.post("/auth/login", { email, password });
  return res.data; // { token, user }
}

export async function getCurrentUser(token?: string) {
  const res = await apiClient.get("/auth/me", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data; // user object
}

export async function logout() {
  await apiClient.post("/auth/logout");
}