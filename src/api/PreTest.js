import axios from "axios";
import {getAuthHeader} from "./getToken";
import {API_BASE_URL} from "./ApiConf";

export const getPreTests = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pre-tests`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch pre-tests:", error);
    throw error;
  }
};

export const completePreTest = async (preTestProgress) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/pre-tests/complete`, preTestProgress, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to complete the pre-test:", error);
    throw error; // Re-throw the error for handling in the calling component
  }
};

export const getPreTestProgress = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pre-tests/progress`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch pre-test progress:", error);
    throw error;
  }
};
