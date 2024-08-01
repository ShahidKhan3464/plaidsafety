import { enqueueSnackbar } from 'notistack';
import safetyObservation from './safetyObservation.service';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  safetyData: {
    data: {}
  },
  create: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  search: {
    data: null,
    message: '',
    isError: false,
    totalRecords: 0,
    isLoading: false
  },
  details: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  update: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  addCorrectiveAction: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  updateCorrectiveAction: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  },
  detailsCorrectiveAction: {
    data: null,
    message: '',
    isError: false,
    isLoading: false
  }
};

export const searchSafety = createAsyncThunk(
  'safetyObservation/search',
  async ({ data, successCallback }, thunkAPI) => {
    try {
      const response = await safetyObservation.searchSafety(data);
      if (response.status === 200) {
        successCallback && successCallback(response.data)
        return {
          data: response.data.data,
          totalRecords: response.data.totalRecords
        };
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      let errorMessage =
        err?.response?.data?.message ?? 'Something went wrong. Please try again';
      enqueueSnackbar(errorMessage, { variant: 'error' });

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const createSafety = createAsyncThunk(
  'safetyObservation/create',
  async ({ data, successCallback }, thunkAPI) => {
    try {
      const response = await safetyObservation.createSafety(data);
      if (response.status === 201) {
        successCallback && successCallback()
        enqueueSnackbar(response.data.message, { variant: 'success' });
        return response.data.data
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      let errorMessage =
        err?.response?.data?.message ?? 'Something went wrong. Please try again';
      enqueueSnackbar(errorMessage, { variant: 'error' });

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const safetyDetails = createAsyncThunk(
  'safetyObservation/details',
  async ({ id, successCallback }, thunkAPI) => {
    try {
      const response = await safetyObservation.safetyDetails(id);
      if (response.status === 200) {
        successCallback && successCallback(response.data.data)
        return response.data.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      let errorMessage =
        err?.response?.data?.message ?? 'Something went wrong. Please try again';
      enqueueSnackbar(errorMessage, { variant: 'error' });

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const updateSafety = createAsyncThunk(
  'safetyObservation/update',
  async ({ id, data, successCallback }, thunkAPI) => {
    try {
      const response = await safetyObservation.updateSafety(id, data);
      if (response.status === 200) {
        enqueueSnackbar(response.data.message, { variant: 'success' });
        successCallback && successCallback()
        return response.data.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      let errorMessage =
        err?.response?.data?.message ?? 'Something went wrong. Please try again';
      enqueueSnackbar(errorMessage, { variant: 'error' });

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const addCorrectiveAction = createAsyncThunk(
  'safetyObservation/addCorrectiveAction',
  async ({ data, successCallback }, thunkAPI) => {
    try {
      const response = await safetyObservation.addCorrectiveAction(data);
      if (response.status === 201) {
        successCallback && successCallback();
        enqueueSnackbar('corrective action is added successfully', { variant: 'success' });
        return response.data.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      let errorMessage =
        err?.response?.data?.message ?? 'Something went wrong. Please try again';
      enqueueSnackbar(errorMessage, { variant: 'error' });

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const updateCorrectiveAction = createAsyncThunk(
  'safetyObservation/updateCorrectiveAction',
  async ({ data, successCallback }, thunkAPI) => {
    try {
      const response = await safetyObservation.updateCorrectiveAction(data);
      if (response.status === 200) {
        successCallback && successCallback();
        enqueueSnackbar('corrective action is updated successfully', { variant: 'success' });
        return response.data.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      let errorMessage =
        err?.response?.data?.message ?? 'Something went wrong. Please try again';
      enqueueSnackbar(errorMessage, { variant: 'error' });

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const detailsCorrectiveAction = createAsyncThunk(
  'safetyObservation/detailsCorrectiveAction',
  async ({ data, successCallback }, thunkAPI) => {
    try {
      const response = await safetyObservation.detailsCorrectiveAction(data);
      if (response.status === 200) {
        successCallback && successCallback(response.data.data)
        return response.data.data;
      }
      return thunkAPI.rejectWithValue(response);
    } catch (err) {
      let errorMessage =
        err?.response?.data?.message ?? 'Something went wrong. Please try again';
      enqueueSnackbar(errorMessage, { variant: 'error' });

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const safetyObservationSlice = createSlice({
  name: 'safetyObservation',
  initialState,
  reducers: {
    reset: (state) => {
      state.create = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.search = {
        data: null,
        message: '',
        isError: false,
        totalRecords: 0,
        isLoading: false
      };
      state.details = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.update = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
      state.addCorrectiveAction = {
        data: null,
        message: '',
        isError: false,
        isLoading: false
      };
    },
    setSafetyData: (state, action) => {
      state.safetyData.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSafety.pending, (state) => {
        state.create.data = null;
        state.create.message = '';
        state.create.isError = false;
        state.create.isLoading = true;
      })
      .addCase(createSafety.fulfilled, (state, action) => {
        state.create.isLoading = false;
        state.create.data = action.payload;
      })
      .addCase(createSafety.rejected, (state, action) => {
        state.create.data = null;
        state.create.isError = true;
        state.create.isLoading = false;
        state.create.message = action.payload;
      })
      .addCase(searchSafety.pending, (state) => {
        state.search.data = null;
        state.search.message = '';
        state.search.isError = false;
        state.search.isLoading = true;
      })
      .addCase(searchSafety.fulfilled, (state, action) => {
        state.search.isLoading = false;
        state.search.data = action.payload.data;
        state.search.totalRecords = action.payload.totalRecords;
      })
      .addCase(searchSafety.rejected, (state, action) => {
        state.search.data = null;
        state.search.isError = true;
        state.search.isLoading = false;
        state.search.message = action.payload;
      })
      .addCase(safetyDetails.pending, (state) => {
        state.details.data = null;
        state.details.message = '';
        state.details.isError = false;
        state.details.isLoading = true;
      })
      .addCase(safetyDetails.fulfilled, (state, action) => {
        state.details.isLoading = false;
        state.details.data = action.payload;
      })
      .addCase(safetyDetails.rejected, (state, action) => {
        state.details.data = null;
        state.details.isError = true;
        state.details.isLoading = false;
        state.details.message = action.payload;
      })
      .addCase(updateSafety.pending, (state) => {
        state.update.data = null;
        state.update.message = '';
        state.update.isError = false;
        state.update.isLoading = true;
      })
      .addCase(updateSafety.fulfilled, (state, action) => {
        state.update.isLoading = false;
        state.update.data = action.payload;
      })
      .addCase(updateSafety.rejected, (state, action) => {
        state.update.data = null;
        state.update.isError = true;
        state.update.isLoading = false;
        state.update.message = action.payload;
      })
      .addCase(addCorrectiveAction.pending, (state) => {
        state.addCorrectiveAction.data = null;
        state.addCorrectiveAction.message = '';
        state.addCorrectiveAction.isError = false;
        state.addCorrectiveAction.isLoading = true;
      })
      .addCase(addCorrectiveAction.fulfilled, (state, action) => {
        state.addCorrectiveAction.isLoading = false;
        state.addCorrectiveAction.data = action.payload;
      })
      .addCase(addCorrectiveAction.rejected, (state, action) => {
        state.addCorrectiveAction.data = null;
        state.addCorrectiveAction.isError = true;
        state.addCorrectiveAction.isLoading = false;
        state.addCorrectiveAction.message = action.payload;
      })
      .addCase(updateCorrectiveAction.pending, (state) => {
        state.updateCorrectiveAction.data = null;
        state.updateCorrectiveAction.message = '';
        state.updateCorrectiveAction.isError = false;
        state.updateCorrectiveAction.isLoading = true;
      })
      .addCase(updateCorrectiveAction.fulfilled, (state, action) => {
        state.updateCorrectiveAction.isLoading = false;
        state.updateCorrectiveAction.data = action.payload;
      })
      .addCase(updateCorrectiveAction.rejected, (state, action) => {
        state.updateCorrectiveAction.data = null;
        state.updateCorrectiveAction.isError = true;
        state.updateCorrectiveAction.isLoading = false;
        state.updateCorrectiveAction.message = action.payload;
      })
      .addCase(detailsCorrectiveAction.pending, (state) => {
        state.detailsCorrectiveAction.data = null;
        state.detailsCorrectiveAction.message = '';
        state.detailsCorrectiveAction.isError = false;
        state.detailsCorrectiveAction.isLoading = true;
      })
      .addCase(detailsCorrectiveAction.fulfilled, (state, action) => {
        state.detailsCorrectiveAction.isLoading = false;
        state.detailsCorrectiveAction.data = action.payload;
      })
      .addCase(detailsCorrectiveAction.rejected, (state, action) => {
        state.detailsCorrectiveAction.data = null;
        state.detailsCorrectiveAction.isError = true;
        state.detailsCorrectiveAction.isLoading = false;
        state.detailsCorrectiveAction.message = action.payload;
      });
  }
});

// Select the slice state
export const selectSafetyObservation = (state) => state.safetyObservation;

// Create selectors for specific parts of the state
export const selectCreateStatus = createSelector(
  selectSafetyObservation,
  (state) => state.create
);

export const selectSearchStatus = createSelector(
  selectSafetyObservation,
  (state) => state.search
);

export const selectDetailsStatus = createSelector(
  selectSafetyObservation,
  (state) => state.details
);

export const selectUpdateStatus = createSelector(
  selectSafetyObservation,
  (state) => state.update
);

export const selectCorrectiveActionStatus = createSelector(
  selectSafetyObservation,
  (state) => state.correctiveAction
);

export const { reset, setSafetyData } = safetyObservationSlice.actions;

export default safetyObservationSlice.reducer;
