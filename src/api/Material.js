import axios from "axios";
import {API_BASE_URL} from "./ApiConf";
import {getAuthHeader} from "./getToken";

export const getMaterialsBySubModuleId = async (subModuleId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/materials/submodule/${subModuleId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching materials:", error);
    throw error;
  }
};

export const getMaterialById = async (id, userId) => {
  try {
    // Mengirim request ke backend dengan `id` dan `userId` sebagai parameter
    const response = await axios.get(`${API_BASE_URL}/materials/${id}`, {
      headers: getAuthHeader(),
      params: {userId}, // Menambahkan userId ke dalam params
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching material:", error);
    throw error;
  }
};
