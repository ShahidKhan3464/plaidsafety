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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { FormControl, generateUniqueId, handleMultipleFiles } from 'utils';
import { StyledTextarea, StyledTopHeader, StyledDropdownStatus } from 'styles/global';
import {
  createSafety,
  safetyDetails,
  setSafetyData,
  updateSafety
} from 'provider/features/safetyObservation/safetyObservation.slice';
import {
  site,
  shift,
  status,
  unsafeAct,
  department,
  unsafeCondition,
} from 'constants/dropdownValues';

const Create = () => {
  const formikRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: reportId } = useParams();
  const [attachments, setAttachments] = useState([]);
  const [fileLoader, setFileLoader] = useState(false);
  const [reportStatus, setReportStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data } = useSelector((state) => state.safetyObservation.details);
  let uniqueId = reportId ? data?.safetyObservationId : generateUniqueId("SO");
  const [isAddingCorrectiveAction, setIsAddingCorrectiveAction] = useState(false);

  const initialValues = {
    shift: '',
    time: null,
    date: null,
    status: '',
    division: '',
    location: '',
    comments: '',
    department: '',
    workOrder: false,
    informantName: '',
    selectedOption: '',
    immediateAction: '',
    stillPresent: false,
    safetyObservationType: '',
    safetyObservationDetails: '',
  };

  const safetyObservationStatusSelectBox = (reportStatus) => {
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

  const updateSafetyObservationById = (reportId, data, action) => {
    data.files = attachments
    data.status = reportStatus
    dispatch(updateSafety({
      data,
      id: reportId,
      successCallback: () => successCallback(action)
    }));
  };

  const successCallback = (action) => {
    if (action === 'submit') {
      navigate('/safety-observations/list');
    } else if (action === 'addCorrectiveAction') {
      const values = formikRef.current.values;
      values.files = attachments
      values.safetyObservationId = uniqueId
      dispatch(setSafetyData(values));
      navigate('/safety-observations/add-corrective-action');
    }
  }

  const handleApiLogic = (data, action) => {
    data.files = attachments
    data.safetyObservationId = uniqueId
    dispatch(createSafety({
      data,
      successCallback: () => successCallback(action)
    }));
  };

  const handleSubmitForm = async () => {
    setIsSubmitting(true);
    await formikRef.current.validateForm();
    const formikValues = { ...formikRef.current.values };
    const isValid = Object.keys(formikRef.current.errors).length === 0;
    formikValues.safetyObservationType = {
      type: formikValues.safetyObservationType,
      selectedOption: formikValues.selectedOption
    }

    if (isValid) {
      if (reportId) updateSafetyObservationById(reportId, formikValues, 'submit');
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
    formikValues.safetyObservationType = {
      type: formikValues.safetyObservationType,
      selectedOption: formikValues.selectedOption
    }

    if (isValid) {
      if (reportId) updateSafetyObservationById(reportId, formikValues, 'addCorrectiveAction');
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
      dispatch(safetyDetails({
        id: reportId,
        successCallback: (data) => {
          formikRef.current.setValues({
            ...data,
            time: dayjs(data.time).toDate(),
            date: dayjs(data.date).toDate(),
            safetyObservationType: data.safetyObservationType.type,
            selectedOption: data.safetyObservationType.selectedOption
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
          <img src={Icons.safetyObservationLog} alt="safety-observation" />
          <h2>New Safety Observation</h2>
        </div>
        <span>
          Safety Observation ID:{' '}
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
                  <div className="status">
                    {safetyObservationStatusSelectBox(reportStatus)}
                  </div>
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
                      name="safetyObservationType"
                      placeholder="Select one"
                      label="Type of Observation"
                      value={formik.values.safetyObservationType}
                      options={[
                        { value: 'Unsafe Act', text: 'Unsafe Act' },
                        { value: 'Unsafe Condition', text: 'Unsafe Condition' },
                      ]}
                    />
                  </div>

                  {formik.values.safetyObservationType ? (
                    <div>
                      <FormControl
                        formik={formik}
                        control="select"
                        name="selectedOption"
                        placeholder="Select one"
                        value={formik.values.selectedOption}
                        label={formik.values.safetyObservationType}
                        options={
                          formik.values.safetyObservationType.toLowerCase() === 'unsafe act' ? unsafeAct : unsafeCondition
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
                      label="Name of person reporting the Hazard"
                    />
                  </div>
                </div>

                <div className="report_form_field-control">
                  <div>
                    <FormControl
                      type="text"
                      control="input"
                      formik={formik}
                      placeholder="Enter here"
                      name="safetyObservationDetails"
                      label="Safety observation details"
                      value={formik.values.safetyObservationDetails}
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
    department: Yup.string().required('Please enter the required field'),
    informantName: Yup.string().required('Please enter the required field'),
    selectedOption: Yup.string().required('Please enter the required field'),
    immediateAction: Yup.string().required('Please enter the required field'),
    safetyObservationType: Yup.string().required('Please enter the required field'),
    safetyObservationDetails: Yup.string().required('Please enter the required field'),
    // Exclude status validation when reportId is present
    ...(reportId
      ? {}
      : {
        status: Yup.string().required('Please enter the required field'),
      }),
  });
};
