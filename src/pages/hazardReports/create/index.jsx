import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { Icons } from 'assets';
import { Formik } from 'formik';
import { STATUS_COLORS } from 'constants';
import { IconButton } from '@mui/material';
import Dropdown from 'components/dropDown';
import { customColors } from 'theme/pallete';
import CustomButton from 'components/button';
import FileUpload from 'components/fileUpload';
import { StyledCreateHazardReports } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import RiskRankingTable from 'components/riskRankingTable';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { FormControl, generateUniqueId, handleMultipleFiles } from 'utils';
import { StyledTextarea, StyledTopHeader, StyledDropdownStatus } from 'styles/global';
import {
  createReport,
  reportDetails,
  setReportData,
  updateReport
} from 'provider/features/hazardReport/hazardReport.slice';
import {
  site,
  shift,
  status,
  unsafeAct,
  department,
  riskRanking,
  riskRankingData,
  unsafeCondition,
} from 'constants/dropdownValues';

const riskRankingValues = ({
  Catastrophic: Array.from({ length: 5 }, (_, index) => (index + 1) * 5),
  Major: Array.from({ length: 5 }, (_, index) => (index + 1) * 4),
  Moderate: Array.from({ length: 5 }, (_, index) => (index + 1) * 3),
  Minor: Array.from({ length: 5 }, (_, index) => (index + 1) * 2),
  Insignificant: Array.from({ length: 5 }, (_, index) => index + 1)
});

const Create = () => {
  const formikRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: reportId } = useParams();
  const [attachments, setAttachments] = useState([]);
  const [fileLoader, setFileLoader] = useState(false);
  const [reportStatus, setReportStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data } = useSelector((state) => state.hazardReport.details);
  let uniqueId = reportId ? data?.hazardId : generateUniqueId("HR");
  const [isAddingCorrectiveAction, setIsAddingCorrectiveAction] = useState(false);

  const initialValues = {
    division: '',
    shift: '',
    time: null,
    date: null,
    status: '',
    location: '',
    comments: '',
    priority: '',
    department: '',
    hazardType: '',
    workOrder: false,
    informantName: '',
    hazardDetails: '',
    selectedOption: '',
    immediateAction: '',
    stillPresent: false,
    furtherReview: false,
    employeeCounsel: false
  };

  const hazardReportStatusSelectBox = (reportStatus) => {
    return (
      <StyledDropdownStatus
        color={STATUS_COLORS[reportStatus?.replace(/\s/g, '').toUpperCase()]?.color}
        bg={STATUS_COLORS[reportStatus?.replace(/\s/g, '').toUpperCase()]?.background}
      >
        <Dropdown
          name=""
          options={status}
          defaultValue={reportStatus}
          endIcon={<KeyboardArrowDownIcon />}
          handleFilterChange={(name, value) => setReportStatus(value)}
        />
      </StyledDropdownStatus>
    );
  };

  const handleFileUpload = (e) => {
    const currentFile = e.target.files;
    const acceptedFormats = ['pdf', 'png', 'jpg', 'jpeg', 'doc', 'docx'];
    if (currentFile) {
      handleMultipleFiles(acceptedFormats, currentFile, setFileLoader, setAttachments);
    }
  };

  const handleRemoveFile = (index) => {
    const updatedAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(updatedAttachments);
  };

  const updateHazardReportById = (reportId, data, action) => {
    data.files = attachments
    data.status = reportStatus
    dispatch(updateReport({
      data,
      id: reportId,
      successCallback: () => successCallback(action)
    }));
  };

  const successCallback = (action) => {
    if (action === 'submit') {
      navigate('/hazard-reports/list');
    } else if (action === 'addCorrectiveAction') {
      const values = formikRef.current.values;
      values.hazardId = uniqueId
      values.files = attachments
      dispatch(setReportData(values));
      navigate('/hazard-reports/add-corrective-action');
    }
  }

  const handleApiLogic = (data, action) => {
    data.files = attachments
    data.hazardId = uniqueId
    dispatch(createReport({
      data,
      successCallback: () => successCallback(action)
    }));
  };

  const handleSubmitForm = async () => {
    setIsSubmitting(true);
    await formikRef.current.validateForm();
    const formikValues = { ...formikRef.current.values };
    const isValid = Object.keys(formikRef.current.errors).length === 0;
    formikValues.hazardType = {
      type: formikValues.hazardType,
      selectedOption: formikValues.selectedOption
    }

    if (isValid) {
      if (reportId) updateHazardReportById(reportId, formikValues, 'submit');
      else { handleApiLogic(formikValues, 'submit') }
      return
    } else {
      Object.keys(formikRef.current.errors).forEach((field) => {
        formikRef.current.setFieldError(field, 'Please enter the required field');
      });
    }
    setIsSubmitting(false);
  };

  const handleAddCorrectiveAction = async () => {
    setIsAddingCorrectiveAction(true);
    await formikRef.current.validateForm();
    const formikValues = { ...formikRef.current.values };
    const isValid = Object.keys(formikRef.current.errors).length === 0;
    formikValues.hazardType = {
      type: formikValues.hazardType,
      selectedOption: formikValues.selectedOption
    }

    if (isValid) {
      if (reportId) updateHazardReportById(reportId, formikValues, 'addCorrectiveAction');
      else { handleApiLogic(formikValues, 'addCorrectiveAction') }
      return
    } else {
      Object.keys(formikRef.current.errors).forEach((field) => {
        formikRef.current.setFieldError(field, 'Please enter the required field');
      });
    }
    setIsAddingCorrectiveAction(false);
  };

  useEffect(() => {
    if (reportId) {
      dispatch(reportDetails({
        id: reportId,
        successCallback: (data) => {
          formikRef.current.setValues({
            ...data,
            time: dayjs(data.time).toDate(),
            date: dayjs(data.date).toDate(),
            hazardType: data.hazardType.type,
            selectedOption: data.hazardType.selectedOption
          });
          setAttachments(data.files);
          setReportStatus(data.status);
        }
      }));
    }
  }, [dispatch, reportId]);

  return (
    <StyledCreateHazardReports>
      <StyledTopHeader>
        <div className="flex-row">
          <IconButton onClick={() => navigate(-1)}>
            <KeyboardBackspaceIcon />
          </IconButton>
          <img src={Icons.hazardReport} alt="hazard-report" />
          <h2>Hazard Report</h2>
        </div>
        <span>
          Hazard Report ID:{' '}
          {uniqueId}
        </span>
      </StyledTopHeader>
      <div className="report_form">
        <Formik
          innerRef={formikRef}
          // onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={getValidationSchema(reportId)}
        >
          {(formik) => {
            return (
              <form onSubmit={formik.handleSubmit}>
                {reportId && (
                  <div className="status">{hazardReportStatusSelectBox(reportStatus)}</div>
                )}
                <div className="report_form_field-control">
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
                  <div>
                    <FormControl
                      name="time"
                      label="Time"
                      control="time"
                      formik={formik}
                      placeholder="hh:mm"
                      value={formik.values.time && dayjs(formik.values.time)}
                    />
                  </div>
                </div>

                <div className="report_form_field-control">
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
                      name="division"
                      options={site}
                      formik={formik}
                      control="select"
                      label="Division / Site"
                      placeholder="Select one"
                      value={formik.values.division}
                    />
                  </div>
                </div>

                <div className="report_form_field-control">
                  <div>
                    <FormControl
                      type="text"
                      name="location"
                      control="input"
                      formik={formik}
                      label="Location"
                      placeholder="Enter location"
                      value={formik.values.location}
                    />
                  </div>
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
                </div>

                <div className="report_form_field-control">
                  <div>
                    <FormControl
                      formik={formik}
                      control="select"
                      name="hazardType"
                      label="Hazard Type"
                      placeholder="Select one"
                      value={formik.values.hazardType}
                      options={[
                        { value: 'Unsafe Act', text: 'Unsafe Act' },
                        { value: 'Unsafe Condition', text: 'Unsafe Condition' },
                      ]}
                    />
                  </div>

                  {formik.values.hazardType ? (
                    <div>
                      <FormControl
                        formik={formik}
                        control="select"
                        name="selectedOption"
                        placeholder="Select one"
                        label={formik.values.hazardType}
                        value={formik.values.selectedOption}
                        options={
                          formik.values.hazardType.toLowerCase() === 'unsafe act' ? unsafeAct : unsafeCondition
                        }
                      />
                    </div>
                  ) : <div></div>}
                </div>

                <div className="report_form_field-control">
                  <div>
                    <FormControl
                      type="text"
                      control="input"
                      formik={formik}
                      name="informantName"
                      value={formik.values.informantName}
                      placeholder="Enter the name of person"
                      label="Name of Person Reporting the Hazard"
                    />
                  </div>
                </div>

                <div className="report_form_field-control">
                  <div>
                    <FormControl
                      type="text"
                      control="input"
                      formik={formik}
                      name="hazardDetails"
                      label="Hazard Details"
                      placeholder="Enter here"
                      value={formik.values.hazardDetails}
                    />
                  </div>
                </div>

                <div className="report_form_field-control">
                  <div>
                    <FormControl
                      type="text"
                      control="input"
                      formik={formik}
                      name="immediateAction"
                      placeholder="Enter here"
                      value={formik.values.immediateAction}
                      label="What was the immediate action taken to control the hazard?"
                    />
                  </div>
                </div>

                <div className="report_form_risk-ranking">
                  <div>
                    <label>
                      Choose the current risk ranking:{' '}
                      <span>Use the Risk Matrix for Help </span>
                    </label>
                    <RiskRankingTable
                      riskRankingValues={riskRankingValues}
                      severities={riskRankingData.severities}
                      likelihoods={riskRankingData.likelihoods}
                    />
                  </div>
                  <div>
                    <FormControl
                      formik={formik}
                      name="priority"
                      control="select"
                      options={riskRanking}
                      placeholder="Select one"
                      label="Add a Risk Ranking"
                      value={formik.values.priority}
                    />
                  </div>
                </div>

                <div className="report_form_questions">
                  <div className="report_form_questions_question">
                    <FormControl
                      formik={formik}
                      color="#B8D6BF"
                      control="checkbox"
                      name="stillPresent"
                      label="Is the hazard still present?"
                      checked={formik.values.stillPresent}
                    />
                  </div>
                  <div className="report_form_questions_question">
                    <FormControl
                      formik={formik}
                      color="#B8D6BF"
                      control="checkbox"
                      name="employeeCounsel"
                      checked={formik.values.employeeCounsel}
                      label="Was the employee counseled right away?"
                    />
                  </div>
                  <div className="report_form_questions_question">
                    <FormControl
                      formik={formik}
                      color="#B8D6BF"
                      control="checkbox"
                      name="furtherReview"
                      label="Is the further review needed?"
                      checked={formik.values.furtherReview}
                    />
                  </div>
                  <div className="report_form_questions_question">
                    <FormControl
                      formik={formik}
                      color="#B8D6BF"
                      name="workOrder"
                      control="checkbox"
                      label="Was a work order created?"
                      checked={formik.values.workOrder}
                    />
                  </div>
                </div>

                {!reportId && (
                  <div className="report_form_field-control">
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
                    <div></div>
                  </div>
                )}

                <div className="report_form_field-control">
                  <FileUpload
                    label="Attachments"
                    isLoading={fileLoader}
                    fileMaterials={attachments}
                    handleFileUpload={handleFileUpload}
                    handleRemoveFile={handleRemoveFile}
                  />
                </div>

                <div className="report_form_field-control">
                  <StyledTextarea>
                    <FormControl
                      type="text"
                      control="input"
                      formik={formik}
                      name="comments"
                      label="Comments"
                      multiline={true}
                      value={formik.values.comments}
                      placeholder="Briefly describe..."
                    />
                  </StyledTextarea>
                </div>

                <div className="report_form_btn-container">
                  <CustomButton
                    text="Cancel"
                    variant="outlined"
                    clicked={() => navigate(-1)}
                    tColor={customColors.secondary}
                    borderColor={customColors.secondary}
                    sxProps={{
                      width: '150px',
                      height: '52px',
                      fontWeight: 600,
                      fontSize: '16px',
                      bg: customColors.secondary
                    }}
                  />
                  <CustomButton
                    type="submit"
                    variant="outlined"
                    text="Add Corrective Action"
                    tColor={customColors.secondary}
                    loading={isAddingCorrectiveAction}
                    clicked={handleAddCorrectiveAction}
                    borderColor={customColors.secondary}
                    disabled={fileLoader || isSubmitting || isAddingCorrectiveAction}
                    sxProps={{
                      width: '100%',
                      height: '52px',
                      fontWeight: 600,
                      fontSize: '16px',
                      maxWidth: '268px',
                      bg: customColors.secondary
                    }}
                  />
                  <CustomButton
                    type="submit"
                    loading={isSubmitting}
                    clicked={handleSubmitForm}
                    text={reportId ? 'Update' : 'Submit'}
                    disabled={fileLoader || isSubmitting || isAddingCorrectiveAction}
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
      </div>
    </StyledCreateHazardReports>
  );
};

export default Create;
// Form validation schema using Yup
const getValidationSchema = (reportId) => {
  return Yup.object({
    date: Yup.string().required('Please enter the required field'),
    time: Yup.string().required('Please enter the required field'),
    shift: Yup.string().required('Please enter the required field'),
    location: Yup.string().required('Please enter the required field'),
    division: Yup.string().required('Please enter the required field'),
    priority: Yup.string().required('Please enter the required field'),
    department: Yup.string().required('Please enter the required field'),
    hazardType: Yup.string().required('Please enter the required field'),
    informantName: Yup.string().required('Please enter the required field'),
    hazardDetails: Yup.string().required('Please enter the required field'),
    selectedOption: Yup.string().required('Please enter the required field'),
    immediateAction: Yup.string().required('Please enter the required field'),
    // Exclude status validation when reportId is present
    ...(reportId
      ? {}
      : {
        status: Yup.string().required('Please enter the required field'),
      }),
  });
};
