import styled from 'styled-components';
import { customColors } from 'theme/pallete';

export const StyledMatrix = styled.div`
    .steps {
        padding: 24px;
        margin-top: 24px;
        border-radius: 4px;
        border: 1px solid #CECECE;

        @media screen and (max-width: 520px) {
            padding: 12px;
            margin-top: 12px;
        }
        
        &_step {
            margin-bottom: 24px;
            @media screen and (max-width: 520px) {
                margin-bottom: 12px;
            }
            
            h3 {
                font-size: 17px;
                font-weight: 600;
                line-height: 24px;
                font-family: Inter;
                font-style: normal;
                margin-bottom: 24px;
                color: ${customColors.text};

                @media screen and (max-width: 520px) {
                    font-size: 15px;
                    line-height: 22px;
                    margin-bottom: 12px;
                }
            }

            .riskRanking {
                width: 100%;
                max-width: 882px;

                @media screen and (max-width: 1024px) {
                    overflow-x: auto;
                }
            }

            .control-hierarchy {
                width: 100%;
                max-width: 539px;
                overflow-x: auto;
            }
            
            .potential-severtiy {
                width: 100%;
                max-width: 910px;
                overflow-x: auto;
            }

            .likelihood {
                width: 100%;
                max-width: 761px;
                overflow-x: auto;
                
                table {
                    width: 100%;
                    border-collapse: collapse;
                    
                    tr {
                        th {
                            padding: 5px;
                            font-weight: 700;
                            background: #888888;
                            color: ${customColors.white};
                        }
                        td {
                            padding: 0;
                            font-weight: 500;
                            color: ${customColors.black};
                        }
                    
                        td:last-child {
                            text-align: start;
                        }
                    
                        th, 
                        td {
                            font-size: 16px;
                            line-height: 100%;
                            text-align: center;
                            font-style: normal;
                            font-family: Inter;
                            white-space: nowrap;
                            border-collapse: collapse;
                            border: 1px solid ${customColors.black};
                            @media screen and (max-width: 520px) {
                                font-size: 14px;
                            }
                        }
                    }   
                }
            }
        }
    }
`