import styled from 'styled-components';
import { customColors } from 'theme/pallete';

export const StyledCreateHazardReports = styled.div`
  .report_form {
    margin-top: 24px;
    border-radius: 4px;
    padding: 0 24px 24px;
    border: 1px solid #cecece;

    @media screen and (max-width: 520px) {
      padding: 12px;
      margin-top: 12px;
    }

    .status {
      display: flex;
      padding-top: 24px;
      justify-content: flex-end;

      @media screen and (max-width: 520px) {
        padding-top: 0px;
      }
    }

    &_checkboxes {
      display: flex;
      align-items: center;
      justify-content: space-between;

      @media screen and (max-width: 768px) {
        gap: 20px;
        flex-wrap: wrap;
      }

      > div:first-child {
        width: 100%;
        display: grid;
        grid-template-columns: auto auto auto;

        @media screen and (max-width: 768px) {
          gap: 20px;
          grid-template-columns: 1fr;
        }
      }
    }

    &_field-control {
      gap: 50px;
      display: flex;
      padding-top: 24px;
      align-items: center;
      justify-content: space-between;

      @media screen and (max-width: 991px) {
        gap: 12px;
        flex-wrap: wrap;
        padding-top: 12px;
      }

      > div {
        width: 100%;
      }
    }

    &_risk-ranking {
      gap: 15px;
      display: flex;
      padding-top: 24px;
      justify-content: space-between;

      @media screen and (max-width: 1300px) {
        flex-wrap: wrap;
      }

      @media screen and (max-width: 520px) {
        padding-top: 12px;
      }

      div:last-child {
        margin-top: 16px;

        @media screen and (max-width: 520px) {
          margin-top: 0;
        }
      }

      > div {
        width: 100%;

        @media screen and (max-width: 1300px) {
          overflow-x: auto;

          &::-webkit-scrollbar {
            width: 0px;
            height: 0px;
          }
        }

        > label {
          font-size: 16px;
          font-weight: 500;
          line-height: 100%;
          font-family: Inter;
          font-style: normal;
          color: ${customColors.black};

          @media screen and (max-width: 520px) {
            font-size: 14px;
          }

          span {
            color: #0182fc;
            cursor: pointer;
            text-decoration-line: underline;
          }
        }
      }
    }

    &_questions {
      gap: 24px;
      display: flex;
      padding-top: 24px;
      flex-direction: column;

      @media screen and (max-width: 520px) {
        padding-top: 12px;
      }

      &_question {
        width: 100%;
        max-width: 455px;

        > label {
          gap: 10px;
          display: flex;
          flex-direction: row-reverse;
          justify-content: space-between;

          .MuiFormControlLabel-label {
            font-size: 16px;
            font-weight: 400;
            line-height: 100%;
            font-style: normal;
            font-family: Inter;
            color: ${customColors.text};
          }
        }
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
`;
