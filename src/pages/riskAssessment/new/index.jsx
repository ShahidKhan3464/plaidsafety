import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { Icons } from 'assets';
import { Formik } from 'formik';
import { IconButton } from '@mui/material';
import { customColors } from 'theme/pallete';
import CustomButton from 'components/button';
import { site } from 'constants/dropdownValues';
import { StyledTopHeader } from 'styles/global';
import { StyledNewRiskAssessment } from './style';
import { FormControl, generateUniqueId } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {
  createReport,
  reportDetails,
  setReportData,
  updateReport
} from 'provider/features/hazardReport/hazardReport.slice';

const Create = () => {
  const formikRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: reportId } = useParams();
  const [attachments, setAttachments] = useState([]);
  const [reportStatus, setReportStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data } = useSelector((state) => state.hazardReport.details);
  let uniqueId = reportId ? data?.hazardId : generateUniqueId("RA");

  const initialValues = {
    title: '',
    date: null,
    division: '',
    location: '',
    category: '',
    teamMember: '',
    projectReviewer: '',
    needReviewer: false,
    leader: 'Maria Gibson',
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
    <StyledNewRiskAssessment>
      <StyledTopHeader>
        <div className="flex-row">
          <IconButton onClick={() => navigate(-1)}>
            <KeyboardBackspaceIcon />
          </IconButton>
          <img src={Icons.riskAssessment} alt="risk-assessment" />
          <h2>Risk Assessment</h2>
        </div>
        <span>
          Risk ID:{' '}
          {uniqueId}
        </span>
      </StyledTopHeader>
      <div className="report_form">
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
                      name="location"
                      control="input"
                      formik={formik}
                      placeholder="Enter here"
                      value={formik.values.location}
                      label="Title for the Risk Assessment"
                    />
                  </div>
                </div>

                <div className="report_form_field-control">
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
                      name="category"
                      formik={formik}
                      control="select"
                      placeholder="Select one"
                      value={formik.values.category}
                      label="Category of Risk Assessment"
                      options={[
                        { value: 'project risk assessment', text: 'Project Risk Assessment' },
                        { value: 'task risk assessment', text: 'Task Risk Assessment' }
                      ]}
                    />
                  </div>
                </div>

                <div className='report_form_field-control'>
                  <div>
                    <FormControl
                      type="text"
                      name="leader"
                      label="Leader"
                      disabled={true}
                      control="input"
                      formik={formik}
                      value={"Maria Gibson"}
                      placeholder="Enter here"
                    />
                  </div>
                  <div>
                    <FormControl
                      options={[]}
                      formik={formik}
                      name="teamMember"
                      label="Team Members"
                      control="searchSelect"
                      placeholder="Enter here"
                      value={formik.values.teamMember}
                    />
                  </div>
                </div>

                <div className="report_form_field-control">
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
                  <div>
                    <FormControl
                      type="text"
                      name="location"
                      control="input"
                      formik={formik}
                      label="Location"
                      placeholder="Enter here"
                      value={formik.values.location}
                    />
                  </div>
                </div>

                <div className="report_form_questions">
                  <div className="report_form_questions_question">
                    <FormControl
                      formik={formik}
                      color="#B8D6BF"
                      control="checkbox"
                      name="needReviewer"
                      label="Project need a reviewer?"
                      checked={formik.values.needReviewer}
                    />
                  </div>
                  <div></div>
                </div>

                <div className="report_form_field-control">
                  <div>
                    <FormControl
                      options={[]}
                      formik={formik}
                      name="projectReviewer"
                      control="searchSelect"
                      label="Project reviewer"
                      placeholder="Enter here"
                      value={formik.values.projectReviewer}
                    />
                  </div>
                  <div></div>
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
                    text={'Start'}
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    clicked={handleSubmitForm}
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
    </StyledNewRiskAssessment>
  );
};

export default Create;
// Form validation schema using Yup
const getValidationSchema = () => {
  return Yup.object({
    date: Yup.string().required('Please enter the required field'),
    title: Yup.string().required('Please enter the required field'),
    leader: Yup.string().required('Please enter the required field'),
    location: Yup.string().required('Please enter the required field'),
    division: Yup.string().required('Please enter the required field'),
    category: Yup.string().required('Please enter the required field'),
    teamMember: Yup.string().required('Please enter the required field'),
    projectReviewer: Yup.string().required('Please enter the required field'),
  });
};
