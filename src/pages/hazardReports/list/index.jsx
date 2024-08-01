import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Icons } from 'assets';
import { truncatedString } from 'utils';
import DataTable from 'components/table';
import Dropdown from 'components/dropDown';
import CustomButton from 'components/button';
import { customColors } from 'theme/pallete';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, IconButton } from '@mui/material';
import { PRIORITY_STATUS, STATUS_COLORS, PAYLOAD_DATA } from 'constants';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { priority, status, hazardPresent } from 'constants/dropdownValues';
import {
  searchReport,
  updateReport,
  setReportData
} from 'provider/features/hazardReport/hazardReport.slice';
import {
  StyledPriority,
  StyledTopHeader,
  StyledListModule,
  StyledDropdownStatus,
  StyledLoadingContainer,
} from 'styles/global';

const List = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState(PAYLOAD_DATA);
  const { isLoading, data, totalRecords } = useSelector((state) => state.hazardReport.search);
  const [filter, setFilter] = useState({
    priority: '',
    status: '',
    isHazardStillPresent: ''
  });

  const getControlElements = () => {
    return (
      <div className="control-elements">
        <Dropdown
          name="priority"
          options={priority}
          defaultValue="Risk Ranking"
          handleFilterChange={handleFilterChange}
        />
        <Dropdown
          name="status"
          options={status}
          defaultValue="Status"
          handleFilterChange={handleFilterChange}
        />
        <Dropdown
          options={hazardPresent}
          name="isHazardStillPresent"
          defaultValue="Is hazard still present"
          handleFilterChange={handleFilterChange}
        />
      </div>
    );
  };

  const columns = [
    {
      label: 'Hazard ID',
      accessor: 'id',
      render: (item) => (
        <span
          className="module-id"
          onClick={() => navigate(`/hazard-reports/updateReport/${item._id}`)}
        >
          {item.hazardId}
        </span>
      )
    },
    {
      label: 'Hazard Detail',
      accessor: 'hazardDetails',
      render: (item) => <p
        style={{ width: '181px', whiteSpace: 'normal' }}
      >
        {truncatedString(item.hazardDetails)}
      </p>
    },
    {
      label: 'Person Reporting',
      accessor: 'informantName',
    },
    {
      label: 'Division/Site',
      accessor: 'division',
      render: (item) => item.division.toUpperCase()
    },
    {
      label: 'Location',
      accessor: 'location'
    },
    {
      label: 'Shift',
      accessor: 'shift'
    },
    {
      label: 'Is the Hazard Still Present?',
      accessor: 'stillPresent',
      render: (item) => (item.stillPresent ? 'Yes' : 'No')
    },
    {
      label: 'Date',
      accessor: 'date',
      render: (item) => dayjs(item.date).format('MM/DD/YYYY')
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
      label: 'Status',
      accessor: 'status',
      render: (item) => hazardReportStatusSelectBox(item?._id, item?.status)
    },
    {
      label: 'Action',
      accessor: 'action',
      render: (item) => (
        <IconButton
          onClick={() => {
            dispatch(setReportData(item));
            navigate(`/hazard-reports/corrective-actions/${item.hazardId}`)
          }}
        >
          <img src={Icons.note} alt="note" />
        </IconButton>
      )
    }
  ];

  const renderCellContent = (item, column) => {
    const value = item[column.accessor];
    return column.render ? column.render(item) : value;
  };

  const buildCondition = () => {
    const condition = {};

    if (filter.priority) {
      condition.priority = filter.priority;
    }

    if (filter.status) {
      condition.status = filter.status;
    }

    if (filter.isHazardStillPresent) {
      condition.stillPresent = filter.isHazardStillPresent === 'yes';
    }

    return condition;
  };

  const handleUpdateReport = async (name, value, id) => {
    const data = { status: value };
    dispatch(updateReport({ id, data, successCallback: () => getData() }));
  };

  const hazardReportStatusSelectBox = (id, reportStatus) => {
    return (
      <StyledDropdownStatus
        color={
          STATUS_COLORS[reportStatus.replace(/\s/g, '').toUpperCase()]?.color
        }
        bg={
          STATUS_COLORS[reportStatus.replace(/\s/g, '').toUpperCase()]
            ?.background
        }
      >
        <Dropdown
          name=""
          options={status}
          defaultValue={reportStatus}
          endIcon={<KeyboardArrowDownIcon />}
          handleFilterChange={(name, value) =>
            handleUpdateReport(name, value, id)
          }
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
            <img src={Icons.hazardReport} alt="hazard-report" />
            <h2>Hazard Report Log</h2>
          </div>
          {getControlElements()}
        </div>
        <div className="right">
          <CustomButton
            text="Search"
            variant="outlined"
            tColor={customColors.secondary}
            borderColor={customColors.secondary}
            clicked={() => navigate('/hazard-reports/search')}
            sxProps={{
              width: '151px',
              height: '52px',
              fontWeight: 600,
              fontSize: '16px',
              bg: customColors.secondary
            }}
          />
          <CustomButton
            text="Add New"
            clicked={() => navigate('/hazard-reports/create')}
            sxProps={{
              width: '167px',
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
          !totalRecords && (
            <p
              className="no-content"
              style={{
                minHeight: 'calc(100vh - 345px)'
              }}
            >
              No reports found
            </p>
          ))}

        {!!totalRecords && !isLoading && (
          <DataTable
            data={data}
            payload={payload}
            columns={columns}
            isLoading={isLoading}
            setPayload={setPayload}
            totalRecords={totalRecords}
            renderCellContent={renderCellContent}
          />
        )}
      </div>
    </StyledListModule>
  );
};

export default List;
