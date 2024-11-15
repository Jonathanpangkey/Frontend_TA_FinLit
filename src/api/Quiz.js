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

// Endpoint to mark quiz as completed and update objective completion
export const completeQuiz = async (subModuleId, objectiveIndexes) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/quizzes/${subModuleId}/complete`, {objectives: objectiveIndexes}, {headers: getAuthHeader()});
    return response.data;
  } catch (error) {
    console.error("Failed to complete the quiz:", error);
    throw error;
  }
};

// Endpoint to get objective completion status for a submodule
export const getObjectiveCompletionStatus = async (subModuleId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/quizzes/submodule/${subModuleId}/progress`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch objective completion status:", error);
    throw error;
  }
};
