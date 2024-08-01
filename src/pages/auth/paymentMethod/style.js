import { customColors } from "theme/pallete";
import styled from 'styled-components';

export const StyledPaymentOption = styled.div`
    margin-top: 40px;

    @media screen and (max-width: 520px) {
        margin-top: 20px;
    }

    .pricing {
        .custom-radios input {
           display: none;
        }

        .custom-radios input:checked + .radio-btns {
            background-color: #EEFAF7;
        }

        .custom-radios input:checked + .radio-btns .radio-circle {
            top: 16px;
            width: 15px;
            right: 16px;
            height: 15px;
            position: absolute;
            border-radius: 50%;
            border: 3px solid #EEFAF7;
            background-color: ${customColors.black};
            outline: 1px solid ${customColors.black};
        }

        .custom-radios input:checked + .radio-btns .radio-circle > i {
            opacity: 1;
            transform: translateX(-50%) scale(1);
        }

        .custom-radios input:checked + .radio-btns > i {
            opacity: 1;
            transform: translateX(-50%) scale(1);
        }

        .radio-btns {
            width: 100%;
            cursor: pointer;
            position: relative;
            border-radius: 8px;
            display: inline-block;
            border: 1px solid ${customColors.secondary};

            .radio-circle {
                top: 16px;
                width: 15px;
                right: 16px;
                height: 15px;
                position: absolute;
                border-radius: 50%;
                background-color: #fff;
                border: 3px solid #333333;
            }

            .pricing_row {
                gap: 17px;
                display: flex;
                padding: 16px;
                position: relative;
                align-items: flex-start;

                .pricing_text {
                    p {
                        color: ${customColors.secondary};
                        font-weight:500;
                    }
                    h4 {
                        font-size: 30px;
                        font-weight: 600;
                        padding: 10px 0 16px;
                        color: ${customColors.black};
                        span {
                            font-size: 24px;
                        }

                        @media screen and (max-width: 520px) {
                            padding: 5px 0;
                        }
                    }
                    h6 {
                        font-size: 24px;
                        font-weight: 400;
                        color: ${customColors.black};

                        @media screen and (max-width: 520px) {
                            font-size: 20px;
                        }
                    }
                }
            }
        }
    }

    .payment-options {
        margin-top: 40px;
        @media screen and (max-width: 520px) {
            margin-top: 20px;
        }
        >p {
            font-size: 20px;
            font-weight: 500;
            color: ${customColors.text};
        }
        .payment-options__row {
            gap: 40px;
            display: flex;
            flex-wrap: wrap;
            margin-top: 24px;

            .custom-radio input {
                display: none;
            }

            .custom-radio input:checked + .radio-btn {
                background-color: #EEFAF7;
            }

            .custom-radio input:checked + .radio-btn > i {
                opacity: 1;
                transform: translateX(-50%) scale(1);
            }

            .radio-btn {
                width: 182px;
                height: 167px;
                cursor: pointer;
                position: relative;
                text-align: center;
                border-radius: 10px;
                display: inline-block;
                border: 1px solid #E5E5E5;

                .payment-icon {
                    padding: 10px 0;

                    h3 {
                        color: #333333;
                        font-size: 24px;
                        font-weight: 400;
                    }
                }
            }
        }
    }

    .btn-container {
        display: flex;
        margin-top: 40px;
        justify-content: flex-end;
        
        button {
            width: 187px !important;
        }
        
        @media screen and (max-width: 520px) {
            margin-top: 20px;
            justify-content: center;
        }
    }
`