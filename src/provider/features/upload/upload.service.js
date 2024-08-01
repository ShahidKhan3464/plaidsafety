import { API_ENDPOINTS } from "constants/endPoints";
import ApiClient from "services/api";

// Creating an instance of the ApiClient
const api = new ApiClient();

export const multiple = async (data) => {
  const response = await api.postWithFile(API_ENDPOINTS.FILE.UPLOAD, data);
  return response;
};
