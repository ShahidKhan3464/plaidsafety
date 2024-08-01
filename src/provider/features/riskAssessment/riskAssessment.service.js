import { API_ENDPOINTS } from 'constants/endPoints';
import ApiClient from 'services/api';
const api = new ApiClient();

const searchRisk = async (data) => {
    const response = await api.post(API_ENDPOINTS.SAFETY_OBSERVATION.FILTER, data);
    return response;
};

const createRisk = async (data) => {
    const response = await api.post(API_ENDPOINTS.SAFETY_OBSERVATION.CREATE, data);
    return response;
};

const riskDetails = async (id) => {
    const response = await api.get(`${API_ENDPOINTS.SAFETY_OBSERVATION.DETAILS}/${id}`);
    return response;
};

const updateRisk = async (id, data) => {
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

const riskAssessmentService = {
    searchRisk,
    createRisk,
    updateRisk,
    riskDetails,
    addCorrectiveAction,
    updateCorrectiveAction,
    detailsCorrectiveAction
};

export default riskAssessmentService;
