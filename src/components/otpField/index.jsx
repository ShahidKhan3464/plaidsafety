import React from 'react';
import { customColors } from 'theme/pallete';
import { StyledFormLabel } from 'styles/global';
import { MuiOtpInput } from 'mui-one-time-password-input';

const OTPVerification = ({
  rest,
  label,
  value,
  field,
  onChange,
  disabled = false
}) => {

  return (
    <React.Fragment>
      {label && <StyledFormLabel>{label}</StyledFormLabel>}
      <MuiOtpInput
        gap="20px"
        {...rest}
        length={4}
        {...field}
        value={value}
        onChange={onChange}
        autoFocus={!disabled}
        TextFieldsProps={{
          size: 'small',
          placeholder: '0',
          sx: {
            '& .MuiInputBase-root': {
              height: '47px',
              maxWidth: '42px',
              borderRadius: '0px',
              background: customColors.white,
              borderBottom: '2px solid #1A1A1A',

              '& input': {
                padding: 0,
                height: '100%',
                fontWeight: 500,
                fontSize: '30px',
                lineHeight: '60px',
                fontStyle: 'normal',
                fontFamily: 'Inter',
                color: `${customColors.secondary}`
              },

              '& fieldset': {
                display: 'none'
              }
            }
          }
        }}
      />
    </React.Fragment>
  );
};

export default OTPVerification;
