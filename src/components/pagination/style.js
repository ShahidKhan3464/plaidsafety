import { Icons } from 'assets';
import styled from 'styled-components';
import { customColors } from 'theme/pallete';

export const StyledPaginationContainer = styled.div`
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 24px;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 520px) {
    gap: 10px;
    margin-top: 12px;
    justify-content: center;
  }

  .left {
    gap: 8px;
    display: flex;
    align-items: center;

    span {
      font-size: 14px;
      font-weight: 400;
      font-style: normal;
      font-family: Inter;
      line-height: normal;
      color: ${customColors.black};
    }

    select {
      width: 55px;
      padding: 8px;
      outline: none;
      cursor: pointer;
      font-size: 14px;
      appearance: none;
      font-weight: 400;
      font-style: normal;
      border-radius: 8px;
      font-family: Inter;
      line-height: normal;
      border: 1px solid #c2c2c2;
      background-repeat: no-repeat;
      color: ${customColors.black};
      background-position: 65% center;
      background-color: ${customColors.white};
      background-image: url(${Icons.downArrow});
    }
  }

  .MuiPagination-root {
    li {
      button {
        border: none;
        font-size: 14px;
        font-weight: 400;
        font-style: normal;
        font-family: Inter;
        border-radius: 2px;
        line-height: normal;
        color: ${customColors.black};
        background: ${customColors.white};
      }

      .Mui-selected {
        border: none;
        color: ${customColors.white};
        background: ${customColors.secondary};
      }

      .MuiPaginationItem-ellipsis {
        font-weight: 600;
      }
    }
  }
`;
