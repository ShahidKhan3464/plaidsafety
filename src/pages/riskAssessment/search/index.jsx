import React, { useRef, useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Icons } from 'assets';
import { Formik } from 'formik';
import { FormControl } from 'utils';
import DataTable from 'components/table';
import Dropdown from 'components/dropDown';
import { IconButton } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import CustomButton from 'components/button';
import { customColors } from 'theme/pallete';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PAYLOAD_DATA, STATUS_COLORS } from 'constants';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { category, department, site, status } from 'constants/dropdownValues';
import { StyledTopHeader, StyledSearchData, StyledDropdownStatus } from 'styles/global';
import { searchReport, updateReport } from 'provider/features/hazardReport/hazardReport.slice';

function createData(id, title, date, division, department, location, category, status) {
  return { id, title, date, division, department, location, category, status };
}

const rows = [
  createData('RA232', 'Conveyor E-Stop - additions', '11/15/2023', 'SFS', 'Warehouse', 'Production', 'Task', 'completed'),
  createData('RA232', 'Conveyor E-Stop - additions', '11/15/2023', 'SFS', 'Warehouse', 'Production', 'Task', 'completed'),
  createData('RA232', 'Conveyor E-Stop - additions', '11/15/2023', 'SFS', 'Warehouse', 'Production', 'Task', 'completed'),
];

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formikRef = useRef(null);
  const [riskIds, setRiskIds] = useState();
  const [isSearched, setIsSearched] = useState(false);
  const [payload, setPayload] = useState(PAYLOAD_DATA);
  const [isSearching, setIsSearching] = useState(false);
  const { data, totalRecords } = useSelector((state) => state.hazardReport.search);

  const initialValues = {
    riskId: '',
    date: null,
    status: '',
    division: '',
    category: '',
    department: '',
  };

  const columns = [
    {
      label: 'Risk ID',
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
      label: 'Department',
      accessor: 'department'
    },
    {
      label: 'Location',
      accessor: 'location'
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
  ];

  const renderCellContent = (item, column) => {
    const value = item[column.accessor];
    return column.render ? column.render(item) : value;
  };

  const handleUpdateReport = async (name, value, id) => {
    const data = { status: value };
    dispatch(updateReport({ id, data }));
  };

  const riskAssessmentStatusSelectBox = (id, reportStatus) => {
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
    const retrievedRiskIds = response.data.map((item) => {
      return {
        text: item.hazardId,
        value: item.hazardId
      };
    });
    setRiskIds(retrievedRiskIds);
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
          <img src={Icons.riskAssessment} alt="risk-assessment" />
          <h2>Search Risk Assessment</h2>
        </div>
        <div className="right">
          <CustomButton
            text="Add New"
            clicked={() => navigate('/risk-assessment/new')}
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
                      name="riskId"
                      formik={formik}
                      label="Risk ID"
                      control="select"
                      options={riskIds}
                      placeholder="Select one"
                      value={formik.values.riskId}
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
                      formik={formik}
                      control="select"
                      name="department"
                      label="Department"
                      options={department}
                      placeholder="Select one"
                      value={formik.values.department}
                    />
                  </div>
                  <div>
                    <FormControl
                      name="category"
                      formik={formik}
                      label="Category"
                      control="select"
                      options={category}
                      placeholder="Select one"
                      value={formik.values.category}
                    />
                  </div>
                </div>

                <div className="search_data_field-control">
                  <div>
                    <FormControl
                      name="date"
                      control="date"
                      formik={formik}
                      label="Date Created"
                      placeholder="mm/dd/yyyyy"
                      selectedDate={formik.values.date}
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

        {!isSearched && !isSearching && (
          <div className="search_data_list">
            <DataTable
              data={rows}
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