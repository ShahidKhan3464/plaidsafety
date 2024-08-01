import styled from 'styled-components';
import { customColors } from 'theme/pallete';

export const StyledAuthWrapper = styled.div`
  .content {
    .login,
    .payment,
    .subscription,
    .reset-password,
    .forgot-password,
    .otp-verification {
      width: 100%;
      max-width: 550px;
    }

    .subscription {
      padding: 40px;

      @media screen and (max-width: 520px) {
        padding: 12px;
      }
    }
  
    &_logo {
      padding: 40px 24px 0;

      @media screen and (max-width: 520px) {
        padding: 20px 12px 0;
      }
    }

    &_children {
      display: flex;
      padding: 67.5px 0;
      align-items: center;
      justify-content: center;

      @media screen and (max-width: 768px) {
        padding: 32px 24px;
      }

      @media screen and (max-width: 520px) {
        padding: 16px 12px;
      }

      >div {
        padding: 72px;
        border-radius: 16px;
        background: ${customColors.white};
        box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);

        @media screen and (max-width: 520px) {
          padding: 12px;
        }

        .payment-img {
          width: 100%;
          margin: auto;
          height: 372px;
          max-width: 487px;
          padding-bottom: 24px;

          @media screen and (max-width: 520px) {
            height: 250px;
          }

          img {
            width: 100%;
            height: 100%;
          }
        }

        .title {
          font-size: 40px;
          font-weight: 600;
          line-height: 125%;
          font-family: Inter;
          font-style: normal;
          text-align: center;
          color: ${customColors.black};
  
          @media screen and (max-width: 520px) {
            font-size: 30px;
          }
        }

        .text {
          color: #666;
          font-size: 20px;
          padding-top: 8px;
          font-weight: 400;
          line-height: 32px;
          font-family: Inter;
          text-align: center;
          font-style: normal;

          @media screen and (max-width: 520px) {
            font-size: 18px;
            line-height: 22px;
          }
        }
      }

      form {
        padding-top: 40px;

        .field-control {
          position: relative;
        }

        @media screen and (max-width: 520px) {
          padding-top: 16px;
        }
      }
    }
  }
`;
