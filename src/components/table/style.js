import { styled } from '@mui/system';
import { customColors } from 'theme/pallete';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

export const StyledTableCell = styled(TableCell)(({ paddin }) => ({
  [`&.${tableCellClasses.head}`]: {
    padding: '18px',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '22px',
    textAlign: 'center',
    fontStyle: 'normal',
    fontFamily: 'Inter',
    whiteSpace: 'nowrap',
    color: customColors.black,
    '@media screen and (max-width: 520px)': {
      padding: '14px',
      fontSize: '14px'
    }
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '12px',
    fontWeight: '400',
    fontStyle: 'normal',
    fontFamily: 'Inter',
    whiteSpace: 'nowrap',
    lineHeight: 'normal',
    borderBottom: 'none',
    textAlign: '-webkit-center',
    color: `${customColors.text}`,
    padding: paddin ? '18px' : '0 !important',
    '@media screen and (max-width: 520px)': {
      padding: '14px'
    }
  }
}));

export const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#F9F9F9'
  },
  '&:nth-of-type(odd)': {
    backgroundColor: `${customColors.white}`
  },
  '&:last-child th, &:last-child td': {
    border: 0
  }
}));
