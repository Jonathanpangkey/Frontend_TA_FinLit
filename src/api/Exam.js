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

export const completeExam = async (examProgress) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/exams/complete`, examProgress, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to complete the exam:", error);
    throw error; // Re-throw the error for handling in the calling component
  }
};

export const getExamProgress = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/exams/progress`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch exam progress:", error);
    throw error;
  }
};
