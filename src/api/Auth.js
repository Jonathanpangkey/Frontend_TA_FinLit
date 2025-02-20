import axios from "axios";
import {API_BASE_URL} from "./ApiConf";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/authenticate`, {
      email,
      password,
    });
    const {token, firstname, role} = response.data;
    localStorage.setItem("firstName", firstname);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  } catch (error) {
    console.error("Error when login:", error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    // Make the registration request without attaching the Authorization header
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    localStorage.setItem("firstName", response.data.firstname);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};
