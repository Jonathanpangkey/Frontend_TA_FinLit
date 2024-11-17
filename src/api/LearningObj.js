import axios from "axios";
import {API_BASE_URL} from "./ApiConf";
import {getAuthHeader} from "./getToken";

export const fetchLearningObjectivesWithQuizCompletion = async (subModuleId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/learning-objectives/submodule/${subModuleId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch learning objectives", error);
    throw error;
  }
};
