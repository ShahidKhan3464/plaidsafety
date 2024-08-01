import MuiAppBar from '@mui/material/AppBar';
import { customColors } from 'theme/pallete';
import { styled } from '@mui/material/styles';
import { Button, Toolbar } from '@mui/material';

export const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: 1201,
  color: 'black',
  background: customColors.secondary,
  boxShadow: '0px 0px 16px 0px rgba(0, 0, 0, 0.08)'
}));

export const StyledToolbar = styled(Toolbar)(() => ({
  padding: '0 60px !important',
  minHeight: '68px !important',

  '@media screen and (max-width: 768px)': {
    padding: '0 30px !important'
  },

  '@media screen and (max-width: 520px)': {
    padding: '0 12px !important'
  },

  '.toolbar_content': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '&_left': {
      gap: '20px',
      width: '35%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      '&_logo': {
        gap: '3px',
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'center',

        h2: {
          fontSize: '26px',
          fontFamily: 'Inter',
          fontStyle: 'normal',
          lineHeight: 'normal',
          letterSpacing: '0.1px',
          color: customColors.white,

          '@media screen and (max-width: 768px)': {
            fontSize: '20px'
          },

          '@media screen and (max-width: 520px)': {
            fontSize: '18px'
          }
        }
      }
    },

    '&_right': {
      gap: '24px',
      display: 'flex',
      alignItems: 'center',

      '@media screen and (max-width: 768px)': {
        gap: '12px'
      },

      '.profile': {
        gap: '12px',
        display: 'flex',
        alignItems: 'center',

        '.detail': {
          gap: '5px',
          display: 'flex',
          cursor: 'pointer',
          alignItems: 'flex-end',

          '.name': {
            fontSize: '12px',
            fontWeight: 500
          },

          '.role': {
            fontSize: '11px',
            fontWeight: 400
          },

          p: {
            lineHeight: '18px',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            letterSpacing: '0.1px',
            color: customColors.white
          }
        }
      }
    }
  }
}));

export const StyledDropdownButton = styled(Button)(({ clr, fontSize }) => ({
  color: clr,
  padding: '0',
  fontWeight: '700',
  fontSize: fontSize,
  fontStyle: 'normal',
  lineHeight: 'normal',
  fontFamily: 'DM Sans',
  textTransform: 'capitalize',

  '@media screen and (max-width: 520px)': {
    fontSize: '14px !important'
  }
}));
