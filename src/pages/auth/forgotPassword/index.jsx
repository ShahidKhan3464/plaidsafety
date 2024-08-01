import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Box } from '@mui/material';
import { FormControl } from 'utils';
import { customColors } from 'theme/pallete';
import CustomButton from 'components/button';
import { Link, useNavigate } from 'react-router-dom';
import StyledAuthWrapper from 'components/authWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from 'provider/features/auth/auth.slice';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth.forgotPassword);

  const handleSubmit = async (data) => {
    dispatch(
      forgotPassword({
        data,
        successCallback: () => navigate('/otp-verification', {
          state: {
            email: data?.email,
            verificationType: 'FORGOT_PASSWORD'
          }
        })
      })
    )
  };

  return (
    <StyledAuthWrapper className="forgot-password">
      <h2 className='title'>Forgot Password</h2>
      <p className='text'>
        Enter your email for the verification process, we will send 4 digits
        code to your email.
      </p>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit}>
              <div className="field-control" style={{ paddingBottom: '16px' }}>
                <FormControl
                  type="email"
                  name="email"
                  control="input"
                  formik={formik}
                  label="Email Address"
                  placeholder="Enter your email address"
                />
              </div>
              <Box
                sx={{
                  pt: 3,
                  gap: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '& > button': {
                    width: '100% !important'
                  },

                  '@media screen and (max-width: 520px)': {
                    pt: 1,
                  },
                }}
              >
                <CustomButton
                  text="Send"
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
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
                  Remember Password{' '}
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

export default ForgotPassword;

// Yup validation schema for the email field
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Please enter the required field')
});
