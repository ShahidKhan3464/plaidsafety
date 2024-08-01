import React from 'react';
import { Icons } from 'assets';
import { StyledDatePicker } from './style';
import { ErrorMessage, Field } from 'formik';
import ReactDatePicker from 'react-datepicker';
import { StyledFieldErrorMessage, StyledFormLabel } from 'styles/global';

/**
 * CustomDatePicker Component
 *
 * @param {string} label - The label text for the DatePicker.
 * @param {Date} selectedDate - The selected date value for the DatePicker.
 * @param {function} onChange - Callback function to handle date change.
 * @param {string} placeholder - Placeholder text for the DatePicker input.
 * @param {Object} rest - Additional props to be spread onto the ReactDatePicker element.
 *
 * @example
 * // Example usage of CustomDatePicker component
 * <CustomDatePicker
 *   label="Select a Date"
 *   selectedDate={new Date()}
 *   onChange={(date) => console.log('Selected date:', date)}
 *   placeholder="DD-MM-YYYY"
 *   minDate={new Date()}
 *   dateFormat="dd-MM-yyyy"
 *   showPopperArrow={false}
 * />
 */
const CustomDatePicker = ({
  name,
  label,
  formik,
  placeholder,
  selectedDate,
  ...rest
}) => {
  return (
    <React.Fragment>
      <StyledDatePicker error={formik.errors[name] && formik.touched[name]}>
        <StyledFormLabel>{label}</StyledFormLabel>
        <Field name={name}>
          {({ field }) => (
            <ReactDatePicker
              showIcon
              {...rest}
              {...field}
              minDate={new Date()}
              dateFormat="MM/dd/yyyy"
              showPopperArrow={false}
              selected={selectedDate}
              placeholderText={placeholder}
              icon={<img src={Icons.calendar} alt="calendar" />}
              onChange={(selectedDate) =>
                formik.setFieldValue(name, selectedDate)
              }
            />
          )}
        </Field>
      </StyledDatePicker>
      <ErrorMessage name={name} component={StyledFieldErrorMessage} />
    </React.Fragment>
  );
};

export default CustomDatePicker;
