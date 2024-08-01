export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: "/auth/signin",
    SIGN_UP: "/auth/signup",
    RESEND_OTP: "/auth/send-otp",
    VERIFY_OTP: "/auth/verify-otp",
    RESET_PASSWORD: "/auth/reset-password",
    FORGOT_PASSWORD: "/auth/forgot-password",
  },
  HAZARD_REPORT: {
    CREATE: "/hazard-report",
    DETAILS: "/hazard-report",
    SEARCH: "/hazard-report/search",
    UPDATE: "/hazard-report/update",
    ADD_CORRECTIVE_ACTION: '/hazard-report/corrective-action',
    DETAILS_CORRECTIVE_ACTION: '/hazard-report/corrective-action/id',
    UPDATE_CORRECTIVE_ACTION: '/hazard-report/corrective-action/update',
  },
  SAFETY_OBSERVATION: {
    CREATE: "/safety-observation-report",
    UPDATE: "/safety-observation-report",
    DETAILS: "/safety-observation-report",
    FILTER: "/safety-observation-report/filter",
    ADD_CORRECTIVE_ACTION: '/safety-observation-report/corrective-action',
    DETAILS_CORRECTIVE_ACTION: '/safety-observation-report/corrective-action/id',
    UPDATE_CORRECTIVE_ACTION: '/safety-observation-report/corrective-action/update',
  },
  FILE: {
    UPLOAD: '/upload/multiple'
  }
};
