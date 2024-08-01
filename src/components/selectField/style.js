import { styled } from '@mui/system';
import { Select } from '@mui/material';
import { customColors } from 'theme/pallete';

export const StyledSelectField = styled(Select)((props) => ({
  '& .MuiSelect-select': {
    padding: '0 !important'
  },
  '&.MuiOutlinedInput-root': {
    fontWeight: 400,
    padding: '15px',
    fontSize: '16px',
    marginTop: '8px',
    lineHeight: '24px',
    borderRadius: '8px',
    fontStyle: 'normal',
    fontFamily: 'Inter',
    textTransform: 'capitalize',
    color: `${customColors.text}`,
    background: `${customColors.white}`,
    border: `1px solid ${props.error ? '#f26464' : '#CCD8D6'}`,

    '@media screen and (max-width: 520px)': {
      padding: '9px',
      fontSize: '14px',
    },

    '& fieldset': {
      display: 'none'
    },

    '& svg': {
      color: '#888888'
    }
  },
  '& .MuiSelect-select:not([multiple])': {
    '& em': {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '24px',
      fontStyle: 'normal',
      fontFamily: 'Inter',
      color: `${customColors.lightGrey}`,

      '@media screen and (max-width: 520px)': {
        fontSize: '14px'
      }
    }
  }
}));
