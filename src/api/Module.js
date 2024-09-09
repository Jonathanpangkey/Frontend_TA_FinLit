import axios from "axios";
import {API_BASE_URL} from "./ApiConf";
import {getAuthHeader} from "./getToken";

export const fetchModules = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/modules`, {
      headers: getAuthHeader(),
      params: {userId},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching modules", error);
    throw error;
  }
};
