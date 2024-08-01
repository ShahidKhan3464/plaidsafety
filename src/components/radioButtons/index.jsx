import React from 'react';
import { Field } from 'formik';
import { StyledFormLabel } from 'styles/global';
import { Radio, FormControlLabel } from '@mui/material';
import { StyledFormControl, StyledRadioGroup } from './style';

const RadioButtons = ({ name, label, formik, options, ...rest }) => {
  return (
    <StyledFormControl>
      <StyledFormLabel id="radios">{label}</StyledFormLabel>
      <Field name={name}>
        {({ field }) => (
          <StyledRadioGroup
            {...rest}
            {...field}
            name={name}
            aria-label={label}
            onChange={(e) => formik.setFieldValue(name, e.target.value)}
          >
            {options.map((option, index) => (
              <FormControlLabel
                key={index}
                control={<Radio />}
                value={option.value}
                label={option.label}
              />
            ))}
          </StyledRadioGroup>
        )}
      </Field>
    </StyledFormControl>
  );
};

export default RadioButtons;
