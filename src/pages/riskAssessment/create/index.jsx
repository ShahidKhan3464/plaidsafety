import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { Icons } from 'assets';
import { Formik } from 'formik';
import { IconButton } from '@mui/material';
import { customColors } from 'theme/pallete';
import CustomButton from 'components/button';
import FileUpload from 'components/fileUpload';
import { StyledCreateRiskAssessment } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import RiskRankingTable from 'components/riskRankingTable';
import { StyledTextarea, StyledTopHeader } from 'styles/global';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { FormControl, generateUniqueId, handleMultipleFiles } from 'utils';
import {
  riskRanking,
  riskRankingData,
  currentHierarchyControls
} from 'constants/dropdownValues';
import {
  createReport,
  reportDetails,
  setReportData,
  updateReport
} from 'provider/features/hazardReport/hazardReport.slice';

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
  let uniqueId = reportId ? data?.hazardId : generateUniqueId("RA");
  const [isAddingCorrectiveAction, setIsAddingCorrectiveAction] = useState(false);

  const initialValues = {
    task: '',
    comments: '',
    unwantedEvent: "",
    currentControls: '',
    currentRankings: '',
    improvedRankings: '',
    improvedControls: '',
    hierarchyControls: '',
    personResponsible: '',
    recommendedImprovements: ''
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
    <StyledCreateRiskAssessment>
      <StyledTopHeader>
        <div className="flex-row">
          <IconButton onClick={() => navigate(-1)}>
            <KeyboardBackspaceIcon />
          </IconButton>
          <img src={Icons.riskAssessment} alt="risk-assessment" />
          <h2>Task Risk Assessment</h2>
        </div>
        <span>
          Risk ID:{' '}
          {uniqueId}
        </span>
      </StyledTopHeader>
      <div className="report_form">
        <div className="report_form_risk-variety">
          <h3 className="risk-type">Current Risk</h3>
          <CustomButton
            text='Risk Matrix Solution'
            // loading={isSubmitting}
            clicked={() => navigate('/risk-assessment/risk-matrix')}
            // disabled={fileLoader || isSubmitting || isAddingCorrectiveAction}
            sxProps={{
              width: '250px',
              height: '52px',
              fontWeight: 600,
              fontSize: '16px',
              bg: customColors.secondary
            }}
          />
        </div>
        <Formik
          innerRef={formikRef}
          // onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={getValidationSchema()}
        >
          {(formik) => {
            return (
              <form onSubmit={formik.handleSubmit}>
                <div className="report_form_field-control">
                  <div>
                    <FormControl
                      type="text"
                      name="task"
                      control="input"
                      formik={formik}
                      placeholder="Enter here"
                      value={formik.values.task}
                      label="Describe the process or equipment or task"
                      sublabel="The source of the hazard / potential consequence"
                    />
                  </div>
                </div>

                <div className="report_form_field-control">
                  <div>
                    <FormControl
                      type="text"
                      control="input"
                      formik={formik}
                      name="unwantedEvent"
                      placeholder="Enter here"
                      value={formik.values.unwantedEvent}
                      label="Describe the hazard or unwanted event"
                      sublabel="The source of the hazard / potential consequence"
                    />
                  </div>
                </div>

                <div className="report_form_field-control">
                  <div>
                    <FormControl
                      type="text"
                      control="input"
                      formik={formik}
                      name="currentControls"
                      placeholder="Enter here"
                      value={formik.values.currentControls}
                      label="Current controls measures used"
                    />
                  </div>
                </div>

                <div className="report_form_field-control">
                  <div>
                    <FormControl
                      formik={formik}
                      control="select"
                      name="hierarchyControls"
                      placeholder="Select one"
                      options={currentHierarchyControls}
                      label="Current hierarchy of controls"
                      value={formik.values.hierarchyControls}
                    />
                  </div>
                  <div></div>
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
                      control="select"
                      options={riskRanking}
                      name="currentRankings"
                      placeholder="Select one"
                      label="Add a Risk Ranking"
                      value={formik.values.currentRankings}
                    />
                  </div>
                </div>

                <div className="report_form_risk-variety">
                  <h3 className="risk-type">Improved Risk</h3>
                </div>

                <div className="report_form_field-control">
                  <div>
                    <FormControl
                      type="text"
                      control="input"
                      formik={formik}
                      placeholder="Enter here"
                      name="recommendedImprovements"
                      label="Further Control Measures to be Used"
                      value={formik.values.recommendedImprovements}
                      sublabel="Recommended Safe Job Procedures, Operation Improvements"
                    />
                  </div>
                </div>

                <div className="report_form_field-control">
                  <div>
                    <FormControl
                      options={[]}
                      formik={formik}
                      control="select"
                      name="improvedControls"
                      placeholder="Select one"
                      value={formik.values.improvedControls}
                      label="Improved hierarchy of controls"
                    />
                  </div>
                  <div></div>
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
                      control="select"
                      options={riskRanking}
                      name="improvedRankings"
                      placeholder="Select one"
                      label="Add a Risk Ranking"
                      value={formik.values.improvedRankings}
                    />
                  </div>
                </div>

                <div className="report_form_field-control">
                  <div>
                    <FormControl
                      options={[]}
                      formik={formik}
                      control="searchSelect"
                      name="personResponsible"
                      placeholder="Enter here"
                      label="Person Responsible"
                      value={formik.values.personResponsible}
                    />
                  </div>
                  <div></div>
                </div>

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
                    type="submit"
                    variant="outlined"
                    text="Add Corrective Action"
                    tColor={customColors.secondary}
                    // loading={isAddingCorrectiveAction}
                    // clicked={handleAddCorrectiveAction}
                    borderColor={customColors.secondary}
                    // disabled={fileLoader || isSubmitting || isAddingCorrectiveAction}
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
                    text='Submit'
                    // loading={isSubmitting}
                    // clicked={handleSubmitForm}
                    // disabled={fileLoader || isSubmitting || isAddingCorrectiveAction}
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
    </StyledCreateRiskAssessment>
  );
};

export default Create;
// Form validation schema using Yup
const getValidationSchema = () => {
  return Yup.object({
    task: Yup.string().required('Please enter the required field'),
    priority: Yup.string().required('Please enter the required field'),
    comments: Yup.string().required('Please enter the required field'),
    unwantedEvent: Yup.string().required('Please enter the required field'),
    currentControls: Yup.string().required('Please enter the required field'),
    currentRankings: Yup.string().required('Please enter the required field'),
    improvedControls: Yup.string().required('Please enter the required field'),
    improvedRankings: Yup.string().required('Please enter the required field'),
    hierarchyControls: Yup.string().required('Please enter the required field'),
    personResponsible: Yup.string().required('Please enter the required field'),
    recommendedImprovements: Yup.string().required('Please enter the required field'),
  });
};
