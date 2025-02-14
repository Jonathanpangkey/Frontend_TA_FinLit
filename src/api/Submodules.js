import axios from "axios";
import {getAuthHeader} from "./getToken";
import {API_BASE_URL} from "./ApiConf";

export const fetchSubmodules = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/submodules`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching submodules", error);
    throw error;
  }
};

export const fetchSubModuleById = async (subModuleId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/submodules/${subModuleId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching submodule", error);
    throw error;
  }
};
