import React, { useRef, useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Icons } from "assets";
import { Formik } from "formik";
import DataTable from "components/table";
import { PAYLOAD_DATA } from "constants";
import Dropdown from "components/dropDown";
import { STATUS_COLORS } from "constants";
import { IconButton } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import CustomButton from "components/button";
import { customColors } from "theme/pallete";
import { useNavigate } from "react-router-dom";
import { FormControl, truncatedString } from "utils";
import { useDispatch, useSelector } from "react-redux";
import { department, site, status } from "constants/dropdownValues";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  searchSafety,
  selectSearchStatus,
  updateSafety,
} from "provider/features/safetyObservation/safetyObservation.slice";
import {
  StyledTopHeader,
  StyledSearchData,
  StyledDropdownStatus,
} from "styles/global";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formikRef = useRef(null);
  const [safetyIds, setSafetyIds] = useState();
  const [isSearched, setIsSearched] = useState(false);
  const [payload, setPayload] = useState(PAYLOAD_DATA);
  const [isSearching, setIsSearching] = useState(false);
  const safetyObservation = useSelector(selectSearchStatus);
  const { data, totalRecords } = safetyObservation;

  const initialValues = {
    date: null,
    status: "",
    division: "",
    department: "",
    stillPresent: "",
    safetyObservationId: "",
  };

  const columns = [
    {
      label: "ID",
      accessor: "safetyObservationId",
      render: (item) => (
        <span
          className="module-id"
        // onClick={() => navigate(`/hazard-reports/updateReport/${item._id}`)}
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
      label: "Department",
      accessor: "department",
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
  ];

  const renderCellContent = (item, column) => {
    const value = item[column.accessor];
    return column.render ? column.render(item) : value;
  };

  const handleUpdateSafety = async (name, value, id) => {
    const data = { status: value };
    dispatch(updateSafety({ id, data }));
  };

  const safetyObservationStatusSelectBox = (id, safetyStatus) => {
    return (
      <StyledDropdownStatus
        color={
          STATUS_COLORS[safetyStatus.replace(/\s/g, "").toUpperCase()]?.color
        }
        bg={
          STATUS_COLORS[safetyStatus.replace(/\s/g, "").toUpperCase()]
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

  const searchSafetySuccess = (response) => {
    if (response.totalRecords === 0) {
      enqueueSnackbar("No reports found", { variant: "success" });
      return;
    }
    setIsSearched(true);
  };

  const handleSubmit = async (data) => {
    setIsSearching(true);
    const { safetyObservationId, department, date, status, division } = data;
    const obj = {
      date,
      status,
      division,
      safetyObservationId,
      department: department.toLowerCase(),
    };

    if (data?.stillPresent) {
      obj.stillPresent = data.stillPresent === "Yes";
    }

    const conditionObj = { condition: { ...obj } };

    await dispatch(
      searchSafety({
        data: conditionObj,
        successCallback: searchSafetySuccess,
      })
    );
    setIsSearching(false);
  };

  const successCallback = (response) => {
    const retrievedReportIds = response.data.map((item) => {
      return {
        text: item.safetyObservationId,
        value: item.safetyObservationId,
      };
    });
    setSafetyIds(retrievedReportIds);
  };

  const getSafetyObservation = useCallback(() => {
    const updatedPayload = {
      ...payload,
      pageSize: 1000000,
    };
    dispatch(searchSafety({ data: updatedPayload, successCallback }));
  }, [dispatch, payload]);

  useEffect(() => {
    getSafetyObservation();
  }, [getSafetyObservation]);

  return (
    <StyledSearchData>
      <StyledTopHeader>
        <div className="flex-row">
          <IconButton onClick={() => navigate(-1)}>
            <KeyboardBackspaceIcon />
          </IconButton>
          <img src={Icons.safetyObservationLog} alt="safety-observation" />
          <h2>Safety Observation Search</h2>
        </div>
        <div className="right">
          <CustomButton
            text="New Observation"
            clicked={() => navigate("/safety-observations/create")}
            sxProps={{
              width: "230px",
              height: "52px",
              fontWeight: 600,
              fontSize: "16px",
              bg: customColors.secondary,
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
                      formik={formik}
                      control="select"
                      options={safetyIds}
                      placeholder="Select one"
                      name="safetyObservationId"
                      label="Safety Observation ID"
                      value={formik.values.safetyObservationId}
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
                      { value: "Yes", label: "Yes" },
                      { value: "No", label: "No" },
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
                      width: "151px",
                      height: "52px",
                      fontWeight: 600,
                      fontSize: "16px",
                      bg: customColors.secondary,
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