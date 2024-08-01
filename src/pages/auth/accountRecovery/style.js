import styled from 'styled-components';
import { customColors } from 'theme/pallete';

export const StyledAccountRecovery = styled.div`
  width: 100%;
  max-width: 445px;
  padding-top: 10px;

  .top {
    gap: 32px;
    display: flex;
    align-items: center;
    padding-bottom: 32px;

    @media screen and (max-width: 520px) {
      gap: 16px;
      padding-bottom: 16px;
    }

    h2 {
      font-size: 24px;
      font-weight: 600;
      line-height: 150%;
      font-family: Inter;
      font-style: normal;
      color: ${customColors.secondary};
    }
  }

  > h3 {
    font-size: 24px;
    font-weight: 500;
    line-height: 125%;
    font-family: Inter;
    font-style: normal;
    text-align: center;
    color: ${customColors.dark};
  }

  > p {
    font-size: 16px;
    font-weight: 400;
    line-height: 125%;
    padding-top: 16px;
    font-family: Inter;
    font-style: normal;
    text-align: center;
    padding-bottom: 24px;
    color: ${customColors.dark};
  }

  .options {
    padding-top: 24px;
    > h6 {
      font-size: 16px;
      font-weight: 600;
      line-height: 125%;
      font-family: Inter;
      font-style: normal;
      color: ${customColors.dark};
    }

    > p {
      font-size: 14px;
      padding-top: 9px;
      font-weight: 500;
      line-height: 125%;
      font-family: Inter;
      font-style: normal;
      padding-bottom: 16px;
      color: ${customColors.dark};
    }

    &_opt {
      gap: 16px;
      display: flex;
      cursor: pointer;
      padding: 10px 24px;
      border-radius: 8px;
      margin-bottom: 8px;
      align-items: center;
      border: 2px solid rgba(0, 122, 90, 0.3);

      @media screen and (max-width: 520px) {
        padding: 7px;
      }

      h6 {
        font-size: 14px;
        font-weight: 600;
        line-height: 100%;
        font-style: normal;
        font-family: Inter;
        color: ${customColors.headline};
      }

      p {
        font-size: 12px;
        padding-top: 6px;
        font-weight: 500;
        line-height: 100%;
        font-style: normal;
        font-family: Inter;
        color: ${customColors.headline};
      }
    }
  }
`;
