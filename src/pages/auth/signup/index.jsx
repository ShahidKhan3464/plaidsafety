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
import { signup } from 'provider/features/auth/auth.slice';
import { Box, IconButton, InputAdornment } from '@mui/material';
import { industry, companySize, states } from 'constants/dropdownValues';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth.signup);

  // Initial form values
  const initialValues = {
    firstName: '',
    lastName: '',
    phoneNo: '',
    email: '',
    industry: '',
    tenantName: '',
    sizeOfCompany: '',
    password: '',
    address: '',
    address2: '',
    state: '',
    zipCode: '',
    confirmPassword: '',
    termsPolicy: false
  };

  // Component for rendering password input field
  const InputPassword = ({ name, label, formik, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <FormControl
        name={name}
        label={label}
        control="input"
        formik={formik}
        placeholder={placeholder}
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
                    top: '4px'
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
    );
  };

  const handleSubmit = async (data) => {
    dispatch(
      signup({
        data,
        successCallback: () => navigate('/otp-verification', {
          state: {
            email: data?.email,
            verificationType: 'EMAIL_VERIFICATION'
          }
        }),
      })
    )
  };

  return (
    <StyledAuthWrapper className="signup">
      <h2 className='title'>Get Started</h2>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  pb: 2,
                  gap: 3,
                  display: 'flex',
                  alignItems: 'center',
                  '@media screen and (max-width: 520px)': {
                    pb: 1,
                    gap: 2,
                    flexWrap: 'wrap'
                  },
                  '> div': {
                    width: '100%'
                  },
                }}
              >
                <div className="field-control">
                  <FormControl
                    type="text"
                    control="input"
                    formik={formik}
                    name="firstName"
                    label="First Name"
                    placeholder="Enter first name"
                  />
                </div>
                <div className="field-control">
                  <FormControl
                    type="text"
                    control="input"
                    formik={formik}
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter last name"
                  />
                </div>
              </Box>

              <Box
                sx={{
                  pb: 2,
                  gap: 3,
                  display: 'flex',
                  alignItems: 'center',
                  '@media screen and (max-width: 520px)': {
                    pb: 1,
                    gap: 2,
                    flexWrap: 'wrap'
                  },
                  '> div': {
                    width: '100%'
                  }
                }}
              >
                <div className="field-control">
                  <FormControl
                    type="number"
                    name="phoneNo"
                    control="input"
                    formik={formik}
                    label="Phone Number"
                    placeholder="Enter phone no"
                  />
                </div>
                <div className="field-control">
                  <FormControl
                    name="industry"
                    control="select"
                    formik={formik}
                    label="Industry"
                    options={industry}
                    placeholder="Select one"
                    value={formik.values.industry}
                  />
                </div>
              </Box>

              <Box
                sx={{
                  pb: 2,
                  gap: 3,
                  display: 'flex',
                  alignItems: 'center',
                  '@media screen and (max-width: 520px)': {
                    pb: 1,
                    gap: 2,
                    flexWrap: 'wrap'
                  },
                  '> div': {
                    width: '100%'
                  }
                }}
              >
                <div className="field-control">
                  <FormControl
                    type="text"
                    control="input"
                    formik={formik}
                    label="Company"
                    name="tenantName"
                    placeholder="Enter company name"
                  />
                </div>
                <div className="field-control">
                  <FormControl
                    formik={formik}
                    control="select"
                    label="Company Size"
                    name="sizeOfCompany"
                    options={companySize}
                    placeholder="Select one"
                    value={formik.values.sizeOfCompany}
                  />
                </div>
              </Box>

              <Box
                sx={{
                  pb: 2,
                  gap: 3,
                  display: 'flex',
                  alignItems: 'center',
                  '@media screen and (max-width: 520px)': {
                    pb: 1,
                    gap: 2,
                    flexWrap: 'wrap'
                  },
                  '> div': {
                    width: '100%'
                  }
                }}
              >
                <div className="field-control">
                  <FormControl
                    type="text"
                    name="address"
                    control="input"
                    formik={formik}
                    label="Address"
                    placeholder="Enter address"
                  />
                </div>
                <div className="field-control">
                  <FormControl
                    type="text"
                    name="address2"
                    control="input"
                    formik={formik}
                    label="Address Line 2"
                    placeholder="Enter address"
                  />
                </div>
              </Box>

              <Box
                sx={{
                  pb: 2,
                  gap: 3,
                  display: 'flex',
                  alignItems: 'center',
                  '@media screen and (max-width: 520px)': {
                    pb: 1,
                    gap: 2,
                    flexWrap: 'wrap'
                  },
                  '> div': {
                    width: '100%'
                  }
                }}
              >
                <div className="field-control">
                  <FormControl
                    name="state"
                    label="State"
                    control="select"
                    formik={formik}
                    options={states}
                    placeholder="Select one"
                    value={formik.values.state}
                  />
                </div>
                <div className="field-control">
                  <FormControl
                    type="text"
                    name="zipCode"
                    control="input"
                    formik={formik}
                    label="Zip Code"
                    placeholder="Enter zip code"
                  />
                </div>
              </Box>

              <Box
                sx={{
                  pb: 2,
                  gap: 3,
                  display: 'flex',
                  alignItems: 'center',
                  '@media screen and (max-width: 520px)': {
                    pb: 1,
                    gap: 2,
                    flexWrap: 'wrap'
                  },
                  '> div': {
                    width: '100%'
                  }
                }}
              >
                <div className="field-control">
                  <FormControl
                    type="email"
                    name="email"
                    label="Email"
                    control="input"
                    formik={formik}
                    placeholder="Enter your email address"
                  />
                </div>

              </Box>

              <Box
                sx={{
                  pb: 2,
                  gap: 3,
                  display: 'flex',
                  alignItems: 'center',
                  '@media screen and (max-width: 520px)': {
                    pb: 5,
                    gap: 2,
                    flexWrap: 'wrap'
                  },
                  '> div': {
                    width: '100%'
                  }
                }}
              >
                <div className="field-control">
                  <InputPassword
                    name="password"
                    formik={formik}
                    label="Password"
                    placeholder="Enter your password"
                  />
                </div>

              </Box>

              <Box
                sx={{
                  pb: 2,
                  gap: 3,
                  display: 'flex',
                  alignItems: 'center',
                  '@media screen and (max-width: 520px)': {
                    gap: 2,
                    flexWrap: 'wrap'
                  },
                  '> div': {
                    width: '100%'
                  }
                }}
              >
                <div className="field-control">
                  <InputPassword
                    formik={formik}
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Enter your password"
                  />
                </div>
              </Box>

              <Box
                sx={{
                  pb: 5,
                  '@media screen and (max-width: 520px)': {
                    pb: 2
                  }
                }}
              >
                <FormControl
                  formik={formik}
                  name="termsPolicy"
                  control="checkbox"
                  checked={formik.values.termsPolicy}
                  label={
                    <span>
                      I agrees to the{' '}
                      <Link
                        target="_blank"
                        to="/privacyPolicy"
                        style={{ color: '#0182FC' }}
                      >
                        privacy policy
                      </Link>{' '}
                      and the{' '}
                      <Link
                        target="_blank"
                        to="/termsOfUse"
                        style={{ color: '#0182FC' }}
                      >
                        term of use agreements
                      </Link>{' '}
                    </span>
                  }
                />
              </Box>

              <Box
                sx={{
                  '& > button': {
                    width: '100% !important'
                  }
                }}
              >
                <CustomButton
                  text="Sign Up"
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading || !formik.values.termsPolicy}
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

export default SignUp;

// Form validation schema using Yup
const validationSchema = Yup.object({
  state: Yup.string().required('Please enter the required field'),
  phoneNo: Yup.string().required('Please enter the required field'),
  address: Yup.string().required('Please enter the required field'),
  zipCode: Yup.string().required('Please enter the required field'),
  industry: Yup.string().required('Please enter the required field'),
  lastName: Yup.string().required('Please enter the required field'),
  firstName: Yup.string().required('Please enter the required field'),
  tenantName: Yup.string().required('Please enter the required field'),
  sizeOfCompany: Yup.string().required('Please enter the required field'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Please enter the required field'),
  password: Yup.string()
    .required('Please enter the required field')
    .min(8, 'Password must be at least 8 characters long')
    .max(20, 'Password must not be longer than 20 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d!@#$%^&*])[A-Za-z\d!@#$%^&*\s]*$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and either a number or a punctuation character'
    )
    .matches(
      /^[^\s]*$/,
      'Password must not contain spaces or unicode characters'
    ),
  confirmPassword: Yup.string()
    .required('Please enter the required field')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
