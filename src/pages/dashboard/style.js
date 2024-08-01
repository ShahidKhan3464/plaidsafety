import styled from 'styled-components';
import { customColors } from 'theme/pallete';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

export const StyledDashboardContent = styled.div`
  gap: 24px;
  display: flex;
  flex-direction: column;

  .flex-row {
    gap: 24px;
    display: flex;

    @media screen and (max-width: 1024px) {
      flex-wrap: wrap;
    }
  }
`;

export const StyledChartCards = styled.div`
  gap: 24px;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 520px) {
    gap: 12px;
    grid-template-columns: 1fr;
  }

  .card {
    padding: 20px;
    border-radius: 20px;
    background: ${customColors.white};
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);

    @media screen and (max-width: 520px) {
      padding: 10px;
    }

    &_detail {
      gap: 15px;
      display: flex;
      align-items: baseline;
      justify-content: space-between;

      &_left {
        gap: 16px;
        display: flex;
        align-items: flex-start;

        p {
          color: #2e3b52;
          font-size: 14px;
          font-weight: 400;
          line-height: 22px;
          font-style: normal;
          font-family: Inter;
          white-space: nowrap;
        }

        h3 {
          color: #2e3b52;
          font-size: 24px;
          padding-top: 6px;
          font-weight: 600;
          line-height: 32px;
          font-style: normal;
          font-family: Inter;
        }

        div:first-child {
          display: flex;
          padding: 11px;
          border-radius: 50%;
          align-items: center;
          justify-content: center;
          background: ${customColors.secondary};
        }
      }

      &_data {
        padding-bottom: 3px;
        p {
          text-align: end;
          font-size: 12px;
          font-weight: 600;
          line-height: 19px;
          font-style: normal;
          font-family: Mulish;
        }

        h6 {
          color: #606f89;
          text-align: end;
          font-size: 10px;
          font-weight: 400;
          line-height: 16px;
          font-style: normal;
          font-family: Mulish;
        }
      }
    }
  }
`;

export const StyledModuleCards = styled.div`
  gap: 24px;
  display: flex;
  flex-wrap: wrap;
  height: fit-content;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
  
  .card {
    gap: 16px;
    width: 185px;
    display: flex;
    cursor: pointer;
    padding-top: 10px;
    border-radius: 20px;
    flex-direction: column;
    border: 1px solid #fff;
    justify-content: flex-end;
    background: rgba(250, 250, 250, 0.7);

    div:first-child {
      width: 70px;
      height: 70px;
      display: flex;
      margin: 0 auto;
      align-items: center;
      justify-content: center;
    }

    div:last-child {
      display: flex;
      background: #fff;
      padding: 11.5px 0;
      align-items: center;
      border-radius: 20px;
      justify-content: center;

      p {
        color: #17161e;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        font-family: Inter;
        font-style: normal;
      }
    }
  }
`;

export const StyledSafetyObservation = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  max-width: 390px;
  overflow-x: auto;
  border-radius: 20px;
  background: ${customColors.white};
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);

  @media screen and (max-width: 768px) {
    margin: 0 auto;
  }

  > h2 {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    font-style: normal;
    font-family: Inter;
    color: ${customColors.black};
  }
`;

export const StyledGraphs = styled.div`
  gap: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 1024px) {
    flex-wrap: wrap;
  }

  .graph {
    width: 100%;
    padding: 16px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);

    h2 {
      font-size: 16px;
      font-weight: 500;
      line-height: 24px;
      font-style: normal;
      font-family: Inter;
      padding-bottom: 16px;
      color: ${customColors.black};
    }
  }
`;

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    border: 'none',
    color: '#434656',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '20px',
    padding: '6px 18px',
    textAlign: 'center',
    fontStyle: 'normal',
    fontFamily: 'Inter'
  },
  [`&.${tableCellClasses.body}`]: {
    border: 'none',
    fontSize: '14px',
    color: '#434656',
    fontWeight: '500',
    lineHeight: '22px',
    textAlign: 'center',
    fontStyle: 'normal',
    fontFamily: 'Inter',
    borderRadius: '8px',
    padding: '12px 18px'
  }
}));

export const StyledTableRow = styled(TableRow)(() => ({
  borderRadius: '8px',
  boxShadow: '0px 0px 16px 0px rgba(0, 0, 0, 0.08)',

  '&:last-child th, &:last-child td': {
    border: 0
  }
}));
