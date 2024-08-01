import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Rating } from '@mui/material';
import { Icons, Images } from 'assets';
import DataTable from 'components/table';
import { StyledLeaderboard } from './style';
import { Pagination } from 'swiper/modules';
import CustomButton from 'components/button';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

function createData(rank, user, rating, score) {
    return { rank, user, rating, score };
}

const rows = [
    createData(Icons.rank1, 'Luis Robert', '5', 2980),
    createData(Icons.rank2, 'Luis Robert', '5', 2980),
    createData(Icons.rank3, 'Luis Robert', '5', 2980),
    createData(Icons.rank4, 'Luis Robert', '4', 2980),
    createData(Icons.rank5, 'Luis Robert', '3', 2980),
    createData(Icons.rank5, 'Luis Robert', '2', 2980),
    createData(Icons.rank5, 'Luis Robert', '1', 2980)
];

const breakpoints = {
    320: {
        slidesPerView: 1,
    },
    768: {
        slidesPerView: 2,
    },
    1024: {
        slidesPerView: 2.5
    },
    1250: {
        slidesPerView: 3
    },
}

const Leaderboard = () => {
    const isLoading = false
    const navigate = useNavigate()

    const columns = [
        {
            label: "Rank",
            accessor: "rank",
            render: (item, index) => (
                index > 3 ? <div className='serial'>{index}</div>
                    : <img src={item.rank} alt='rank' />
            )
        },
        {
            label: "User",
            accessor: "user",
            render: (item) => (
                <span style={{
                    gap: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                >
                    <img src={Images.avatar2} alt='avatar' />
                    {item.user}
                </span>
            )
        },
        {
            label: "Rating",
            accessor: "rating",
            render: (item) => (
                <Rating
                    readOnly
                    value={item.rating}
                    sx={{ fontSize: '1rem', color: '#FFC700' }}
                />
            )
        },
        {
            label: "Score",
            accessor: "score",
            render: (item) => <span className='score'>{item.score}</span>
        },
    ];

    const renderCellContent = (item, column, index) => {
        const value = item[column.accessor];
        return column.render ? column.render(item, index) : value;
    };

    return (
        <StyledLeaderboard>
            <div className='leaderboard_banner'>
                <div className='leaderboard_banner_content'>
                    <p>Safety Observation</p>
                    <p>Leaderboards</p>
                    <CustomButton
                        text="New Observation "
                        clicked={() => navigate('/safety-observations/create')}
                        sxProps={{
                            bg: '#2EB67D',
                            height: '74px',
                            fontWeight: 700,
                            fontSize: "20px",
                        }}
                    />
                </div>
            </div>
            <div className='leaderboard_point-score'>
                <span>Point Score <ArrowRightAltIcon /></span>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={28}
                    pagination={true}
                    navigation={false}
                    modules={[Pagination]}
                    breakpoints={breakpoints}
                >
                    <SwiperSlide>
                        <div className="leaderboard_point-score_card">
                            <div className="header">
                                <span className='point'>1 Point</span>
                                <span className='text'>For Safety Observation</span>
                                <img src={Icons.point1} alt='point' />
                            </div>
                            <div className="table">
                                <div className='table_month'>
                                    Jan 2024
                                </div>
                                <div className='table_type'>
                                    <span>Safety Observation</span>
                                    <img src={Icons.socialLeaderboard} alt='social-leaderboard' />
                                </div>
                                <div className="table_data">
                                    <div
                                        className="table_data_row"
                                        style={{ background: 'rgba(102, 102, 102, 0.47)' }}
                                    >
                                        <span className="rank">
                                            <img src={Icons.rank1} alt='rank' />
                                        </span>
                                        <span className="name">
                                            <img src={Images.avatar2} alt='avatar' />
                                            Luis Robert
                                        </span>
                                        <span className="score">2980</span>
                                    </div>
                                    <div
                                        className="table_data_row"
                                        style={{ background: 'rgba(70, 70, 70, 0.47)' }}
                                    >
                                        <span className="rank">
                                            <img src={Icons.rank2} alt='rank' />
                                        </span>
                                        <span className="name">
                                            <img src={Images.avatar2} alt='avatar' />
                                            Luis Robert
                                        </span>
                                        <span className="score">2980</span>
                                    </div>
                                    <div
                                        className="table_data_row"
                                        style={{ background: 'rgba(49, 49, 49, 0.47)' }}
                                    >
                                        <span className="rank">
                                            <img src={Icons.rank3} alt='rank' />
                                        </span>
                                        <span className="name">
                                            <img src={Images.avatar2} alt='avatar' />
                                            Luis Robert
                                        </span>
                                        <span className="score">2980</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="leaderboard_point-score_card">
                            <div className="header">
                                <span className='point'>3 Points</span>
                                <span className='text'>For Picture</span>
                                <img src={Icons.point3} alt='point' />
                            </div>
                            <div className="table">
                                <div className='table_month'>
                                    Feb 2024
                                </div>
                                <div className='table_type'>
                                    <span>Pictures</span>
                                    <img src={Icons.socialLeaderboard} alt='social-leaderboard' />
                                </div>
                                <div className="table_data">
                                    <div
                                        className="table_data_row"
                                        style={{ background: 'rgba(102, 102, 102, 0.47)' }}
                                    >
                                        <span className="rank">
                                            <img src={Icons.rank1} alt='rank' />
                                        </span>
                                        <span className="name">
                                            <img src={Images.avatar2} alt='avatar' />
                                            Luis Robert
                                        </span>
                                        <span className="score">2980</span>
                                    </div>
                                    <div
                                        className="table_data_row"
                                        style={{ background: 'rgba(70, 70, 70, 0.47)' }}
                                    >
                                        <span className="rank">
                                            <img src={Icons.rank2} alt='rank' />
                                        </span>
                                        <span className="name">
                                            <img src={Images.avatar2} alt='avatar' />
                                            Luis Robert
                                        </span>
                                        <span className="score">2980</span>
                                    </div>
                                    <div
                                        className="table_data_row"
                                        style={{ background: 'rgba(49, 49, 49, 0.47)' }}
                                    >
                                        <span className="rank">
                                            <img src={Icons.rank3} alt='rank' />
                                        </span>
                                        <span className="name">
                                            <img src={Images.avatar2} alt='avatar' />
                                            Luis Robert
                                        </span>
                                        <span className="score">2980</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="leaderboard_point-score_card">
                            <div className="header">
                                <span className='point'>5 Points</span>
                                <span className='text'>For Action</span>
                                <img src={Icons.point5} alt='point' />
                            </div>
                            <div className="table">
                                <div className='table_month'>
                                    Mar 2024
                                </div>
                                <div className='table_type'>
                                    <span>Action</span>
                                    <img src={Icons.socialLeaderboard} alt='social-leaderboard' />
                                </div>
                                <div className="table_data">
                                    <div
                                        className="table_data_row"
                                        style={{ background: 'rgba(102, 102, 102, 0.47)' }}
                                    >
                                        <span className="rank">
                                            <img src={Icons.rank1} alt='rank' />
                                        </span>
                                        <span className="name">
                                            <img src={Images.avatar2} alt='avatar' />
                                            Luis Robert
                                        </span>
                                        <span className="score">2980</span>
                                    </div>
                                    <div
                                        className="table_data_row"
                                        style={{ background: 'rgba(70, 70, 70, 0.47)' }}
                                    >
                                        <span className="rank">
                                            <img src={Icons.rank2} alt='rank' />
                                        </span>
                                        <span className="name">
                                            <img src={Images.avatar2} alt='avatar' />
                                            Luis Robert
                                        </span>
                                        <span className="score">2980</span>
                                    </div>
                                    <div
                                        className="table_data_row"
                                        style={{ background: 'rgba(49, 49, 49, 0.47)' }}
                                    >
                                        <span className="rank">
                                            <img src={Icons.rank3} alt='rank' />
                                        </span>
                                        <span className="name">
                                            <img src={Images.avatar2} alt='avatar' />
                                            Luis Robert
                                        </span>
                                        <span className="score">2980</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="leaderboard_point-score_card">
                            <div className="header">
                                <span className='point'>1 Point</span>
                                <span className='text'>For Safety Observation</span>
                                <img src={Icons.point1} alt='point' />
                            </div>
                            <div className="table">
                                <div className='table_month'>
                                    Jan 2024
                                </div>
                                <div className='table_type'>
                                    <span>Safety Observation</span>
                                    <img src={Icons.socialLeaderboard} alt='social-leaderboard' />
                                </div>
                                <div className="table_data">
                                    <div
                                        className="table_data_row"
                                        style={{ background: 'rgba(102, 102, 102, 0.47)' }}
                                    >
                                        <span className="rank">
                                            <img src={Icons.rank1} alt='rank' />
                                        </span>
                                        <span className="name">
                                            <img src={Images.avatar2} alt='avatar' />
                                            Luis Robert
                                        </span>
                                        <span className="score">2980</span>
                                    </div>
                                    <div
                                        className="table_data_row"
                                        style={{ background: 'rgba(70, 70, 70, 0.47)' }}
                                    >
                                        <span className="rank">
                                            <img src={Icons.rank2} alt='rank' />
                                        </span>
                                        <span className="name">
                                            <img src={Images.avatar2} alt='avatar' />
                                            Luis Robert
                                        </span>
                                        <span className="score">2980</span>
                                    </div>
                                    <div
                                        className="table_data_row"
                                        style={{ background: 'rgba(49, 49, 49, 0.47)' }}
                                    >
                                        <span className="rank">
                                            <img src={Icons.rank3} alt='rank' />
                                        </span>
                                        <span className="name">
                                            <img src={Images.avatar2} alt='avatar' />
                                            Luis Robert
                                        </span>
                                        <span className="score">2980</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="leaderboard_point-score_card">
                            <div className="header">
                                <span className='point'>1 Point</span>
                                <span className='text'>For Safety Observation</span>
                                <img src={Icons.point1} alt='point' />
                            </div>
                            <div className="table">
                                <div className='table_month'>
                                    Jan 2024
                                </div>
                                <div className='table_type'>
                                    <span>Safety Observation</span>
                                    <img src={Icons.socialLeaderboard} alt='social-leaderboard' />
                                </div>
                                <div className="table_data">
                                    <div
                                        className="table_data_row"
                                        style={{ background: 'rgba(102, 102, 102, 0.47)' }}
                                    >
                                        <span className="rank">
                                            <img src={Icons.rank1} alt='rank' />
                                        </span>
                                        <span className="name">
                                            <img src={Images.avatar2} alt='avatar' />
                                            Luis Robert
                                        </span>
                                        <span className="score">2980</span>
                                    </div>
                                    <div
                                        className="table_data_row"
                                        style={{ background: 'rgba(70, 70, 70, 0.47)' }}
                                    >
                                        <span className="rank">
                                            <img src={Icons.rank2} alt='rank' />
                                        </span>
                                        <span className="name">
                                            <img src={Images.avatar2} alt='avatar' />
                                            Luis Robert
                                        </span>
                                        <span className="score">2980</span>
                                    </div>
                                    <div
                                        className="table_data_row"
                                        style={{ background: 'rgba(49, 49, 49, 0.47)' }}
                                    >
                                        <span className="rank">
                                            <img src={Icons.rank3} alt='rank' />
                                        </span>
                                        <span className="name">
                                            <img src={Images.avatar2} alt='avatar' />
                                            Luis Robert
                                        </span>
                                        <span className="score">2980</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className='leaderboard_ranking-table'>
                <div className='top'>
                    <p>Leaderboard</p>
                    <span>Leaderboard for May 2024</span>
                </div>
                <div className='ranking-data'>
                    <p>star ranking system based on the frequency of a task</p>
                    <div className='ranking-data_stars'>
                        <div>
                            <Rating
                                readOnly
                                value={5}
                                sx={{ fontSize: '1rem', color: '#FFC700' }}
                            />
                            <span className='duration'>Every day</span>
                        </div>
                        <div>
                            <Rating
                                readOnly
                                value={4}
                                sx={{ fontSize: '1rem', color: '#FFC700' }}
                            />
                            <span className='duration'>2 Times in a week</span>
                        </div>
                        <div>
                            <Rating
                                readOnly
                                value={3}
                                sx={{ fontSize: '1rem', color: '#FFC700' }}
                            />
                            <span className='duration'>Every Week</span>
                        </div>
                        <div>
                            <Rating
                                readOnly
                                value={2}
                                sx={{ fontSize: '1rem', color: '#FFC700' }}
                            />
                            <span className='duration'>Every Other Week</span>
                        </div>
                        <div>
                            <Rating
                                readOnly
                                value={1}
                                sx={{ fontSize: '1rem', color: '#FFC700' }}
                            />
                            <span className='duration'>Every Month</span>
                        </div>
                    </div>
                    <div className='ranking-data_table'>
                        <DataTable
                            data={rows}
                            columns={columns}
                            isLoading={isLoading}
                            renderCellContent={renderCellContent}
                        />
                    </div>
                </div>
            </div>
        </StyledLeaderboard>
    )
}

export default Leaderboard
