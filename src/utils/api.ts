import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";


export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Login request
export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

// Signup request
export const registerUser = async (name: string, email: string, password: string) => {
  const response = await api.post("/auth/register", { name, email, password });
  return response.data;
};
