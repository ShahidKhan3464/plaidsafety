import React, { useState } from 'react';
import * as Yup from 'yup';
import { Icons } from 'assets';
import { Formik } from 'formik';
import { FormControl } from 'utils';
import { customColors } from 'theme/pallete';
import CustomButton from 'components/button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StyledAuthWrapper from 'components/authWrapper';
import { login } from 'provider/features/auth/auth.slice';
import { Box, IconButton, InputAdornment } from '@mui/material';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading } = useSelector((state) => state.auth.login);

  // Initial form values
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const handleSubmit = async (data) => {
    dispatch(
      login({
        data,
        successCallback: () => navigate("/dashboard"),
        errCallback: (data) => {
          if (!data.isEmailVerified) {
            navigate("/otp-verification", {
              state: {
                email: data.email,
                verificationType: "EMAIL_VERIFICATION",
              },
            });
          } else if (data.tenant.subscriptionStatus !== "active") {
            navigate("/subscriptionPackage", {
              state: { userId: data?.userId },
            });
          }
        },
      })
    );
  };

  return (
    <StyledAuthWrapper className='login'>
      <h2 className='title'>Sign In</h2>
      <p className='text'>
        Welcome! Please enter your details.
      </p>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
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
                  placeholder="Enter your email"
                />
              </div>
              <div className="field-control" style={{ paddingBottom: '50px' }}>
                <FormControl
                  name="password"
                  control="input"
                  formik={formik}
                  label="Password"
                  placeholder="Enter your password"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ margin: 0 }}>
                        <IconButton
                          edge="end"
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          sx={{
                            top: '8px',
                            right: '15px',
                            position: 'absolute',
                            '@media screen and (max-width: 520px)': {
                              top: '1px'
                            },
                          }}
                        >
                          <img
                            src={showPassword ? Icons.eyeOn : Icons.eyeOff} alt='toggle-password'
                          />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <Box
                sx={{
                  pb: 4,
                  gap: 1,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',

                  '@media screen and (max-width: 520px)': {
                    pb: 3
                  }
                }}
              >
                <FormControl
                  formik={formik}
                  name="rememberMe"
                  control="checkbox"
                  label="Remember me"
                  checked={formik.values.rememberMe}
                />
                <Link
                  to="/forgot-password"
                  style={{
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '100%',
                    fontStyle: 'normal',
                    fontFamily: 'Inter',
                    color: customColors.secondary,
                    textDecorationLine: 'underline'
                  }}
                >
                  Forgot password?
                </Link>
              </Box>
              <Box
                sx={{
                  '& >button': {
                    width: '100% !important'
                  }
                }}
              >
                <CustomButton
                  text="Login"
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
                    lineHeight: '100%',
                    fontFamily: 'Inter',
                    fontStyle: 'normal',
                    color: customColors.text
                  }}
                >
                  Don’t have an account?{' '}
                  <Link
                    to="/sign-up"
                    style={{
                      fontWeight: 500,
                      color: '#1972F9',
                      textDecorationLine: 'underline'
                    }}
                  >
                    Sign up
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

// Form validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Please enter the required field"),
  password: Yup.string()
    .required("Please enter the required field")
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must not be longer than 20 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d!@#$%^&*])[A-Za-z\d!@#$%^&*\s]*$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and either a number or a punctuation character"
    )
    .matches(
      /^[^\s]*$/,
      "Password must not contain spaces or unicode characters"
    ),
});
