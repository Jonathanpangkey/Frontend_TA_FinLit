import axios from "axios";
import {API_BASE_URL} from "./ApiConf";
import {getAuthHeader} from "./getToken";

export const getQuizzesBySubModuleId = async (subModuleId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/quizzes/submodule/${subModuleId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch quizzes:", error);
    throw error;
  }
};

// Endpoint to mark quiz as completed and submit the score
export const completeQuiz = async (subModuleId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/quizzes/${subModuleId}/complete`, null, {headers: getAuthHeader()});
    return response.data;
  } catch (error) {
    console.error("Failed to complete the quiz:", error);
    throw error;
  }
};
