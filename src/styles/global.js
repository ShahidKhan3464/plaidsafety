import styled from 'styled-components';
import { FormLabel } from '@mui/material';
import { customColors } from 'theme/pallete';
import { SnackbarProvider } from 'notistack';

export const StyledListModule = styled.div`
  .list {
    padding: 24px;
    margin-top: 24px;
    border-radius: 4px;
    border: 1px solid #cecece;

    @media screen and (max-width: 520px) {
      padding: 12px;
      margin-top: 15px;
    }
  }
`;

export const StyledSearchData = styled.div`
  .search_data {
    margin-top: 24px;
    border-radius: 4px;
    padding: 0px 24px 24px;
    border: 1px solid #cecece;

    @media screen and (max-width: 520px) {
      padding: 12px;
      margin-top: 15px;
    }

    &_field-control {
      gap: 50px;
      display: flex;
      padding-top: 24px;
      justify-content: space-between;

      > div {
        width: 100%;
      }

      @media screen and (max-width: 991px) {
        gap: 20px;
        flex-wrap: wrap;
        padding-top: 12px;
      }    
    }

    &_btn-container {
      gap: 16px;
      display: flex;
      padding-top: 24px;
      align-items: center;
      justify-content: flex-end;
      
      @media screen and (max-width: 991px) {
        padding-top: 12px;
        justify-content: center;
      }
    }

    &_list {
      padding-top: 24px;

      @media screen and (max-width: 991px) {
        padding-top: 12px;
      }

      >div:last-child {
        display: none;
      }
    }
  }
`;

export const StyledCorrectiveAction = styled.div`
  .corrective_form {
    padding: 24px;
    margin-top: 24px;
    border-radius: 4px;
    border: 1px solid #cecece;

    @media screen and (max-width: 520px) {
      padding: 12px;
      margin-top: 12px;
    }

    &_action-category {
      background: rgba(0, 122, 90, 0.2);

      p {
        font-size: 18px;
        font-weight: 400;
        line-height: 22px;
        font-style: normal;
        font-family: Inter;
        color: ${customColors.black};
      }
    }

    &_field-control {
      gap: 50px;
      display: flex;
      padding-top: 24px;
      justify-content: space-between;

      > div {
        width: 100%;
      }

      @media screen and (max-width: 991px) {
        gap: 12px;
        flex-wrap: wrap;
        padding-top: 12px;
      }
    }

    &_btn-container {
      gap: 16px;
      display: flex;
      flex-wrap: wrap;
      padding-top: 48px;
      align-items: center;
      justify-content: flex-end;

      @media screen and (max-width: 991px) {
        padding-top: 20px;
        justify-content: center;
      }
    }
  }

  .list {
    padding: 24px;
    margin-top: 24px;
    border-radius: 4px;
    border: 1px solid #CECECE;

    @media screen and (max-width: 991px) {
      padding: 12px;
      margin-top: 12px;
    }

    >div:nth-child(4) {
      display: none;
    }

    h2 {
      font-size: 24px;
      font-weight: 600;
      line-height: 150%;
      font-family: Inter;
      font-style: normal;
      color: ${customColors.black};
    }

    >p {
      font-size: 18px;
      margin-top: 32px;
      font-weight: 500;
      line-height: 30px;
      font-family: Inter;
      font-style: normal;
      margin-bottom: 16px;
      color: ${customColors.text};

      @media screen and (max-width: 520px) {
        margin: 8px 0;
        font-size: 16px;
      }
    }

    .entries {
      font-size: 14px;
      font-weight: 400;
      margin-top: 17px;
      font-family: Inter;
      font-style: normal;
      margin-bottom: 0px;
      line-height: normal;
      color: ${customColors.text};
    }   
  }
`;

export const StyledTopHeader = styled.div`
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;

  h2 {
    font-size: 20px;
    font-weight: 700;
    line-height: 150%;
    font-style: normal;
    font-family: Inter;
    color: ${customColors.secondary};
  }

  > span {
    font-size: 18px;
    font-weight: 500;
    line-height: 100%;
    font-style: normal;
    font-family: Inter;
    color: ${customColors.dark};

    @media screen and (max-width: 520px) {
      font-size: 16px;
    }
  }

  .flex-row {
    gap: 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .left {
    gap: 16px;
    display: flex;
    flex-direction: column;

    > div {
      gap: 16px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
  }

  .right {
    gap: 8px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
`;

export const StyledStatus = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  padding: 6px 10px;
  font-style: normal;
  font-family: Inter;
  border-radius: 8px;
  text-transform: capitalize;
  color: ${(props) => props.color};
  background: ${(props) => props.bg};
`;

export const StyledFieldErrorMessage = styled.p`
  color: #f26464;
  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  position: absolute;
  font-family: Inter;
  line-height: normal;

  @media screen and (max-width: 520px) {
    font-size: 12px;
  }
`;

export const StyledPriority = styled.p`
  width: 98px;
  height: 88px;
  display: flex;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  font-style: normal;
  font-family: Inter;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
  color: ${(props) => props.color};
  background: ${(props) => props.bg};
`;

export const StyledTextarea = styled.div`
  .MuiInputBase-root {
    align-items: flex-start;

    textarea {
      padding: 16px 16px 65px;
      height: 100% !important;
      overflow: auto !important;

      &::-webkit-scrollbar {
        width: 3px;
        height: 3px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
      }

      @media screen and (max-width: 520px) {
        padding: 8px 8px 30px;
      }
    }
  }
`;

export const StyledDropdownStatus = styled.div`
  > button {
    white-space: nowrap;
    border: none !important;
    font-size: 12px !important;
    font-weight: 500 !important;
    line-height: 18px !important;
    font-family: Inter !important;
    border-radius: 6px !important;
    font-style: normal !important;
    text-transform: capitalize !important;
    color: ${(props) => props.color} !important;
    background: ${(props) => props.bg} !important;
  }

  > div {
    align-items: center;

    .MuiOutlinedInput-root {
      width: fit-content;
      align-items: center;
      border: none !important;
      margin-top: 0 !important;
      font-size: 12px !important;
      font-weight: 500 !important;
      line-height: 18px !important;
      padding: 3px 10px !important;
      border-radius: 6px !important;
      color: ${(props) => props.color} !important;
      background: ${(props) => props.bg} !important;

      svg {
        color: ${(props) => props.color} !important;
      }
    }
  }
`;

export const StyledLoadingContainer = styled.div`
  display: flex;
  min-height: 500px;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 520px) {
    min-height: 250px;
  }

  span {
    color: ${customColors.secondary};
  }
`;

export const StyledSubLabel = styled.span`
  display: block;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  font-style: normal;
  font-family: Inter;
  color: ${customColors.text};
  
  @media screen and (max-width: 520px) {
    font-size: 13px;
    line-height: 17px;
  }
`;

export const StyledFormLabel = styled(FormLabel)(() => ({
  fontStyle: 'normal',
  fontSize: '16px !important',
  fontWeight: '600 !important',
  lineHeight: '24px !important',
  fontFamily: 'Inter !important',
  color: `${customColors.text} !important`,

  '@media screen and (max-width: 520px)': {
    fontSize: '14px !important'
  }
}));

export const StyledSnackbarProvider = styled(SnackbarProvider)`
  .go946087465 {
    align-items: flex-start;
  }
  &.notistack-MuiContent-success {
    font-size: 14px;
    font-weight: 600;
    font-style: normal;
    font-family: Inter;
    line-height: normal;
    background-color: #e3ffe0;
    border: 1.5px solid #27ae60;
    color: ${customColors.black};
    box-shadow: 0px 0px 5px 0px rgba(51, 48, 48, 0.15);
  }
  &.notistack-MuiContent-success svg {
    color: #27ae60;
  }
  &.notistack-MuiContent-error {
    font-size: 14px;
    font-weight: 600;
    font-style: normal;
    font-family: Inter;
    line-height: normal;
    background-color: #ffe4e4;
    border: 1.5px solid #d32f2f;
    color: ${customColors.black};
    box-shadow: 0px 0px 5px 0px rgba(51, 48, 48, 0.15);
  }
  &.notistack-MuiContent-error svg {
    color: #d32f2f;
  }
  &.notistack-MuiContent-warning {
    font-size: 14px;
    font-weight: 600;
    font-style: normal;
    font-family: Inter;
    line-height: normal;
    background-color: #ffe4e4;
    border: 1.5px solid #f37021;
    color: ${customColors.black};
    box-shadow: 0px 0px 5px 0px rgba(51, 48, 48, 0.15);
  }
  &.notistack-MuiContent-warning svg {
    color: #f37021;
  }
`;


export const StyledTable = styled.div`
  .table{
    border: 1px solid #DBDBDB;
    padding: 20px;
    border-radius: 6px;
    table{
      width:100%;
      border: 1px solid #DBDBDB;
      border-collapse: collapse;
      thead{
        background-color:#007A5A33;
        th{
          padding: 14px 0;
          font-size:14px;
          font-weight:500;
        }
      }
      tbody{
        td{
          padding: 19px 26px;
          color:${customColors.text};
          font-size:12px;
          .action-icon{
            display:flex;
            gap:10px
          }
        }
        .userId{
          color:${customColors.blue};
          border-bottom: 1px solid ${customColors.blue};
        }
        .userfName{
          display:flex;
          align-items:center;
          gap: 10px;
          img{
            width:24px;
          }
        }
      }
    }
    
  }
  .status-bar{
    border-radius: 5px;
    font-size: 12px;
    font-weight: 500;
    width: 87px;
    text-align: center;
    position:relative;
    cursor: pointer;
    p{
      padding:7px 0px;
    }
    ul{
      position: absolute;
      list-style: none;
      padding: 0;
      right: 0;
      left: 0;
    }
    .status-bar__inner{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      padding: 0 9px;
      img{
        width:10px;
      }
    }
  }
`

export const StyledUserHeader = styled.div`
  .user-header_row{
    display:flex;
    justify-content:space-between;
    .user-col{
      display: flex;
      align-items: center;
      gap: 11px;
      span{
        color: ${customColors.secondary};
        font-size:20px;
        font-weight:700;
      }
    }
  }
`

