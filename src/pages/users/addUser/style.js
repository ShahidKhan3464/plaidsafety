import styled from 'styled-components';
import { customColors } from 'theme/pallete';

export const StyledAddUser = styled.div`
  .report_form {
    margin-top: 24px;
    border-radius: 4px;
    padding: 0 24px 24px;
    border: 1px solid #cecece;

    @media screen and (max-width: 520px) {
      padding: 12px;
      margin-top: 12px;
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

    &_questions {
      gap: 24px;
      display: flex;
      padding-top: 24px;
      flex-direction: column;

      @media screen and (max-width: 520px) {
        padding-top: 12px;
      }

      > h3 {
        font-size: 20px;
        font-weight: 600;
        line-height: 30px;
        font-style: normal;
        color: ${customColors.text};
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
      padding-top: 24px;
      align-items: center;
      justify-content: flex-end;

      @media screen and (max-width: 991px) {
        padding-top: 20px;
        justify-content: center;
      }
    }
  }
`;
