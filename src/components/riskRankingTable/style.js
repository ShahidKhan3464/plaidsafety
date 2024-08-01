import styled from 'styled-components';
import { customColors } from 'theme/pallete';

export const StyledRiskRankingTable = styled.div`
    table {
        width: 100%;
        margin-top: 16px;
        background: #888888;
        border-collapse: collapse;
        color: ${customColors.white};
  
        tr {
            th {
                font-weight: 700;
                padding: 10px 40px;
                white-space: nowrap;

                @media screen and (max-width: 520px) {
                    padding: 10px;
                }
            }
            td {
                padding: 0;
                min-width: 50px;

                @media screen and (max-width: 520px) {
                    min-width: 30px;
                }
            }

            th, 
            td {
                font-size: 16px;
                font-weight: 700;
                line-height: 100%;
                text-align: center;
                font-style: normal;
                font-family: Inter;
                border-collapse: collapse;
                border: 1px solid ${customColors.black};

                @media screen and (max-width: 520px) {
                    font-size: 14px;
                }
            }
        }   
    }
`