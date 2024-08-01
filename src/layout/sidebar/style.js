import MuiDrawer from '@mui/material/Drawer';
import { customColors } from 'theme/pallete';
import { styled } from '@mui/material/styles';

export const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  '& .MuiPaper-root': {
    width: '76px',
    display: 'flex',
    position: 'sticky',
    alignItems: 'center',
    background: customColors.white,
    boxShadow: '0px 0px 16px -48px rgba(34, 58, 40, 0.08)',

    '@media screen and (max-width: 520px)': {
      width: '40px'
    }
  }
}));
