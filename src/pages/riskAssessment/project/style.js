import styled from 'styled-components';
import { customColors } from 'theme/pallete';

export const StyledTaskRiskAssessment = styled.div`
    .output {
        padding: 24px;
        margin-top: 24px;
        border-radius: 4px;
        border: 1px solid #CECECE;

        @media screen and (max-width: 520px) {
            padding: 12px;
            margin-top: 12px;
        }

        &_worksheetPrint {
            overflow-x: auto;
            >h2 {
                font-size: 20px;
                font-weight: 700;
                line-height: 150%;
                font-family: Inter;
                font-style: normal;
                color: ${customColors.text};
            }

            table {
                max-width: 880px;
            }
        }

        &_table {
            margin: 24px 0;
            overflow-x: auto;

            table {
                width: 100%;
                border-collapse: collapse;

                tr {
                    td {
                        padding: 14px 0;
                        font-size: 12px;
                        font-weight: 400;
                        text-align: center;
                        font-family: Inter;
                        font-style: normal;
                        line-height: 20.39px;
                        color: ${customColors.text};
                        border: 1px solid ${customColors.text};
                    }
                }
            }
        }

        &_list {
            >div:last-child {
                display: none;
            }

            table {
                th {
                    white-space: wrap;
                    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
                }
                
                td {
                    padding: 0 3px;
                    white-space: wrap;
                    border-right: 1px solid #E8E8E8 !important;
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
`