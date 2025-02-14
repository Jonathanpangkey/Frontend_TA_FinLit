import axios from "axios";
import {API_BASE_URL} from "./ApiConf";
import {getAuthHeader} from "./getToken";

export const addResource = async (subModuleId, resource) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/resources/submodule/${subModuleId}`, resource, {headers: getAuthHeader()});
    return response.data;
  } catch (error) {
    console.error("Error adding resource", error);
    throw error;
  }
};
