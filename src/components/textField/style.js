import { styled } from '@mui/system';
import { customColors } from 'theme/pallete';
import TextField from '@mui/material/TextField';

export const StyledInputField = styled(TextField)((props) => ({
  '& .MuiOutlinedInput-input': {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    fontFamily: 'Inter',
    borderRadius: '8px',
    fontStyle: 'normal',
    padding: '15.5px 16px',
    color: `${customColors.text}`,
    background: `${customColors.white}`,
    border: `1px solid ${props.error ? '#f26464' : '#B8D6BF'}`,
    '@media screen and (max-width: 520px)': {
      padding: '10px',
      fontSize: '14px'
    },

    '&::placeholder': {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '24px',
      fontStyle: 'normal',
      fontFamily: 'Inter',
      color: `${customColors.lightGrey} !important`,

      '@media screen and (max-width: 520px)': {
        fontSize: '14px'
      }
    }
  },
  '& .MuiOutlinedInput-root': {
    padding: 0,
    marginTop: '8px',

    '& fieldset': {
      display: 'none'
    }
  },
  '& .Mui-disabled': {
    background: '#F7F7F7',
    pointerEvents: 'none'
  },
  '& .MuiOutlinedInput-input[type="number"]::-webkit-inner-spin-button, & .MuiOutlinedInput-input[type="number"]::-webkit-outer-spin-button':
  {
    margin: 0,
    '-webkit-appearance': 'none'
  },
  '& .MuiOutlinedInput-input[type="number"]': {
    inputMode: 'numeric',
    '-moz-appearance': 'textfield'
  }
}));
