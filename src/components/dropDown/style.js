import styled from 'styled-components';
import Button from '@mui/material/Button';
import { customColors } from 'theme/pallete';

export const StyledButton = styled(Button)(({ selected }) => ({
  fontStyle: 'normal',
  fontSize: '16px !important',
  fontWeight: '400 !important',
  lineHeight: '24px !important',
  borderRadius: '4px !important',
  padding: '5px 10px !important',
  textTransform: 'none !important',
  fontFamily: 'DM Sans !important',
  color: `${selected ? customColors.black : '#999'} !important`,
  border: `1px solid ${selected ? customColors.black : '#999'} !important`,

  '.MuiButton-endIcon': {
    marginLeft: '4px'
  },

  '@media screen and (max-width: 520px)': {
    fontSize: '14px !important'
  }
}));
