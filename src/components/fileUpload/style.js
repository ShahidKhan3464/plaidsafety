import styled from 'styled-components';
import { customColors } from 'theme/pallete';

export const StyledFileUpload = styled.div`
  gap: 12px;
  display: flex;
  flex-direction: column;

  .fileUpload {
    > div {
      gap: 10px;
      width: 147px;
      display: flex;
      padding: 12px 20px;
      border-radius: 12px;
      align-items: flex-end;
      background: ${customColors.secondary};

      @media screen and (max-width: 520px) {
        padding: 8px 12px;
      }

      span {
        font-size: 14px;
        font-weight: 600;
        line-height: 22px;
        font-style: normal;
        font-family: Inter;
        color: ${customColors.white};
      }
    }
    .loading {
      height: 103px;
      display: flex;
      font-size: 24px;
      font-weight: 600;
      font-style: normal;
      line-height: normal;
      align-items: center;
      justify-content: center;
    }
  }

  .file_uploaded {
    gap: 24px;
    display: flex;
    flex-wrap: wrap;

    &_card {
      gap: 16px;
      width: 100%;
      padding: 14px;
      display: flex;
      max-width: 347px;
      border-radius: 8px;
      background-color: #f4f4f4;
      justify-content: space-between;

      &_content {
        gap: 20px;
        display: flex;

        &_img {
          width: 31px;
          height: 41px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        h6 {
          color: #303030;
          font-size: 16px;
          font-weight: 600;
          line-height: 18px;
          font-style: normal;
          font-family: Inter;
        }

        p {
          color: #606060;
          font-size: 12px;
          font-weight: 400;
          padding-top: 10px;
          line-height: 18px;
          font-style: normal;
          font-family: Inter;
        }
      }

      &_clear {
        > button {
          pointer-events: ${(props) => props.disabled && 'none'};
          cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
          svg {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
`;
