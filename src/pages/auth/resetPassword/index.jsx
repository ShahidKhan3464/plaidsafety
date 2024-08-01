import React, { useState } from 'react';
import * as Yup from 'yup';
import { Icons } from 'assets';
import { Formik } from 'formik';
import { FormControl } from 'utils';
import { customColors } from 'theme/pallete';
import CustomButton from 'components/button';
import { useDispatch, useSelector } from 'react-redux';
import StyledAuthWrapper from 'components/authWrapper';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, IconButton, InputAdornment } from '@mui/material';
import { resetPassword } from 'provider/features/auth/auth.slice';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const query = new URLSearchParams(location.search);
  const resetToken = query.get('token');
  const { isLoading } = useSelector((state) => state.auth.resetPassword);

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
    );
  };

  const handleSubmit = async (data) => {
    data.resetToken = resetToken;
    dispatch(
      resetPassword({
        data,
        successCallback: () => navigate('/login')
      })
    )
  };

  return (
    <StyledAuthWrapper className="reset-password">
      <h2 className='title'>Reset Password</h2>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={{ newPassword: '', confirmPassword: '' }}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit}>
              <div className="field-control" style={{ paddingBottom: '40px' }}>
                <InputPassword
                  formik={formik}
                  label="Password"
                  name="newPassword"
                  placeholder="Enter your password"
                />
              </div>
              <div className="field-control" style={{ paddingBottom: '16px' }}>
                <InputPassword
                  formik={formik}
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Enter your password"
                />
              </div>
              <Box
                sx={{
                  pt: 3,
                  gap: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '& >button': {
                    width: '100% !important'
                  },

                  '@media screen and (max-width: 520px)': {
                    pt: 1
                  }
                }}
              >
                <CustomButton
                  text="Done"
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
            </form>
          );
        }}
      </Formik>
    </StyledAuthWrapper>
  );
};

export default ResetPassword;

// Form validation schema using Yup
const validationSchema = Yup.object({
  newPassword: Yup.string()
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
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
});
