import { API } from "./index.ts";

export const register = (data: { name: string, email: string; password: string }) =>
  API.post("/auth/register", data);

export const login = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);