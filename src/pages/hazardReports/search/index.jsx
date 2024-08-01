import React, { useRef, useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Icons } from 'assets';
import { Formik } from 'formik';
import DataTable from 'components/table';
import { PAYLOAD_DATA } from 'constants';
import Dropdown from 'components/dropDown';
import { IconButton } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import CustomButton from 'components/button';
import { customColors } from 'theme/pallete';
import { useNavigate } from 'react-router-dom';
import { FormControl, truncatedString } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { PRIORITY_STATUS, STATUS_COLORS } from 'constants';
import { shift, site, status } from 'constants/dropdownValues';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { searchReport, updateReport } from 'provider/features/hazardReport/hazardReport.slice';
import {
  StyledPriority,
  StyledTopHeader,
  StyledSearchData,
  StyledDropdownStatus
} from 'styles/global';

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formikRef = useRef(null);
  const [reportIds, setReportIds] = useState();
  const [isSearched, setIsSearched] = useState(false);
  const [payload, setPayload] = useState(PAYLOAD_DATA);
  const [isSearching, setIsSearching] = useState(false);
  const { data, totalRecords } = useSelector((state) => state.hazardReport.search);

  const initialValues = {
    hazardId: '',
    shift: '',
    date: null,
    status: '',
    division: '',
    stillPresent: ''
  };

  const columns = [
    {
      label: 'Hazard ID',
      accessor: 'hazardId',
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
      render: (item) => item.division
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
  ];

  const renderCellContent = (item, column) => {
    const value = item[column.accessor];
    return column.render ? column.render(item) : value;
  };

  const handleUpdateReport = async (name, value, id) => {
    const data = { status: value };
    dispatch(updateReport({ id, data }));
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

  const searchReportSuccess = (response) => {
    if (response.total === 0) {
      enqueueSnackbar('No reports found', { variant: 'success' });
      return;
    }
    setIsSearched(true);
  }

  const handleSubmit = async (data) => {
    setIsSearching(true);
    const { hazardId, shift, date, status, division } = data
    const obj = {
      date,
      shift,
      hazardId,
      division,
      status: status,
    }

    if (data?.stillPresent) {
      obj.stillPresent = data.stillPresent === 'Yes';
    }

    const conditionObj = { condition: { ...obj } };

    await dispatch(searchReport({
      data: conditionObj,
      successCallback: searchReportSuccess
    }));
    setIsSearching(false);
  };

  const successCallback = (response) => {
    const retrievedReportIds = response.data.map((item) => {
      return {
        text: item.hazardId,
        value: item.hazardId
      };
    });
    setReportIds(retrievedReportIds);
  }

  const getHazardReport = useCallback(async () => {
    const updatedPayload = {
      ...payload,
      pageSize: 1000000,
    };
    dispatch(searchReport({ data: updatedPayload, successCallback }));
  }, [dispatch, payload]);

  useEffect(() => {
    getHazardReport()
  }, [getHazardReport]);

  return (
    <StyledSearchData>
      <StyledTopHeader>
        <div className="flex-row">
          <IconButton onClick={() => navigate(-1)}>
            <KeyboardBackspaceIcon />
          </IconButton>
          <img src={Icons.hazardReport} alt="hazard-report" />
          <h2>Hazard Report Search</h2>
        </div>
        <div className="right">
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
      <div className="search_data">
        <Formik
          innerRef={formikRef}
          onSubmit={handleSubmit}
          initialValues={initialValues}
        >
          {(formik) => {
            return (
              <form onSubmit={formik.handleSubmit}>
                <div className="search_data_field-control">
                  <div>
                    <FormControl
                      name="hazardId"
                      formik={formik}
                      control="select"
                      options={reportIds}
                      placeholder="Select one"
                      label="Hazard Report ID"
                      value={formik.values.hazardId}
                    />
                  </div>
                  <div>
                    <FormControl
                      options={site}
                      name="division"
                      formik={formik}
                      control="select"
                      label="Division / Site"
                      placeholder="Select one"
                      value={formik.values.division}
                    />
                  </div>
                </div>

                <div className="search_data_field-control">
                  <div>
                    <FormControl
                      name="shift"
                      label="Shift"
                      formik={formik}
                      options={shift}
                      control="select"
                      placeholder="Select one"
                      value={formik.values.shift}
                    />
                  </div>
                  <div>
                    <FormControl
                      name="status"
                      label="Status"
                      formik={formik}
                      options={status}
                      control="select"
                      placeholder="Select one"
                      value={formik.values.status}
                    />
                  </div>
                </div>

                <div className="search_data_field-control">
                  <div>
                    <FormControl
                      name="date"
                      label="Date"
                      control="date"
                      formik={formik}
                      placeholder="mm/dd/yyyyy"
                      selectedDate={formik.values.date}
                    />
                  </div>
                  <div></div>
                </div>

                <div className="search_data_field-control">
                  <FormControl
                    control="radio"
                    formik={formik}
                    name="stillPresent"
                    value={formik.values.stillPresent}
                    label="Is the hazard still present?"
                    options={[
                      { value: 'Yes', label: 'Yes' },
                      { value: 'No', label: 'No' }
                    ]}
                  />
                  <div></div>
                </div>

                <div className="search_data_btn-container">
                  <CustomButton
                    text="Search"
                    type="submit"
                    loading={isSearching}
                    disabled={isSearching || !formik.dirty || !formik.isValid}
                    sxProps={{
                      width: '151px',
                      height: '52px',
                      fontWeight: 600,
                      fontSize: '16px',
                      bg: customColors.secondary
                    }}
                  />
                </div>
              </form>
            );
          }}
        </Formik>

        {isSearched && !isSearching && (
          <div className="search_data_list">
            <DataTable
              data={data}
              payload={payload}
              columns={columns}
              isLoading={isSearching}
              setPayload={setPayload}
              totalRecords={totalRecords}
              renderCellContent={renderCellContent}
            />
          </div>
        )}
      </div>
    </StyledSearchData>
  );
};

export default Search;