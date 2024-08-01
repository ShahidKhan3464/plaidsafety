import React, { useCallback, useEffect, useState } from 'react';
import { Icons } from 'assets';
import DataTable from 'components/table';
import Dropdown from 'components/dropDown';
import CustomButton from 'components/button';
import { customColors } from 'theme/pallete';
import { useNavigate } from 'react-router-dom';
import { priority } from 'constants/dropdownValues';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS_COLORS, PAYLOAD_DATA } from 'constants';
import TableSearchHandler from 'components/tableSearchField';
import { Box, CircularProgress, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { searchReport, updateReport } from 'provider/features/hazardReport/hazardReport.slice';
import { StyledTopHeader, StyledListModule, StyledDropdownStatus, StyledLoadingContainer } from 'styles/global';

function createData(id, firstName, lastName, email, phoneNo, role, status) {
    return { id, firstName, lastName, email, phoneNo, role, status };
}

const rows = [
    createData('UR31505', 'James Dupont', 'John Doe', 'jmesdupont25@gmail.com', '+(645) 545 6453', 'HR Manager', 'Active'),
    createData('UR31505', 'James Dupont', 'John Doe', 'jmesdupont25@gmail.com', '+(645) 545 6453', 'HR Manager', 'In-active')
];

const List = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [payload, setPayload] = useState(PAYLOAD_DATA);
    const [filter, setFilter] = useState({ role: '', status: '' });
    const { isLoading, data, totalRecords } = useSelector((state) => state.hazardReport.search);

    const getControlElements = () => {
        return (
            <div className="control-elements">
                <Dropdown
                    name="role"
                    options={priority}
                    defaultValue="Role"
                    handleFilterChange={handleFilterChange}
                />
                <Dropdown
                    name="status"
                    defaultValue="Status"
                    handleFilterChange={handleFilterChange}
                    options={[
                        { value: 'active', text: 'Active' },
                        { value: 'in-active', text: 'In-active' },
                    ]}
                />
            </div>
        );
    };

    const columns = [
        {
            label: 'ID',
            accessor: 'id',
            render: (item) => (
                <span
                    className="module-id"
                // onClick={() => navigate(`/hazard-reports/updateReport/${item._id}`)}
                >
                    {item.id}
                </span>
            )
        },
        {
            label: 'First Name',
            accessor: 'firstName',
            render: (item) => <p>
                {item.firstName}
            </p>
        },
        {
            label: 'Last Name',
            accessor: 'lastName',
        },
        {
            label: 'Email',
            accessor: 'email',
        },
        {
            label: 'Phone Number',
            accessor: 'phoneNo'
        },
        {
            label: 'Role',
            accessor: 'role'
        },
        {
            label: 'Status',
            accessor: 'status',
            render: (item) =>
                hazardReportStatusSelectBox(item?._id, item?.status)
        },
        {
            label: 'Action',
            accessor: 'action',
            render: (item) => (
                <Box sx={{
                    gap: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                >
                    <IconButton sx={{ padding: '1px' }}>
                        <img src={Icons.edit} alt="edit" />
                    </IconButton>
                    <IconButton sx={{ padding: '1px' }}>
                        <img src={Icons.del} alt="del" />
                    </IconButton>
                </Box>
            )
        }
    ];

    const renderCellContent = (item, column) => {
        const value = item[column.accessor];
        return column.render ? column.render(item) : value;
    };

    const buildCondition = () => {
        const condition = {};

        if (filter.role) {
            condition.role = filter.role;
        }

        if (filter.status) {
            condition.status = filter.status;
        }

        return condition;
    };

    const handleSearchQueryChange = (value) => {
        setSearchQuery(value);
        setPayload((prevData) => ({
            ...prevData,
            page: 1,
            pageSize: value ? 10000 : 5
        }));
    };

    const handleUpdateReport = async (name, value, id) => {
        const data = { status: value };
        dispatch(updateReport({ id, data, successCallback: () => getData() }));
    };

    const hazardReportStatusSelectBox = (id, reportStatus) => {
        return (
            <StyledDropdownStatus
                color={
                    STATUS_COLORS[reportStatus.replace(/-/, "").toUpperCase()]?.color
                }
                bg={
                    STATUS_COLORS[reportStatus.replace(/-/, "").toUpperCase()]
                        ?.background
                }
            >
                <Dropdown
                    name=""
                    defaultValue={reportStatus}
                    endIcon={<KeyboardArrowDownIcon />}
                    handleFilterChange={(name, value) =>
                        handleUpdateReport(name, value, id)
                    }
                    options={[
                        { value: 'active', text: 'Active' },
                        { value: 'in-active', text: 'In-active' },
                    ]}
                />
            </StyledDropdownStatus>
        );
    };

    const handleFilterChange = (name, value) => {
        setFilter({ ...filter, [name]: value });
        setPayload((prevData) => ({
            ...prevData,
            page: 1
        }));
    };

    const getData = useCallback(() => {
        const updatedPayload = {
            ...payload,
            condition: buildCondition()
        };
        dispatch(searchReport({ data: updatedPayload }));
    }, [payload, filter]);

    useEffect(() => {
        getData()
    }, [getData]);

    return (
        <StyledListModule>
            <StyledTopHeader>
                <div className="left">
                    <div>
                        <img src={Icons.allUsers} alt="all-users" />
                        <h2>All Users</h2>
                    </div>
                    {getControlElements()}
                </div>
                <div className="right">
                    <TableSearchHandler
                        handleSearchQueryChange={(value) => handleSearchQueryChange(value)}
                    />
                    <CustomButton
                        text="Add User"
                        clicked={() => navigate('/users/add')}
                        sxProps={{
                            width: '140px',
                            height: '52px',
                            fontWeight: 600,
                            fontSize: '16px',
                            bg: customColors.secondary
                        }}
                    />
                </div>
            </StyledTopHeader>
            <div className="list">
                {isLoading ? (
                    <StyledLoadingContainer>
                        <CircularProgress />
                    </StyledLoadingContainer>
                ) : (
                    !!totalRecords && (
                        <p
                            className="no-content"
                            style={{
                                minHeight: 'calc(100vh - 345px)'
                            }}
                        >
                            No users found
                        </p>
                    ))}

                {!isLoading && (
                    <DataTable
                        data={rows}
                        payload={payload}
                        columns={columns}
                        isLoading={isLoading}
                        setPayload={setPayload}
                        totalRecords={rows.length}
                        renderCellContent={renderCellContent}
                    />
                )}
            </div>
        </StyledListModule>
    );
};

export default List;
