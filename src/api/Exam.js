import axios from "axios";
import {getAuthHeader} from "./getToken";
import {API_BASE_URL} from "./ApiConf";

export const getExams = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/exams`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch exams:", error);
    throw error;
  }
};
