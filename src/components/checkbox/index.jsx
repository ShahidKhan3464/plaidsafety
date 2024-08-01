import React, { useEffect } from "react";
import { Field } from "formik";
import { customColors } from "theme/pallete";
import { Checkbox, FormControlLabel } from "@mui/material";

/**
 * CustomCheckbox Component
 *
 * @param {string} name - The name attribute of the checkbox.
 * @param {string} label - The label text for the checkbox.
 * @param {Object} formik - Formik props for handling form state.
 * @param {string} color - Color for the Checkbox (default is customColors.secondary).
 * @returns {JSX.Element} CustomCheckbox component.
 *
 * @example
 * // Example usage of CustomCheckbox component
 * <CustomCheckbox
 *   name="agree"
 *   label="I agree to the terms and conditions"
 *   formik={formik}
 *   color="#3498db"
 * />
 */
const CustomCheckbox = ({
  name,
  label,
  formik,
  color = customColors.secondary,
  ...rest
}) => {
  return (
    <React.Fragment>
      <Field name={name}>
        {({ field }) => (
          <FormControlLabel
            {...field}
            name={name}
            label={label}
            sx={{
              margin: "0",
              color: customColors.text,
              ".MuiFormControlLabel-label": {
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "100%",
                fontStyle: "normal",
                fontFamily: "Inter",
                "@media screen and (max-width: 520px)": {
                  fontSize: "14px",
                },
              },
            }}
            control={
              <Checkbox
                {...rest}
                onChange={(e) => {
                  formik.setFieldValue(name, e.target.checked);
                }}
                classes={{ checked: "checked" }}
                sx={{
                  mr: 1,
                  width: "16px",
                  height: "16px",
                  "& .MuiSvgIcon-root": {
                    color: { color },
                  },
                }}
              />
            }
          />
        )}
      </Field>
    </React.Fragment>
  );
};

export default CustomCheckbox;
