import React from 'react';
import { Box } from '@mui/material';
import OTPField from 'components/otpField';
import { enqueueSnackbar } from 'notistack';
import { customColors } from 'theme/pallete';
import CustomButton from 'components/button';
import { Formik, Field, ErrorMessage } from 'formik';
import StyledAuthWrapper from 'components/authWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { StyledFieldErrorMessage } from 'styles/global';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { otpVerification, resendOtp } from 'provider/features/auth/auth.slice';

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const email = location?.state?.email;
  const verificationType = location?.state?.verificationType;
  const { isLoading } = useSelector((state) => state.auth.otpVerification);

  const successCallback = (data) => {
    if (verificationType === "FORGOT_PASSWORD") {
      const redirectUrl = data?.data?.redirectUrl;
      navigate(redirectUrl);
    } else if (verificationType === "EMAIL_VERIFICATION") {
      // const user = data.data.user;
      // const auth_token = data.data.accessToken;
      enqueueSnackbar(data.message, { variant: "success" });
      // localStorage.setItem('user', JSON.stringify(user));
      // localStorage.setItem('auth_token', JSON.stringify(auth_token));
      navigate("/subscriptionPackage", {
        state: { userId: data?.data?.user?.userId },
      });
    }
  };

  const handleSubmit = async (data) => {
    data.email = email;
    data.verificationType = verificationType;
    dispatch(
      otpVerification({
        data,
        successCallback,
      })
    );
  };

  const handleResendOtp = async () => {
    const data = { email };
    dispatch(resendOtp({ data }));
  };

  return (
    <StyledAuthWrapper className="otp-verification">
      <h2 className="title">OTP Code</h2>
      <p
        className='text'
        style={{ margin: 'auto', maxWidth: '453px' }}
      >
        A 4 digit OTP Code has been send to your email given by you
      </p>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{ otpCode: '' }}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit}>
              <div className="field-control">
                <Field name="otp">
                  {({ field }) => (
                    <React.Fragment>
                      <OTPField
                        label=""
                        field={{ ...field }}
                        value={formik.values.otpCode}
                        error={formik.errors.otpCode && formik.touched.otpCode}
                        onChange={(value) =>
                          formik.setFieldValue('otpCode', value)
                        }
                      />
                      <ErrorMessage
                        name={field.name}
                        component={StyledFieldErrorMessage}
                      />
                    </React.Fragment>
                  )}
                </Field>
              </div>

              <Box
                sx={{
                  pt: 5,
                  pb: 5,
                  '@media screen and (max-width: 520px)': {
                    pt: 3,
                    pb: 3
                  }
                }}
              >
                <span
                  onClick={handleResendOtp}
                  style={{
                    fontWeight: 600,
                    display: 'block',
                    color: '#3068C8',
                    fontSize: '16px',
                    cursor: 'pointer',
                    lineHeight: '26px',
                    textAlign: 'center',
                    fontStyle: 'normal',
                    fontFamily: 'Inter',
                    textDecorationLine: 'underline'
                  }}
                >
                  Resend OTP
                </span>
              </Box>

              <Box
                sx={{
                  '& > button': {
                    width: '100% !important'
                  },
                }}
              >
                <CustomButton
                  text="Next"
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading || !formik.values.otpCode}
                  sxProps={{
                    height: '52px',
                    fontWeight: 600,
                    fontSize: '16px',
                    bg: customColors.secondary
                  }}
                />
              </Box>

              <Box
                sx={{
                  pt: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '@media screen and (max-width: 520px)': {
                    pt: 2
                  }
                }}
              >
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '26px',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    color: customColors.text
                  }}
                >
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    style={{
                      fontWeight: 600,
                      color: '#3068C8',
                      textDecorationLine: 'none'
                    }}
                  >
                    Sign in
                  </Link>
                </span>
              </Box>
            </form>
          );
        }}
      </Formik>
    </StyledAuthWrapper>
  );
};

export default OtpVerification;
