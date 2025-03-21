import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";


export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Fetch Projects
export const getProjects = async () => {
  const response = await api.get("/projects");
  return response.data;
};

// Fetch Recent Activities
export const getRecentActivities = async () => {
  const response = await api.get("/activities");
  return response.data;
};

// Login request
export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post("/auth/register", { name, email, password });
    return response.data;
  } catch (error: any) {
    console.error("🔴 Registration failed:", error.response?.data || error.message);
    throw error; // Rethrow to handle it in Signup component
  }
};

