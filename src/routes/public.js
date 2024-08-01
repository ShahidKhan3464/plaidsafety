import { lazy } from 'react';

// Importing lazy-loaded components for different pages
import TermsOfUse from 'pages/termsOfUse';
import PrivacyPolicy from 'pages/privacyPolicy';
const Login = lazy(() => import('pages/auth/login'));
const SignUp = lazy(() => import('pages/auth/signup'));
const Payment = lazy(() => import("pages/auth/paymentMethod"));
const ResetPassword = lazy(() => import('pages/auth/resetPassword'));
const ForgotPassword = lazy(() => import('pages/auth/forgotPassword'));
const AccountRecovery = lazy(() => import('pages/auth/accountRecovery'));
const OtpVerification = lazy(() => import('pages/auth/otpVerification'));
const SubscriptionFailed = lazy(() => import('pages/auth/subscriptionFailed'));
const SubscriptionPackage = lazy(() => import('pages/auth/subscriptionPackage'));
const SubscriptionSuccessful = lazy(() => import('pages/auth/subscriptionSuccessful'));

// Array of public routes
export const publicRoutes = [
  {
    layout: null,
    name: "Login",
    path: "/login",
    permission: [],
    component: Login,
  },
  {
    layout: null,
    name: "SignUp",
    permission: [],
    path: "/sign-up",
    component: SignUp,
  },
  {
    layout: null,
    permission: [],
    name: "Forgot-password",
    path: "/forgot-password",
    component: ForgotPassword,
  },
  {
    layout: null,
    permission: [],
    name: "Reset-password",
    path: "/reset-password",
    component: ResetPassword,
  },
  {
    layout: null,
    permission: [],
    name: "Account-recovery",
    path: "/account-recovery",
    component: AccountRecovery,
  },
  {
    layout: null,
    permission: [],
    name: "OTP-verification",
    path: "/otp-verification",
    component: OtpVerification,
  },
  {
    layout: null,
    permission: [],
    name: "TermsOfUse",
    path: "/termsOfUse",
    component: TermsOfUse,
  },
  {
    layout: null,
    permission: [],
    name: "Payment",
    path: "/payment",
    component: Payment,
  },
  {
    layout: null,
    permission: [],
    name: "PrivacyPolicy",
    path: "/privacyPolicy",
    component: PrivacyPolicy,
  },
  {
    layout: null,
    permission: [],
    name: "Payment",
    path: "/payment",
    component: Payment,
  },
  {
    layout: null,
    permission: [],
    name: "SubscriptionPackage",
    path: "/subscriptionPackage",
    component: SubscriptionPackage,
  },
  {
    layout: null,
    permission: [],
    name: "SubscriptionSuccessful",
    path: "/subscription-successful",
    component: SubscriptionSuccessful,
  },
  {
    layout: null,
    permission: [],
    name: "SubscriptionFailed",
    path: "/subscription-failed",
    component: SubscriptionFailed,
  },
];
