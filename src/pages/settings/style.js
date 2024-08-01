import styled from 'styled-components';
import { customColors } from 'theme/pallete';

export const StyledSettings = styled.div`
    >h2 {
        font-size: 36px;
        font-weight: 600;
        line-height: 44px;
        font-style: normal;
        letter-spacing: -0.72px;
        color: ${customColors.black};
    }

    >p {
        font-size: 16px;
        padding-top: 4px;
        font-weight: 400;
        line-height: 24px;
        font-style: normal;
        color: ${customColors.text};
    }

    .title {
        font-size: 24px;
        font-weight: 600;
        line-height: 32px;
        font-style: normal;
        padding-bottom: 24px;
        color: ${customColors.black};
    }

    .MuiButtonGroup-root {
        padding-top: 24px;
        padding-bottom: 32px;

        >button {
            font-size: 16px;
            padding: 9px 14px;
            line-height: 24px;
            font-family: Inter;
            font-style: normal;
            border: 1px solid #D0D5DD;
            text-transform: capitalize;
            box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);

            &:hover {
                background: #F9FAFB;
            }
        }
    }
`

export const StyleSubscription = styled.div`
    table {
        width: 100%;

        th:nth-child(4) {
            width: 20%;
        }

        th {
            width: 25%;
            color: #999;
            font-size: 14px;
            font-weight: 500;
            line-height: 22px;
            text-align: start;
            font-family: Inter;
            font-style: normal;
            padding-bottom: 38px;
        }

        td {
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
            font-style: normal;
            font-family: Inter;
            color: ${customColors.text};
        }
    }
`