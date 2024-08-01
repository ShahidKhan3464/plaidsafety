import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { customColors } from 'theme/pallete';

export const StyledButton = styled(Button)((props) => ({
  padding: '0',
  lineHeight: '100%',
  boxShadow: 'unset',
  borderRadius: '6px',
  fontStyle: 'normal',
  fontFamily: 'Inter',
  textTransform: 'capitalize',
  color: `${props.isOutlined ? props.tColor : customColors.white}`,
  border: `${props.isOutlined ? `1px solid ${props.borderColor}` : 'none'}`,
  '&:hover': {
    border: `${props.isOutlined ? `1px solid ${props.borderColor}` : 'none'}`
  },
  '&:disabled': {
    color: customColors.white,
    backgroundColor: customColors.lighter
  },

  '@media screen and (max-width: 520px)': {
    height: '36px',
    fontSize: '14px',

    '.MuiButton-startIcon svg': {
      fontSize: '18px'
    }
  }
}));
