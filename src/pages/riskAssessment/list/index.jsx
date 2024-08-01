import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Icons } from 'assets';
import DataTable from 'components/table';
import Dropdown from 'components/dropDown';
import CustomButton from 'components/button';
import { customColors } from 'theme/pallete';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS_COLORS, PAYLOAD_DATA } from 'constants';
import { status, category } from 'constants/dropdownValues';
import { CircularProgress, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  searchReport,
  updateReport,
  setReportData
} from 'provider/features/hazardReport/hazardReport.slice';
import {
  StyledTopHeader,
  StyledListModule,
  StyledDropdownStatus,
  StyledLoadingContainer,
} from 'styles/global';

function createData(id, title, date, division, location, leader, category, status) {
  return { id, title, date, division, location, leader, category, status };
}

const rows = [
  createData('RA232', 'Conveyor E-Stop - additions', '11/15/2023', 'SFS', 'Production', 'Allyson chu', 'Task', 'completed'),
  createData('RA232', 'Conveyor E-Stop - additions', '11/15/2023', 'SFS', 'Production', 'Allyson chu', 'Task', 'completed'),
  createData('RA232', 'Conveyor E-Stop - additions', '11/15/2023', 'SFS', 'Production', 'Allyson chu', 'Task', 'completed'),
];

const List = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState(PAYLOAD_DATA);
  const [filter, setFilter] = useState({ status: '', category: '' });
  const { isLoading, data, totalRecords } = useSelector((state) => state.hazardReport.search);

  const getControlElements = () => {
    return (
      <div className="control-elements">
        <Dropdown
          name="category"
          options={category}
          defaultValue="Category"
          handleFilterChange={handleFilterChange}
        />
        <Dropdown
          name="status"
          options={status}
          defaultValue="Status"
          handleFilterChange={handleFilterChange}
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
      label: 'Title',
      accessor: 'title',
    },
    {
      label: 'Date',
      accessor: 'date',
      render: (item) => dayjs(item.date).format('MM/DD/YYYY')
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
      label: 'Leader',
      accessor: 'leader'
    },
    {
      label: 'Category',
      accessor: 'category',
    },
    {
      label: 'Status',
      accessor: 'status',
      render: (item) => riskAssessmentStatusSelectBox(item?._id, item?.status)
    },
    {
      label: 'Action',
      accessor: 'action',
      render: (item) => (
        <IconButton
          onClick={() => {
            dispatch(setReportData(item));
            // navigate(`/hazard-reports/corrective-actions/${item.hazardId}`)
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

  const riskAssessmentStatusSelectBox = (id, riskStatus) => {
    return (
      <StyledDropdownStatus
        color={
          STATUS_COLORS[riskStatus.replace(/\s/g, '').toUpperCase()]?.color
        }
        bg={
          STATUS_COLORS[riskStatus.replace(/\s/g, '').toUpperCase()]
            ?.background
        }
      >
        <Dropdown
          name=""
          options={status}
          defaultValue={riskStatus}
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
            <img src={Icons.riskAssessment} alt="risk-assessment" />
            <h2>Risk Assessment Log</h2>
          </div>
          {getControlElements()}
        </div>
        <div className="right">
          <CustomButton
            text="Search"
            variant="outlined"
            tColor={customColors.secondary}
            borderColor={customColors.secondary}
            clicked={() => navigate('/risk-assessment/search')}
            sxProps={{
              width: '151px',
              height: '52px',
              fontWeight: 600,
              fontSize: '16px',
              bg: customColors.secondary
            }}
          />
          <CustomButton
            text="Add Risk Assessment"
            clicked={() => navigate('/risk-assessment/new')}
            sxProps={{
              width: '206px',
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
              No data found
            </p>
          ))}

        {!!totalRecords && !isLoading && (
          <DataTable
            data={rows}
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
