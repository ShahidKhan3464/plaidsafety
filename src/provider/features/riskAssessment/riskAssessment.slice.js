import { enqueueSnackbar } from 'notistack';
import riskAssessment from './riskAssessment.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    riskData: {
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

export const searchRisk = createAsyncThunk(
    'riskAssessment/search',
    async ({ data, successCallback }, thunkAPI) => {
        try {
            const response = await riskAssessment.searchRisk(data);
            if (response.status === 200) {
                successCallback && successCallback(response.data)
                return {
                    data: response.data.data,
                    totalRecords: response.data.total
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

export const createRisk = createAsyncThunk(
    'riskAssessment/create',
    async ({ data, successCallback }, thunkAPI) => {
        try {
            const response = await riskAssessment.createRisk(data);
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

export const riskDetails = createAsyncThunk(
    'riskAssessment/details',
    async ({ id, successCallback }, thunkAPI) => {
        try {
            const response = await riskAssessment.riskDetails(id);
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

export const updateRisk = createAsyncThunk(
    'riskAssessment/update',
    async ({ id, data, successCallback }, thunkAPI) => {
        try {
            const response = await riskAssessment.updateRisk(id, data);
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
    'riskAssessment/addCorrectiveAction',
    async ({ data, successCallback }, thunkAPI) => {
        try {
            const response = await riskAssessment.addCorrectiveAction(data);
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
    'riskAssessment/updateCorrectiveAction',
    async ({ data, successCallback }, thunkAPI) => {
        try {
            const response = await riskAssessment.updateCorrectiveAction(data);
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
    'riskAssessment/detailsCorrectiveAction',
    async ({ data, successCallback }, thunkAPI) => {
        try {
            const response = await riskAssessment.detailsCorrectiveAction(data);
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

export const riskAssessmentSlice = createSlice({
    name: 'riskAssessment',
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
        setRiskData: (state, action) => {
            state.riskData.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRisk.pending, (state) => {
                state.create.data = null;
                state.create.message = '';
                state.create.isError = false;
                state.create.isLoading = true;
            })
            .addCase(createRisk.fulfilled, (state, action) => {
                state.create.isLoading = false;
                state.create.data = action.payload;
            })
            .addCase(createRisk.rejected, (state, action) => {
                state.create.data = null;
                state.create.isError = true;
                state.create.isLoading = false;
                state.create.message = action.payload;
            })
            .addCase(searchRisk.pending, (state) => {
                state.search.data = null;
                state.search.message = '';
                state.search.isError = false;
                state.search.isLoading = true;
            })
            .addCase(searchRisk.fulfilled, (state, action) => {
                state.search.isLoading = false;
                state.search.data = action.payload.data;
                state.search.totalRecords = action.payload.totalRecords;
            })
            .addCase(searchRisk.rejected, (state, action) => {
                state.search.data = null;
                state.search.isError = true;
                state.search.isLoading = false;
                state.search.message = action.payload;
            })
            .addCase(riskDetails.pending, (state) => {
                state.details.data = null;
                state.details.message = '';
                state.details.isError = false;
                state.details.isLoading = true;
            })
            .addCase(riskDetails.fulfilled, (state, action) => {
                state.details.isLoading = false;
                state.details.data = action.payload;
            })
            .addCase(riskDetails.rejected, (state, action) => {
                state.details.data = null;
                state.details.isError = true;
                state.details.isLoading = false;
                state.details.message = action.payload;
            })
            .addCase(updateRisk.pending, (state) => {
                state.update.data = null;
                state.update.message = '';
                state.update.isError = false;
                state.update.isLoading = true;
            })
            .addCase(updateRisk.fulfilled, (state, action) => {
                state.update.isLoading = false;
                state.update.data = action.payload;
            })
            .addCase(updateRisk.rejected, (state, action) => {
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

export const { reset, setRiskData } = riskAssessmentSlice.actions;

export default riskAssessmentSlice.reducer;
