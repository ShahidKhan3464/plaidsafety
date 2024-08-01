// Importing API_ENDPOINTS from constants and ApiClient from services
import { API_ENDPOINTS } from 'constants/endPoints';
import ApiClient from 'services/api';

// Creating an instance of the ApiClient
const api = new ApiClient();

// Function for user login
const login = async (data) => {
  const response = await api.post(API_ENDPOINTS.AUTH.SIGN_IN, data);
  return response;
};

// Function for user signup
const signup = async (data) => {
  const response = await api.post(API_ENDPOINTS.AUTH.SIGN_UP, data);
  return response;
};

// Function for initiating the forgot password process
const forgotPassword = async (data) => {
  const response = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
  return response;
};

// Function for resetting user password
const resetPassword = async (data) => {
  const response = await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
  return response;
};

// Function for verifying otp
const otpVerification = async (data) => {
  const response = await api.post(API_ENDPOINTS.AUTH.VERIFY_OTP, data);
  return response;
};

// Function for resending otp
const resendOtp = async (data) => {
  const response = await api.post(API_ENDPOINTS.AUTH.RESEND_OTP, data);
  return response;
};

// Object containing authentication service functions
const authService = {
  login,
  signup,
  resendOtp,
  resetPassword,
  forgotPassword,
  otpVerification
};

export default authService;
