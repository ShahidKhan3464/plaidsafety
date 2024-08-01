import { Images } from 'assets';
import styled from 'styled-components';
import { customColors } from 'theme/pallete';

export const StyledLeaderboard = styled.div`
    .leaderboard {
        &_banner {
            width: 100%;
            height: 362px;
            position: relative;
            background-size: 100% 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-image: url(${Images.leaderboard});

            @media screen and (max-width: 520px) {
                height: 250px;
                background-size: cover;
            }

            &_content {
                left: 60px;
                bottom: 45px;
                position: absolute;

                @media screen and (max-width: 520px) {
                    left: 20px;
                    bottom: 30%;
                }

                p {
                    font-size: 64px;
                    font-weight: 400;
                    line-height: 100%;
                    font-family: Komu;
                    font-style: normal;
                    color: ${customColors.white};

                    @media screen and (max-width: 520px) {
                        font-size: 30px;
                    }
                }

                button {
                    width: 100%;
                    max-width: 301px;
                    margin-top: 20px;
                    border-radius: 0px;
                }
            }
        }

        &_point-score {
            .swiper {
                .swiper-wrapper {
                    margin-bottom: 28px;
                }
                .swiper-pagination {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .swiper-pagination-bullet {
                        width: 8px;
                        height: 8px;
                        background: ${customColors.white};
                    }

                    .swiper-pagination-bullet-active {
                        width: 10px;
                        height: 10px;
                    }
                }
            }
            
            span {
                gap: 10px;
                display: flex;
                color: #3E3E3E;
                font-size: 20px;
                font-weight: 900;
                margin-top: 10px;
                line-height: 150%;
                font-style: normal;
                font-family: Inter;
                align-items: center;
            }

            &_card {
                width: 100%;
                max-width: 411px;
                margin-top: 20px;

                .header {
                    display: flex;
                    align-items: center;
                    justify-content: space-evenly;
                    background: rgba(44, 44, 44, 0.73);

                    @media screen and (max-width: 520px) {
                        img {
                            width: 50px;
                            height: 50px;
                        }
                    }

                    .point {
                        color: #EE8A41;
                        font-size: 36px;

                        @media screen and (max-width: 520px) {
                            font-size: 22px;
                            white-space: nowrap;
                        }
                    }

                    .text {
                        font-size: 24px;
                        color: ${customColors.white};

                        @media screen and (max-width: 520px) {
                            font-size: 18px;
                            white-space: nowrap;
                        }
                    }

                    span {
                        font-weight: 400;
                        font-family: Komu;
                        line-height: 22px;
                        font-style: normal;
                    }
                }

                .table {
                    margin-top: 14px;
                    background: rgba(17, 17, 17, 0.67);
                    &_month {
                        padding: 28px;
                        font-size: 36px;
                        font-weight: 400;
                        font-family: Komu;
                        line-height: 22px;
                        font-style: normal;
                        color: ${customColors.white};

                        @media screen and (max-width: 520px) {
                            padding: 12px;
                        }
                    }

                    &_type {
                        display: flex;
                        padding: 0 36px;
                        align-items: center;
                        justify-content: space-between;
                        background: rgba(44, 44, 44, 0.73);

                        @media screen and (max-width: 520px) {
                            padding: 0 12px;
                        }

                        span {
                            font-size: 24px;
                            font-weight: 400;
                            font-family: Komu;
                            line-height: 22px;
                            font-style: normal;
                            color: ${customColors.white};
                        }
                    }

                    &_data {
                        &_row {
                            height: 56px;
                            display: flex;
                            padding: 0 20px;
                            border-radius: 8px;
                            align-items: center;
                            justify-content: space-between;
                            box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);

                            @media screen and (max-width: 520px) {
                                padding: 0 12px;
                            }

                            .name {
                                display: flex;
                                align-items: center;
                            }

                            .name, .score {
                                color: #FFF8F8;
                                font-size: 14px;
                                font-weight: 500;
                                line-height: 22px;
                                font-style: normal;
                                font-family: Inter;
                            }
                        }
                    }
                }
            }
        }

        &_ranking-table {
            margin-top: 18px;

            .top {
                padding: 26px 23px;
                background: #EE8A41;

                @media screen and (max-width: 520px) {
                    padding: 12px;
                }

                p {
                    font-size: 48px;
                    font-weight: 400;
                    font-family: Komu;
                    line-height: 24px;
                    font-style: normal;
                    margin-bottom: 5px;
                    color: ${customColors.white};

                    @media screen and (max-width: 520px) {
                        font-size: 40px;
                    }
                }

                span {
                    font-size: 12px;
                    font-weight: 700;
                    line-height: 24px;
                    font-style: normal;
                    font-family: Inter;
                    color: ${customColors.white};
                }
            }

            .ranking-data {
                background: rgba(0, 122, 90, 0.84);
                backdrop-filter: blur(4.650000095367432px);
                
                p {
                    font-size: 24px;
                    font-weight: 400;
                    font-family: Komu;
                    line-height: 24px;
                    font-style: normal;
                    padding: 19px 23px 0;
                    color: ${customColors.white};

                    @media screen and (max-width: 520px) {
                        padding: 12px;
                        font-size: 20px;
                    }
                }
                
                &_stars {
                    gap: 31px;
                    display: flex;
                    flex-wrap: wrap;
                    padding: 0 23px 8px;

                    @media screen and (max-width: 520px) {
                        gap: 15px;
                        padding: 12px;
                    }
                    
                    >div {
                        display: flex;
                        flex-direction: column;

                        .duration {
                            font-size: 16px;
                            font-weight: 400;
                            font-family: Komu;
                            line-height: 24px;
                            font-style: normal;
                            color: ${customColors.white};
                        }

                        .MuiRating-iconEmpty {
                            display: none;
                        }
                    }
                }

                &_table {
                    div:last-child {
                        display: none;
                    }
                    .MuiPaper-root {
                        border: none;
                        background: transparent;
                        table {
                            border-spacing: 0 12px;
                            border-collapse: separate;
                            thead {
                                background: #F5F5F5;

                                th:first-child {
                                    text-align: start;
                                }
                                
                                th {
                                    color: #434656;
                                    font-size: 12px;
                                    font-weight: 400;
                                    line-height: 20px;
                                    padding: 6px 16px;
                                }
                            }

                            tbody {
                                tr {
                                    background: #2EB67D;
                                    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);

                                    td:first-child {
                                        text-align: start;
                                        border-top-left-radius: 8px;
                                        border-bottom-left-radius: 8px;
                                    }

                                    td:last-child {
                                        border-top-right-radius: 8px;
                                        border-bottom-right-radius: 8px;
                                    }
                                    
                                    td {
                                        font-size: 14px;
                                        font-weight: 500;
                                        line-height: 22px;
                                        padding: 9px 16px;
                                        color: ${customColors.white};

                                        .serial {
                                            width: 32px;
                                            height: 32px;
                                            display: flex;
                                            border-radius: 50%;
                                            align-items: center;
                                            background: #353535;
                                            justify-content: center;
                                        }

                                        .score {
                                            font-size: 32px;
                                            font-weight: 400;
                                            font-family: komu;
                                            line-height: 22px;
                                            color: ${customColors.white};
                                        }

                                        .MuiRating-iconEmpty {
                                            display: none;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`