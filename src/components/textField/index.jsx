import React from 'react';
import { StyledInputField } from './style';
import { ErrorMessage, Field } from 'formik';
import { StyledFieldErrorMessage, StyledFormLabel, StyledSubLabel } from 'styles/global';

/**
 * TextField component for rendering a styled text input field.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.name - The name attribute for the input field.
 * @param {string} props.label - The label for the input field.
 * @param {Object} props.formik - Formik props for handling form state.
 * @param {boolean} props.disabled - Whether the input field is disabled.
 * @param {Object} props.rest - Additional props to pass to the StyledInputField component.
 *
 * @example
 * // Example usage of TextField component within a Formik form
 * <TextField
 *   name="username"
 *   label="Username"
 *   formik={formikProps}
 *   disabled={false}
 *   placeholder="Enter your username"
 * />
 */

const TextField = ({ name, label, sublabel, formik, disabled = false, ...rest }) => {
  return (
    <React.Fragment>
      <StyledFormLabel>{label}</StyledFormLabel>
      {sublabel && <StyledSubLabel>{sublabel}</StyledSubLabel>}
      <Field name={name}>
        {({ field }) => (
          <StyledInputField
            fullWidth
            {...rest}
            {...field}
            variant="outlined"
            disabled={disabled}
            error={formik.errors[name] && formik.touched[name]}
          />
        )}
      </Field>
      <ErrorMessage name={name} component={StyledFieldErrorMessage} />
    </React.Fragment>
  );
};

export default TextField;
