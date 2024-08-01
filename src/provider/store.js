// Importing configureStore from '@reduxjs/toolkit' and individual reducers
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/auth.slice';
import hazardReportReducer from './features/hazardReport/hazardReport.slice';
import riskAssessmentReducer from './features/riskAssessment/riskAssessment.slice';
import safetyObservationReducer from './features/safetyObservation/safetyObservation.slice'
const store = configureStore({
  // Reducers combined into a single object
  reducer: {
    auth: authReducer,
    hazardReport: hazardReportReducer,
    riskAssessment: riskAssessmentReducer,
    safetyObservation: safetyObservationReducer,
  },
});

// Exporting the RootState (initial state of the Redux store)
export const RootState = store.getState();

export default store;
