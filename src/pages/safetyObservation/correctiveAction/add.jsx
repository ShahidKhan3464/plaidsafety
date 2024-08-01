import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { Icons } from 'assets';
import { Formik } from 'formik';
import { IconButton } from '@mui/material';
import { customColors } from 'theme/pallete';
import CustomButton from 'components/button';
import FileUpload from 'components/fileUpload';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, handleMultipleFiles } from 'utils';
import { status, priority } from 'constants/dropdownValues';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { StyledTextarea, StyledTopHeader, StyledCorrectiveAction } from 'styles/global';
import {
  addCorrectiveAction,
  detailsCorrectiveAction,
  updateCorrectiveAction
} from 'provider/features/safetyObservation/safetyObservation.slice';

const Add = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formikRef = useRef(null);
  const location = useLocation();
  const [attachments, setAttachments] = useState([]);
  const [fileLoader, setFileLoader] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const observationId = searchParams.get('observationId');
  const { data: safetyData } = useSelector((state) => state.safetyObservation.safetyData);
  const { isLoading: addLoader } = useSelector(
    (state) => state.safetyObservation.addCorrectiveAction);
  const { isLoading: updateLoader } = useSelector(
    (state) => state.safetyObservation.updateCorrectiveAction);
  const { data: detailsData } = useSelector(
    (state) => state.safetyObservation.detailsCorrectiveAction);
  let data = id ? detailsData : safetyData;

  const initialValues = {
    date: null,
    status: '',
    forUser: '',
    location: '',
    priority: '',
    comments: '',
    actionTitle: '',
    actionDetail: ''
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

  const handleSubmit = async (values) => {
    values.safetyObservationId = data?.safetyObservationId
    values.files = attachments

    if (id) {
      values.correctiveActionId = id
      dispatch(updateCorrectiveAction({
        data: values,
        successCallback: () =>
          navigate(`/safety-observations/corrective-actions/${observationId}`)
      }));
      return
    }

    dispatch(addCorrectiveAction({
      data: values,
      successCallback: () =>
        navigate(`/safety-observations/corrective-actions/${observationId || data.safetyObservationId}`)
    }));
  };

  const successCallback = (data) => {
    const date = dayjs(data?.date).toDate();
    const obj = {
      date: date,
      status: data?.status,
      forUser: data?.forUser,
      location: data?.location,
      priority: data?.priority,
      comments: data?.comments,
      actionTitle: data?.actionTitle,
      actionDetail: data?.actionDetail

    };
    formikRef.current.setValues(obj);
    setAttachments(data?.files)
  }

  useEffect(() => {
    if (id) {
      const data = { safetyObservationId: observationId, correctiveActionId: id }
      dispatch(detailsCorrectiveAction({ data, successCallback }));
    }
  }, [dispatch, id, observationId]);

  return (
    <StyledCorrectiveAction>
      <StyledTopHeader>
        <div className="flex-row">
          <IconButton onClick={() => navigate(-1)}>
            <KeyboardBackspaceIcon />
          </IconButton>
          <img src={Icons.correctiveAction} alt="corrective-action" />
          <h2>New Corrective Action</h2>
        </div>
      </StyledTopHeader>
      <div className="corrective_form">
        <div className="corrective_form_action-category">
          <p>
            Action Category: Safety Observation Report &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Raised By User: {data?.informantName ?? data?.raisedByUser}
          </p>
          <p>
            Report ID: {data?.safetyObservationId}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Date Created {dayjs(data?.reportCreatedAt ?? data?.date).format('MM/DD/YYYY')}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Division {data?.division?.toUpperCase()}
          </p>
        </div>
        <Formik
          innerRef={formikRef}
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <form onSubmit={formik.handleSubmit}>
                <div className="corrective_form_field-control">
                  <div>
                    <FormControl
                      type="text"
                      control="input"
                      formik={formik}
                      name="actionTitle"
                      label="Action Title"
                      placeholder="Enter here"
                    />
                  </div>
                </div>

                <div className="corrective_form_field-control">
                  <div>
                    <FormControl
                      type="text"
                      control="input"
                      formik={formik}
                      name="location"
                      label="Location"
                      placeholder="Enter here"
                    />
                  </div>
                </div>

                <div className="corrective_form_field-control">
                  <StyledTextarea>
                    <FormControl
                      type="text"
                      control="input"
                      formik={formik}
                      multiline={true}
                      name="actionDetail"
                      label="Action Detail"
                      placeholder="Briefly describe..."
                      value={formik.values.actionDetail}
                    />
                  </StyledTextarea>
                </div>

                <div className="corrective_form_field-control">
                  <div>
                    <FormControl
                      type="text"
                      name="forUser"
                      control="input"
                      formik={formik}
                      placeholder="Enter here"
                      label="Who is the Action For"
                    />
                  </div>
                  <div>
                    <FormControl
                      name="priority"
                      formik={formik}
                      control="select"
                      options={priority}
                      label="Risk Ranking"
                      placeholder="Select one"
                      value={formik.values.priority}
                    />
                  </div>
                </div>

                <div className="corrective_form_field-control">
                  <div>
                    <FormControl
                      name="date"
                      control="date"
                      formik={formik}
                      label="Due Date"
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

                <div className="corrective_form_field-control">
                  <FileUpload
                    label="Attachments"
                    isLoading={fileLoader}
                    fileMaterials={attachments}
                    handleFileUpload={handleFileUpload}
                    handleRemoveFile={handleRemoveFile}
                  />
                </div>

                <div className="corrective_form_field-control">
                  <StyledTextarea>
                    <FormControl
                      type="text"
                      control="input"
                      formik={formik}
                      name="comments"
                      multiline={true}
                      label="Comments"
                      value={formik.values.comments}
                      placeholder="Briefly describe..."
                    />
                  </StyledTextarea>
                </div>

                <div className="corrective_form_btn-container">
                  <CustomButton
                    text="Submit"
                    type="submit"
                    loading={addLoader || updateLoader}
                    disabled={fileLoader || addLoader || updateLoader}
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
    </StyledCorrectiveAction>
  );
};

export default Add;
// Form validation schema using Yup
const validationSchema = Yup.object({
  date: Yup.string().required('Please enter the required field'),
  status: Yup.string().required('Please enter the required field'),
  forUser: Yup.string().required('Please enter the required field'),
  // comments: Yup.string().required('Please enter the required field'),
  location: Yup.string().required('Please enter the required field'),
  priority: Yup.string().required('Please enter the required field'),
  actionTitle: Yup.string().required('Please enter the required field'),
  actionDetail: Yup.string().required('Please enter the required field')
});
