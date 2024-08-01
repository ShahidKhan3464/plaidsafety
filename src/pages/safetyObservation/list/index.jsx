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
import { STATUS_COLORS, PAYLOAD_DATA } from 'constants';
import { CircularProgress, IconButton } from '@mui/material';
import { status, hazardPresent } from 'constants/dropdownValues';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  searchSafety,
  updateSafety,
  setSafetyData,
  selectSearchStatus
} from 'provider/features/safetyObservation/safetyObservation.slice';
import {
  StyledTopHeader,
  StyledListModule,
  StyledDropdownStatus,
  StyledLoadingContainer,
} from "styles/global";

const List = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const safetyObservation = useSelector(selectSearchStatus);
  const { isLoading, data, totalRecords } = safetyObservation;
  const [payload, setPayload] = useState(PAYLOAD_DATA);
  const [filter, setFilter] = useState({
    status: "",
    stillPresent: "",
  });

  const getControlElements = () => {
    return (
      <div className="control-elements">
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
      label: "ID",
      accessor: "safetyObservationId",
      render: (item) => (
        <span
          className="module-id"
          onClick={() => navigate(`/safety-observations/update/${item._id}`)}
        >
          {item.safetyObservationId}
        </span>
      )
    },
    {
      label: "Date",
      accessor: "date",
      render: (item) => dayjs(item.date).format("MM/DD/YYYY"),
    },
    {
      label: "Safety Observation Details",
      accessor: "safetyObservationDetails",
      render: (item) => <p
        style={{ width: '181px', whiteSpace: 'normal' }}
      >
        {truncatedString(item.safetyObservationDetails)}
      </p>
    },
    {
      label: "Division/Site",
      accessor: "division",
      render: (item) => item.division.toUpperCase()
    },
    {
      label: "Location",
      accessor: "location",
    },
    {
      label: "Person Reporting",
      accessor: "informantName",
    },
    {
      label: "Shift",
      accessor: "shift",
    },
    {
      label: "Is the Hazard Still Present?",
      accessor: "stillPresent",
      render: (item) => (item.stillPresent ? "Yes" : "No"),
    },
    {
      label: "Status",
      accessor: "status",
      render: (item) => {
        return safetyObservationStatusSelectBox(item?._id, item?.status);
      },
    },
    {
      label: "Action",
      accessor: "action",
      render: (item) => (
        <IconButton
          onClick={() => {
            dispatch(setSafetyData(item));
            navigate(`/safety-observations/corrective-actions/${item.safetyObservationId}`)
          }}
        >
          <img src={Icons.note} alt="note" />
        </IconButton>
      ),
    },
  ];

  const renderCellContent = (item, column) => {
    const value = item[column.accessor];
    return column.render ? column.render(item) : value;
  };

  const buildCondition = () => {
    const condition = {};

    if (filter.status) {
      condition.status = filter.status;
    }

    if (filter.isHazardStillPresent) {
      condition.stillPresent = filter.isHazardStillPresent === 'yes';
    }

    return condition;
  };

  const handleUpdateSafety = async (name, value, id) => {
    const data = { status: value };
    dispatch(updateSafety({ id, data, successCallback: () => getData() }));
  };

  const safetyObservationStatusSelectBox = (id, safetyStatus) => {
    return (
      <StyledDropdownStatus
        color={
          STATUS_COLORS[safetyStatus.replace(/\s/g, '').toUpperCase()]?.color
        }
        bg={
          STATUS_COLORS[safetyStatus.replace(/\s/g, '').toUpperCase()]
            ?.background
        }
      >
        <Dropdown
          name=""
          options={status}
          defaultValue={safetyStatus}
          endIcon={<KeyboardArrowDownIcon />}
          handleFilterChange={(name, value) =>
            handleUpdateSafety(name, value, id)
          }
        />
      </StyledDropdownStatus>
    );
  };

  const handleFilterChange = (name, value) => {
    setFilter({ ...filter, [name]: value });
    setPayload((prevData) => ({
      ...prevData,
      page: 1,
    }));
  };

  const getData = useCallback(() => {
    const updatedPayload = {
      ...payload,
      condition: buildCondition()
    };
    dispatch(searchSafety({ data: updatedPayload }));
  }, [dispatch, payload, filter]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <StyledListModule>
      <StyledTopHeader>
        <div className="left">
          <div>
            <img
              src={Icons.safetyObservationLog}
              alt="safety-observation-log"
            />
            <h2>Safety Observation Log</h2>
          </div>
          {getControlElements()}
        </div>
        <div className="right">
          <CustomButton
            text="Leaderboard"
            variant="outlined"
            tColor={customColors.secondary}
            borderColor={customColors.secondary}
            clicked={() => navigate('/safety-observations/leaderboard')}
            sxProps={{
              width: '168px',
              height: '52px',
              fontWeight: 600,
              fontSize: "16px",
              bg: customColors.secondary,
            }}
          />
          <CustomButton
            text="Search"
            variant="outlined"
            tColor={customColors.secondary}
            borderColor={customColors.secondary}
            clicked={() => navigate('/safety-observations/search')}
            sxProps={{
              width: '151px',
              height: '52px',
              fontWeight: 600,
              fontSize: "16px",
              bg: customColors.secondary,
            }}
          />
          <CustomButton
            text="Add New"
            clicked={() => navigate('/safety-observations/create')}
            sxProps={{
              width: '167px',
              height: '52px',
              fontWeight: 600,
              fontSize: "16px",
              bg: customColors.secondary,
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
              No observations found
            </p>
          )
        )}

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
