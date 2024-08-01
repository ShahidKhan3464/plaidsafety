import styled from 'styled-components';
import { customColors } from 'theme/pallete';

export const StyledSearchSelect = styled.div`
    position: relative;

    input {
        width: 100%;
        font-weight: 400;
        font-family: Inter;
        font-style: normal;
        color: ${customColors.text};
        background: ${customColors.white};

        &:focus {
            outline: none;
        }
        
        &::placeholder {
            color: ${customColors.lightGrey};
        }
    }

    .searchSelect {
        &_input {
            height: 54px;
            display: flex;
            padding: 0 16px;
            margin-top: 16px;
            border-radius: 8px;  
            align-items: center;
            flex-direction: row-reverse;
            border: 1px solid ${props => props.error ? '#f26464' : '#B8D6BF'};

            @media screen and (max-width: 520px) {
                height: 42px;
                padding: 0 8px;
                margin-top: 8px;
            }

            input {
                padding: 0;
                height: 100%;
                border: none;
                font-size: 16px;
                line-height: 24px;
                
                @media screen and (max-width: 520px) {
                    font-size: 14px;
                }
            }
        }

        &_dropdown {
            left: 0;
            top: 100%;
            z-index: 1;
            opacity: 1;
            width: 100%;
            overflow-y: auto;
            max-height: 400px;
            position: absolute;
            border-radius: 4px;
            background-color: #fff;
            box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 
                0px 8px 10px 1px rgba(0,0,0,0.14),
                0px 3px 14px 2px rgba(0,0,0,0.12);
            
            transition: opacity 232ms 
                cubic-bezier(0.4, 0, 0.2, 1) 0ms, 
                transform 155ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

            &_list {
                margin: 0;
                padding: 0;
                list-style: none;
                border-bottom: 1px solid #CCD8D6;

                li {
                    cursor: pointer;
                    padding: 10px 16px;

                    &:hover, &:focus, &:active {
                        background-color: rgba(0, 0, 0, 0.04);
                    }
                }
            }

            &_custom-input {
                padding: 16px;

                .no-data {
                    color: #7A7A7A;
                    font-size: 16px;
                    font-weight: 500;
                    line-height: 24px;
                    font-style: normal;
                    text-align: center;
                    font-family: Inter;
                    padding-bottom: 16px;
                }

                >div {                
                    gap: 16px;
                    display: flex;
                    align-items: center;
                    
                    @media screen and (max-width: 520px) {
                        flex-wrap: wrap;
                    }

                    input {
                        font-size: 14px;
                        padding: 7px 16px;
                        line-height: 22px;
                        border-radius: 6px;
                        border: 1px solid #CCD8D6;
                    }

                    button {
                        padding: 0;
                        width: 119px;
                        height: 38px;
                        color: #1972F9;
                        font-size: 14px;
                        cursor: pointer;
                        font-weight: 500;
                        line-height: 22px;
                        border-radius: 6px;
                        font-style: normal;
                        font-family: Inter;
                        white-space: nowrap;
                        background: transparent;
                        border: 1px solid #1972F9;
                    }
                }
            }
        }
    }
`