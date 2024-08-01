import React, { useCallback, useEffect } from 'react';
import dayjs from 'dayjs';
import { Icons } from 'assets';
import DataTable from 'components/table';
import CustomButton from 'components/button';
import { customColors } from 'theme/pallete';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { STATUS_COLORS, PRIORITY_STATUS } from 'constants';
import { Box, CircularProgress, IconButton } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { searchReport } from 'provider/features/hazardReport/hazardReport.slice';
import { StyledLoadingContainer, StyledPriority, StyledStatus, StyledCorrectiveAction, StyledTopHeader } from 'styles/global';

const List = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { data, isLoading } = useSelector((state) => state.hazardReport.search);
    const correctiveActions = data?.[0]?.correctiveAction

    const actionReportStatus = (status) => {
        return (
            <StyledStatus
                color={
                    STATUS_COLORS[status.replace(/\s/g, '').toUpperCase()]?.color
                }
                bg={
                    STATUS_COLORS[status.replace(/\s/g, '').toUpperCase()]
                        ?.background
                }
            >
                {status}
            </StyledStatus>
        );
    };

    const columns = [
        {
            label: 'Action Title',
            accessor: 'actionTitle',
        },
        { label: 'Raised by User', accessor: 'raisedByUser' },
        {
            label: 'For User',
            accessor: 'forUser'
        },
        {
            label: 'Risk Ranking',
            accessor: 'priority',
            render: (item) => (
                <StyledPriority
                    color={PRIORITY_STATUS[item.priority.toUpperCase()]?.color}
                    bg={PRIORITY_STATUS[item.priority.toUpperCase()]?.background}
                >
                    {item.priority}
                </StyledPriority>
            )
        },
        {
            label: 'Due Date',
            accessor: 'date',
            render: (item) => dayjs(item.date).format('MM/DD/YYYY')
        },
        {
            label: 'Status',
            accessor: 'status',
            render: (item) => actionReportStatus(item.status)
        },
        {
            label: 'Action',
            accessor: 'action',
            render: (item) => (
                <IconButton
                    onClick={() => {
                        const urlWithQueryParams =
                            `/hazard-reports/update-corrective-action/${item._id}?hazardId=${id}`;
                        navigate(urlWithQueryParams)
                    }}
                >
                    <img src={Icons.action} alt="note" />
                </IconButton>
            )
        }
    ];

    const renderCellContent = (item, column) => {
        const value = item[column.accessor];
        return column.render ? column.render(item) : value;
    };

    const getData = useCallback(async () => {
        const data = { condition: { hazardId: id } };
        dispatch(searchReport({ data }));
    }, [id, dispatch]);

    useEffect(() => {
        getData()
    }, [getData]);

    return (
        <StyledCorrectiveAction>
            <StyledTopHeader>
                <div className="flex-row">
                    <IconButton onClick={() => navigate(-1)}>
                        <KeyboardBackspaceIcon />
                    </IconButton>
                    <img src={Icons.correctiveAction} alt="corrective-action" />
                    <h2>New Corrective Action</h2>
                </div>
                <span>
                    Hazard Report ID:{' '}
                    {id}
                </span>
            </StyledTopHeader>
            <div className='list'>
                <Box
                    sx={{
                        gap: 1,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <h2>Actions</h2>
                    <CustomButton
                        text="Add New"
                        clicked={() => navigate('/hazard-reports/add-corrective-action')}
                        sxProps={{
                            width: '167px',
                            height: '52px',
                            fontWeight: 600,
                            fontSize: '16px',
                            bg: customColors.secondary
                        }}
                    />
                </Box>
                <p>Hazard Report Actions</p>

                {isLoading ? (
                    <StyledLoadingContainer style={{ minHeight: 'auto' }}>
                        <CircularProgress />
                    </StyledLoadingContainer>
                ) : (!correctiveActions?.length && (
                    <p className="no-content">
                        No actions found
                    </p>
                ))}

                {!!correctiveActions?.length && (
                    <DataTable
                        columns={columns}
                        data={correctiveActions || []}
                        renderCellContent={renderCellContent}
                    />
                )}

                {correctiveActions?.length > 0 && (
                    <p className='entries'>
                        Showing {correctiveActions.length} of {correctiveActions.length} Entries
                    </p>
                )}
            </div>
        </StyledCorrectiveAction>
    )
}

export default List
