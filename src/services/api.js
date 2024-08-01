// Importing Axios for making HTTP requests and the utility function to get the access token
import axios from "axios";
import { getAccessToken } from "utils";

// Retrieving the base URL from environment variables
const { REACT_APP_BASE_URL } = process.env;

// Class representing an API client for making HTTP requests
class ApiClient {
  // Constructor initializes the Axios client with common configurations
  constructor() {
    this.client = axios.create({
      baseURL: REACT_APP_BASE_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "ngrok-skip-browser-warning",
      },
    });
    this.client.interceptors.request.use(
      async (config) => {
        const token = await JSON.parse(localStorage.getItem("auth_token"));
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error?.response &&
          error?.response?.data?.message === "Token is expired or invalid."
        ) {
          localStorage.removeItem("user");
          localStorage.removeItem("auth_token");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  // Updated method for making a POST request with file upload
  async postWithFile(endpoint, formData) {
    const response = await this.client.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getAccessToken()}`,
        // 'ngrok-skip-browser-warning': 'ngrok-skip-browser-warning'
      },
    });
    return response;
  }

  // Method for making a GET request
  async get(endpoint, params) {
    const response = await this.client.get(endpoint, { params });
    return response;
  }

  // Method for making a POST request
  async post(endpoint, data) {
    const response = await this.client.post(endpoint, data);
    return response;
  }

  // Method for making a PUT request
  async put(endpoint, data) {
    const response = await this.client.put(endpoint, data);
    return response;
  }

  // Method for making a PATCH request
  async patch(endpoint, data) {
    const response = await this.client.patch(endpoint, data);
    return response;
  }

  // Method for making a DELETE request
  async delete(endpoint, data) {
    const response = await this.client.delete(endpoint, { data });
    return response;
  }
}

export default ApiClient;
