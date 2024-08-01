import { styled } from '@mui/system';
import { customColors } from 'theme/pallete';
import { FormControl, RadioGroup } from '@mui/material';

export const StyledFormControl = styled(FormControl)((props) => ({
  gap: '10px',
  flexWrap: 'wrap',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',

  '& .MuiFormGroup-root': {
    gap: '24px',
    flexDirection: 'row',

    '> label': {
      margin: 0,

      '.MuiTypography-root': {
        fontSize: '16px',
        fontWeight: 500,
        marginLeft: '4px',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        lineHeight: 'normal',
        color: `${customColors.secondary}`
      }
    }
  }
}));

export const StyledRadioGroup = styled(RadioGroup)((props) => ({
  '& .MuiRadio-root': {
    padding: '0',
    color: '#d8d8d8'
  },
  '& .Mui-checked': {
    color: `${customColors.secondary} !important`
  }
}));
