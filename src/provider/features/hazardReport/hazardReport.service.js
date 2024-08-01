import { API_ENDPOINTS } from 'constants/endPoints';
import ApiClient from 'services/api';
const api = new ApiClient();

const searchReport = async (data) => {
  const response = await api.post(API_ENDPOINTS.HAZARD_REPORT.SEARCH, data);
  return response;
};

const createReport = async (data) => {
  const response = await api.post(API_ENDPOINTS.HAZARD_REPORT.CREATE, data);
  return response;
};

const reportDetails = async (id) => {
  const response = await api.get(`${API_ENDPOINTS.HAZARD_REPORT.DETAILS}/${id}`);
  return response;
};

const updateReport = async (id, data) => {
  const response = await api.post(`${API_ENDPOINTS.HAZARD_REPORT.UPDATE}?id=${id}`, data);
  return response;
};

const addCorrectiveAction = async (data) => {
  const response = await api.post(API_ENDPOINTS.HAZARD_REPORT.ADD_CORRECTIVE_ACTION, data);
  return response;
};

const updateCorrectiveAction = async (data) => {
  const response = await api.post(API_ENDPOINTS.HAZARD_REPORT.UPDATE_CORRECTIVE_ACTION, data);
  return response;
};

const detailsCorrectiveAction = async (data) => {
  const response = await api.post(API_ENDPOINTS.HAZARD_REPORT.DETAILS_CORRECTIVE_ACTION, data);
  return response;
};

const hazardReportService = {
  searchReport,
  createReport,
  updateReport,
  reportDetails,
  addCorrectiveAction,
  updateCorrectiveAction,
  detailsCorrectiveAction
};

export default hazardReportService;
