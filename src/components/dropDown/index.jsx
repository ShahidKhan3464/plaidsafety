import React, { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import { StyledButton } from './style';
import { customColors } from 'theme/pallete';
import MenuItem from '@mui/material/MenuItem';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/**
 * CustomFilterDropdown Component
 *
 * @param {string} name - The name of the filter.
 * @param {Array} options - An array of options for the filter dropdown.
 * @param {string} value - The value for the filter.
 * @param {function} handleFilterChange - Callback function to handle filter changes.
 *
 * @example
 * // Example usage of CustomFilterDropdown component
 * <CustomFilterDropdown
 *   name="category"
 *   options={[
 *     { value: 'electronics', text: 'Electronics' },
 *     { value: 'clothing', text: 'Clothing' },
 *     // ... other options
 *   ]}
 *   value="All Categories"
 *   handleFilterChange={(name, value) => console.log(`Filter ${name} changed to ${value}`)}
 * />
 */
const CustomFilterDropdown = ({
  name,
  options,
  endIcon,
  defaultValue,
  handleFilterChange,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSelect, setIsSelect] = useState(false);
  const [initialValue, setInitialValue] = useState(defaultValue);
  const open = Boolean(anchorEl);

  const handleMenuItem = (value, text) => {
    setIsSelect(true);
    setAnchorEl(null);
    setInitialValue(text);
    handleFilterChange(name, value);
  };

  const handleClearFilter = (e) => {
    setIsSelect(false);
    e.stopPropagation();
    handleFilterChange(name, "");
    setInitialValue(defaultValue);
  };

  useEffect(() => {
    if (defaultValue) {
      setInitialValue(defaultValue)
    }
  }, [defaultValue])

  return (
    <React.Fragment>
      <StyledButton
        selected={isSelect}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        aria-controls={open ? "demo-customized-menu" : undefined}
        endIcon={
          endIcon ? (
            endIcon
          ) : !isSelect ? (
            <KeyboardArrowDownIcon />
          ) : (
            <ClearIcon
              sx={{ fontSize: "18px !important" }}
              onClick={(e) => handleClearFilter(e)}
            />
          )
        }
      >
        {initialValue}
      </StyledButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            borderRadius: "8px",
            color: customColors.black,
            background: customColors.white,
            boxShadow: "0px 3px 10px 0px rgba(51, 48, 48, 0.15)",
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => handleMenuItem(option.value, option.text)}
            sx={{
              fontSize: "13px",
              fontWeight: "500",
              fontStyle: "normal",
              borderBottom: "none",
              lineHeight: "normal",
              fontFamily: "DM Sans !important",

              '@media screen and (max-width: 520px)': {
                minHeight: '35px'
              }
            }}
          >
            <span>{option.text}</span>
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};

export default CustomFilterDropdown;
