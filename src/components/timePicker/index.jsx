import React, { useEffect, useRef } from 'react';
import { ErrorMessage, Field } from 'formik';
import { StyledFieldErrorMessage } from 'styles/global';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { StyledLabel, StyledMobileTimePicker } from './style';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

/**
 * MobileTimePicker component for selecting time.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.label - The label for the time picker.
 * @param {function} props.onChange - Callback function triggered on time selection change.
 * @param {string} props.placeholder - Placeholder text for the input field.

 *
 * @example
 * // Example usage of the MobileTimePicker component
 * <Timer label="Select Time" onChange={(newTime) => handleTimeChange(newTime)} />
 */

const Timer = ({ name, value, label, formik, placeholder, ...rest }) => {
  const timePickerRef = useRef(null);
  const isValue = value === 'Invalid Date';

  useEffect(() => {
    if (timePickerRef.current) {
      timePickerRef.current.querySelector('input').placeholder = placeholder;
    }
  }, [placeholder]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['MobileTimePicker']}>
        <DemoItem>
          <StyledLabel>{label}</StyledLabel>
          <Field name={name}>
            {({ field }) => (
              <StyledMobileTimePicker
                {...rest}
                ref={timePickerRef}
                value={!isValue ? value : null}
                error={formik.errors[name] && formik.touched[name]}
                onChange={(newTime) => {
                  if (newTime) {
                    formik.setFieldValue(name, newTime);
                  }
                }}
              />
            )}
          </Field>
        </DemoItem>
      </DemoContainer>
      <ErrorMessage name={name} component={StyledFieldErrorMessage} />
    </LocalizationProvider>
  );
};

export default Timer;
