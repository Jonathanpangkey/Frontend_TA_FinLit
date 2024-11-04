import axios from "axios";
import {API_BASE_URL} from "./ApiConf";
import {getAuthHeader} from "./getToken";

export const fetchUserProgress = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user-progress`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user progress data", error);
    throw error;
  }
};