import { API_ENDPOINTS } from 'constants/endPoints';
import ApiClient from 'services/api';
const api = new ApiClient();

const searchSafety = async (data) => {
  const response = await api.post(API_ENDPOINTS.SAFETY_OBSERVATION.FILTER, data);
  return response;
};

const createSafety = async (data) => {
  const response = await api.post(API_ENDPOINTS.SAFETY_OBSERVATION.CREATE, data);
  return response;
};

const safetyDetails = async (id) => {
  const response = await api.get(`${API_ENDPOINTS.SAFETY_OBSERVATION.DETAILS}/${id}`);
  return response;
};

const updateSafety = async (id, data) => {
  const response = await api.put(`${API_ENDPOINTS.SAFETY_OBSERVATION.UPDATE}?id=${id}`, data);
  return response;
};

const addCorrectiveAction = async (data) => {
  const response = await api.post(API_ENDPOINTS.SAFETY_OBSERVATION.ADD_CORRECTIVE_ACTION, data);
  return response;
};

const updateCorrectiveAction = async (data) => {
  const response = await api.post(API_ENDPOINTS.SAFETY_OBSERVATION.UPDATE_CORRECTIVE_ACTION, data);
  return response;
};

const detailsCorrectiveAction = async (data) => {
  const response = await api.post(API_ENDPOINTS.SAFETY_OBSERVATION.DETAILS_CORRECTIVE_ACTION, data);
  return response;
};

const safetyObservationService = {
  searchSafety,
  createSafety,
  updateSafety,
  safetyDetails,
  addCorrectiveAction,
  updateCorrectiveAction,
  detailsCorrectiveAction
};

export default safetyObservationService;
