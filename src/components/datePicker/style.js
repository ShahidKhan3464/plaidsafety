import styled from 'styled-components';
import { customColors } from 'theme/pallete';

export const StyledDatePicker = styled.div`
  gap: 16px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 520px) {
    gap: 8px;
  }

  .react-datepicker-wrapper {
    padding: 15px;
    border-radius: 8px;
    border: 1px solid ${(props) => (props.error ? '#f26464' : '#ccd8d6')};

    @media screen and (max-width: 520px) {
      padding: 10px;
    }

    .react-datepicker__input-container {
      display: flex;
      align-items: center;
      flex-direction: row-reverse;

      svg {
        padding: 0;
      }

      input {
        padding: 0;
        width: 100%;
        border: none;
        outline: none;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        font-style: normal;
        font-family: Inter;
        color: ${customColors.text};

        @media screen and (max-width: 520px) {
          font-size: 14px;
        }

        &::placeholder {
          color: ${customColors.lightGrey};
        }
      }
    }
  }

  .react-datepicker-popper {

    .react-datepicker {
      width: 100%;
      border-radius: 8px;
      border: 1px solid #f6f6f6;
      background: ${customColors.white};
      box-shadow: 0px 8px 8px -4px rgba(16, 24, 40, 0.03),
        0px 20px 24px -4px rgba(16, 24, 40, 0.08);

      .react-datepicker__navigation--previous {
        top: 24px;
        left: 20px;
        width: 20px;
        height: 20px;

        .react-datepicker__navigation-icon--previous::before {
          border-color: #787579;
        }
      }

      .react-datepicker__navigation--next {
        top: 24px;
        width: 20px;
        right: 20px;
        height: 20px;

        .react-datepicker__navigation-icon--next::before {
          border-color: #787579;
        }
      }

      .react-datepicker__month-container {
        float: unset;
        padding: 24px;

        .react-datepicker__header {
          padding: 0;
          padding-bottom: 12px;
          background: transparent;

          .react-datepicker__current-month {
            font-size: 18px;
            font-weight: 600;
            font-style: normal;
            font-family: Inter;
            line-height: normal;
            color: ${customColors.black};

            @media screen and (max-width: 520px) {
              font-size: 16px;
            }
          }

          .react-datepicker__day-names {
            padding: 0;
            display: flex;
            margin-top: 12px;
            justify-content: space-between;

            .react-datepicker__day-name {
              margin: 0;
              font-size: 14px;
              font-weight: 500;
              line-height: 20px;
              font-style: normal;
              font-family: Inter;
              color: ${customColors.black};
            }
          }
        }

        .react-datepicker__month {
          margin: 0;
          padding-top: 8px;
          .react-datepicker__week {
            display: flex;
            justify-content: space-between;
            .react-datepicker__day {
              margin: 0;
              font-size: 14px;
              font-weight: 400;
              line-height: 20px;
              padding: 10px 8px;
              font-style: normal;
              font-family: Inter;
              color: ${customColors.black};
            }

            .react-datepicker__day--disabled {
              color: #afafaf;
            }

            .react-datepicker__day--today {
              background-color: transparent !important;
            }

            .react-datepicker__day--selected {
              border-radius: 50%;
              color: ${customColors.white};
              background: ${customColors.primary};
            }
          }
        }
      }
    }
  }
`;
