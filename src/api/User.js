import axios from "axios";
import {API_BASE_URL} from "./ApiConf";
import {getAuthHeader} from "./getToken";

export const fetchUserInfo = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/me`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user information:", error);
    throw error;
  }
};
