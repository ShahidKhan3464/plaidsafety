import styled from 'styled-components';
import { customColors } from 'theme/pallete';

export const StyledSubscriptionPackage = styled.div`
    width: 100%;
    max-width: 453px;
    text-align: center;
    margin: 40px auto 0;
    border-radius: 16px;
    border: 1px solid #E0E0E0;

    @media screen and (max-width: 520px) {
        margin: 20px auto 0;
    }

    .header {
        padding: 32px;

        @media screen and (max-width: 520px) {
            padding: 12px;
        }

        h6 {
            font-size: 20px;
            font-weight: 500;
            line-height: 30px;
            color: ${customColors.secondary};
        }
        h2 {
            font-size: 48px;
            font-weight: 600;
            line-height: 60px;
            letter-spacing: -0.96px;
            color: ${customColors.lightblack};

            @media screen and (max-width: 520px) {
                font-size: 35px;
            }
        }
        p {
            font-size: 34px;
            font-weight: 400;
            color: ${customColors.black};

            @media screen and (max-width: 520px) {
                font-size: 22px;
            }
        }
    }

    .feature-list{
        margin: 0;
        padding: 0 32px;

        @media screen and (max-width: 520px) {
            padding: 0 12px;
        }

        li {
            gap: 12px;
            display: flex;
            font-size: 16px;
            list-style: none;
            text-align: left;
            font-weight: 400;
            line-height: 24px;
            align-items: center;
            margin-bottom: 16px;
            color: ${customColors.grey};
        }
    }

    .note {
        margin: 0 32px;
        text-align: start;

        @media screen and (max-width: 520px) {
            margin: 0 12px;
        }

        p {
            font-weight: 500;
            color: ${customColors.black};

            span {
                font-weight: 400;
                padding-left: 5px;
                color: ${customColors.grey};
            }
        }
    }

    .footer {
        padding: 32px;
        margin-top: 32px;
        background: #F9FAFB;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;

        @media screen and (max-width: 520px) {
            padding: 12px;
            margin-top: 12px;
        }

        button {
            width: 100% !important;
            text-transform: math-auto;
        }
    }
`