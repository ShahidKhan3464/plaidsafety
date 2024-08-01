// Importing utility functions, authentication service, and Redux toolkit functions
import { getUser } from 'utils';
import authService from './auth.service';
import { enqueueSnackbar } from 'notistack';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Getting the user data from local storage
const user = getUser();
// Initial state for the authentication slice
const initialState = {
  login: {
    data: user || null, // User data, initialized with the user from local storage
    message: '', // Additional message from authentication actions
    isError: false, // Flag indicating if an error occurred
    isLoading: false // Flag indicating if the action is in progress
  },
  signup: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  forgotPassword: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  resetPassword: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  otpVerification: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  resendOtp: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  }
};

// Async thunk for handling user login
export const login = createAsyncThunk(
  'auth/login',
  async ({ data, successCallback, errCallback }, thunkAPI) => {
    try {
      const response = await authService.login(data);
      if (response.data.status) {
        const user = response.data.data.user;
        const auth_token = response.data.data.accessToken;
        enqueueSnackbar(response.data.message, { variant: 'success' });
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('auth_token', JSON.stringify(auth_token));
        successCallback && successCallback();
        return response.data.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      // Handling errors and displaying notifications
      if (err?.response?.data?.data) {
        const { isVerified, emailSent } = err.response.data.data;
        if (!(isVerified && emailSent)) {
          // Handle case where email is not verified
          errCallback && errCallback(err?.response?.data?.data);
          return;
        }
      }

      let errorMessage =
        err?.response?.data?.message ?? 'Something went wrong. Please try again';
      enqueueSnackbar(errorMessage, { variant: 'error' });

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for handling user signup
export const signup = createAsyncThunk(
  'auth/signup',
  async ({ data, successCallback }, thunkAPI) => {
    try {
      const response = await authService.signup(data);
      if (response.data.status) {
        enqueueSnackbar(response.data.message, { variant: 'success' });
        successCallback && successCallback();
        return response.data.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      // Handling errors and displaying notifications
      let errorMessage =
        err?.response?.data?.message ?? 'Something went wrong. Please try again';
      enqueueSnackbar(errorMessage, { variant: 'error' });

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for initiating the forgot password process
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ data, successCallback }, thunkAPI) => {
    try {
      const response = await authService.forgotPassword(data);
      if (response.data.status) {
        enqueueSnackbar(response.data.message, { variant: 'success' });
        successCallback && successCallback();
        return response.data.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      // Handling errors and displaying notifications
      let errorMessage =
        err?.response?.data?.message ?? 'Something went wrong. Please try again';
      enqueueSnackbar(errorMessage, { variant: 'error' });

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for resetting user password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ data, successCallback }, thunkAPI) => {
    try {
      const response = await authService.resetPassword(data);
      if (response.data.status) {
        enqueueSnackbar(response.data.message, { variant: 'success' });
        successCallback && successCallback();
        return response.data.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      // Handling errors and displaying notifications
      let errorMessage =
        err?.response?.data?.message ?? 'Something went wrong. Please try again';
      enqueueSnackbar(errorMessage, { variant: 'error' });

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for verifiying otp
export const otpVerification = createAsyncThunk(
  'auth/otpVerification',
  async ({ data, successCallback }, thunkAPI) => {
    try {
      const response = await authService.otpVerification(data);
      if (response.data.status) {
        successCallback && successCallback(response.data);
        return response.data.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      // Handling errors and displaying notifications
      let errorMessage =
        err?.response?.data?.message ?? 'Something went wrong. Please try again';
      enqueueSnackbar(errorMessage, { variant: 'error' });

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for resending otp
export const resendOtp = createAsyncThunk(
  'auth/resendOtp',
  async ({ data }, thunkAPI) => {
    try {
      const response = await authService.resendOtp(data);
      if (response.data.status) {
        enqueueSnackbar(response.data.message, { variant: 'success' });
        return response.data.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      // Handling errors and displaying notifications
      let errorMessage =
        err?.response?.data?.message ?? 'Something went wrong. Please try again';
      enqueueSnackbar(errorMessage, { variant: 'error' });

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Creating the authentication slice using createSlice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Resetting the authentication state to initial values
    reset: (state) => {
      state.login = {
        data: user || null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.signup = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.forgotPassword = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.resetPassword = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.otpVerification = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.resendOtp = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
    }
  },
  // Handling extra reducers for async thunks
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.login.data = null;
        state.login.message = '';
        state.login.isError = false;
        state.login.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login.isLoading = false;
        state.login.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.login.data = null;
        state.login.isError = true;
        state.login.isLoading = false;
        state.login.message = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.signup.data = null;
        state.signup.message = '';
        state.signup.isError = false;
        state.signup.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.signup.isLoading = false;
        state.signup.data = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.signup.data = null;
        state.signup.isError = true;
        state.signup.isLoading = false;
        state.signup.message = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPassword.data = null;
        state.forgotPassword.message = '';
        state.forgotPassword.isError = false;
        state.forgotPassword.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.forgotPassword.isLoading = false;
        state.forgotPassword.data = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPassword.data = null;
        state.forgotPassword.isError = true;
        state.forgotPassword.isLoading = false;
        state.forgotPassword.message = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetPassword.data = null;
        state.resetPassword.message = '';
        state.resetPassword.isError = false;
        state.resetPassword.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPassword.isLoading = false;
        state.resetPassword.data = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPassword.data = null;
        state.resetPassword.isError = true;
        state.resetPassword.isLoading = false;
        state.resetPassword.message = action.payload;
      })
      .addCase(otpVerification.pending, (state) => {
        state.otpVerification.data = null;
        state.otpVerification.message = '';
        state.otpVerification.isError = false;
        state.otpVerification.isLoading = true;
      })
      .addCase(otpVerification.fulfilled, (state, action) => {
        state.otpVerification.isLoading = false;
        state.otpVerification.data = action.payload;
      })
      .addCase(otpVerification.rejected, (state, action) => {
        state.otpVerification.data = null;
        state.otpVerification.isError = true;
        state.otpVerification.isLoading = false;
        state.otpVerification.message = action.payload;
      })
      .addCase(resendOtp.pending, (state) => {
        state.resendOtp.data = null;
        state.resendOtp.message = '';
        state.resendOtp.isError = false;
        state.resendOtp.isLoading = true;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.resendOtp.isLoading = false;
        state.resendOtp.data = action.payload;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.resendOtp.data = null;
        state.resendOtp.isError = true;
        state.resendOtp.isLoading = false;
        state.resendOtp.message = action.payload;
      });
  }
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
