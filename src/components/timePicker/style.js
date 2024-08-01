import { styled } from '@mui/system';
import { customColors } from 'theme/pallete';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

export const StyledLabel = styled('label')({
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '100%',
  fontStyle: 'normal',
  fontFamily: 'Inter',
  color: `${customColors.black} !important`,

  '@media screen and (max-width: 520px)': {
    fontSize: '14px'
  }
});

export const StyledMobileTimePicker = styled(MobileTimePicker)(({ error }) => ({
  '& .MuiInputBase-root': {
    borderRadius: '8px',
    border: `1px solid ${error ? '#f26464' : '#B8D6BF'}`,

    '& input': {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '24px',
      borderRadius: '8px',
      fontFamily: 'Inter',
      fontStyle: 'normal',
      padding: '15.5px 16px',
      color: customColors.text,

      '@media screen and (max-width: 520px)': {
        padding: '10px',
        fontSize: '14px'
      }
    },

    '& fieldset': {
      display: 'none'
    }
  }
}));
