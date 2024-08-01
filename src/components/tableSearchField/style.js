import styled from 'styled-components';
import { customColors } from 'theme/pallete';

export const StyledTableSearchField = styled.div`
  .field {
    gap: 8px;
    height: 52px;
    display: flex;
    border-radius: 8px;
    padding-left: 16px;
    align-items: center;
    border: 1px solid #A9C3EA;

    input {
      padding: 0;
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      font-style: normal;
      font-family: Inter;
      background: transparent;
      color: ${customColors.grey};

      @media screen and (max-width: 520px) {
        font-size: 14px;
      }

      &::placeholder {
        color: #AEB6CF;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        font-style: normal;
        font-family: Inter;
      }
    }
  }
`;
