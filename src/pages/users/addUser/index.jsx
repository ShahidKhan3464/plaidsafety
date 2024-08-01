import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { Icons } from 'assets';
import { Formik } from 'formik';
import { StyledAddUser } from './style';
import { IconButton } from '@mui/material';
import { customColors } from 'theme/pallete';
import CustomButton from 'components/button';
import { StyledTopHeader, } from 'styles/global';
import { FormControl, generateUniqueId } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { safetyDetails } from 'provider/features/safetyObservation/safetyObservation.slice';

const Create = () => {
    const formikRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id: reportId } = useParams();
    const { data } = useSelector((state) => state.safetyObservation.details);
    let uniqueId = reportId ? data?.safetyObservationId : generateUniqueId("UR");

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        role: '',
        Intelligence: false,
        actionPlan: false,
        calendar: false,
        hazardReports: false,
        incidents: false,
        inspections: false,
        nearMiss: false,
        policiesPlans: false,
        reports: false,
        risk: false,
        safetyObservation: false,
    };

    const handleSubmit = async () => {

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
                    // setReportStatus(data.status);
                }
            }));
        }
    }, [dispatch, reportId]);

    return (
        <StyledAddUser>
            <StyledTopHeader>
                <div className="flex-row">
                    <IconButton onClick={() => navigate(-1)}>
                        <KeyboardBackspaceIcon />
                    </IconButton>
                    <img src={Icons.allUsers} alt="all-users" />
                    <h2>All Users</h2>
                </div>
                <span>
                    User ID: {' '}
                    {uniqueId}
                </span>
            </StyledTopHeader>
            <div className="report_form">
                <Formik
                    innerRef={formikRef}
                    onSubmit={handleSubmit}
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
                                            control="input"
                                            formik={formik}
                                            name="firstName"
                                            label="First Name"
                                            placeholder="Enter first name"
                                            value={formik.values.firstName}
                                        />
                                    </div>
                                    <div>
                                        <FormControl
                                            type="text"
                                            control="input"
                                            formik={formik}
                                            name="lastName"
                                            label="Last Name"
                                            placeholder="Enter last name"
                                            value={formik.values.lastName}
                                        />
                                    </div>
                                </div>

                                <div className="report_form_field-control">
                                    <div>
                                        <FormControl
                                            type="email"
                                            name="email"
                                            label="Email"
                                            control="input"
                                            formik={formik}
                                            placeholder="Enter email"
                                            value={formik.values.email}
                                        />
                                    </div>
                                    <div>
                                        <FormControl
                                            type="number"
                                            name="phoneNo"
                                            control="input"
                                            formik={formik}
                                            label="Phone Number"
                                            value={formik.values.phoneNo}
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                </div>

                                <div className="report_form_field-control">
                                    <div>
                                        <FormControl
                                            type="text"
                                            name="role"
                                            label="Role"
                                            control="input"
                                            formik={formik}
                                            value={formik.values.role}
                                            placeholder="Enter role (HR manager, worker, supervisor etc)"
                                        />
                                    </div>
                                    <div></div>
                                </div>

                                <div className="report_form_questions">
                                    <h3>Permissions of Modules</h3>
                                    <div className="report_form_questions_question">
                                        <FormControl
                                            formik={formik}
                                            color="#B8D6BF"
                                            control="checkbox"
                                            name="intelligence"
                                            label="Intelligence"
                                            checked={formik.values.intelligence}
                                        />
                                    </div>
                                    <div className="report_form_questions_question">
                                        <FormControl
                                            formik={formik}
                                            color="#B8D6BF"
                                            name="actionPlan"
                                            control="checkbox"
                                            label="Action Plan"
                                            checked={formik.values.actionPlan}
                                        />
                                    </div>
                                    <div className="report_form_questions_question">
                                        <FormControl
                                            formik={formik}
                                            color="#B8D6BF"
                                            name="calendar"
                                            label="Calendar"
                                            control="checkbox"
                                            checked={formik.values.calendar}
                                        />
                                    </div>
                                    <div className="report_form_questions_question">
                                        <FormControl
                                            formik={formik}
                                            color="#B8D6BF"
                                            control="checkbox"
                                            name="hazardReports"
                                            label="Hazard Reports"
                                            checked={formik.values.hazardReports}
                                        />
                                    </div>
                                    <div className="report_form_questions_question">
                                        <FormControl
                                            formik={formik}
                                            color="#B8D6BF"
                                            name="incidents"
                                            label="Incidents"
                                            control="checkbox"
                                            checked={formik.values.incidents}
                                        />
                                    </div>
                                    <div className="report_form_questions_question">
                                        <FormControl
                                            formik={formik}
                                            color="#B8D6BF"
                                            name="inspections"
                                            control="checkbox"
                                            label="Inspections"
                                            checked={formik.values.inspections}
                                        />
                                    </div>
                                    <div className="report_form_questions_question">
                                        <FormControl
                                            formik={formik}
                                            color="#B8D6BF"
                                            name="nearMiss"
                                            label="Near Miss"
                                            control="checkbox"
                                            checked={formik.values.nearMiss}
                                        />
                                    </div>
                                    <div className="report_form_questions_question">
                                        <FormControl
                                            formik={formik}
                                            color="#B8D6BF"
                                            control="checkbox"
                                            name="policiesPlans"
                                            label="Policies & Plans"
                                            checked={formik.values.policiesPlans}
                                        />
                                    </div>
                                    <div className="report_form_questions_question">
                                        <FormControl
                                            name="reports"
                                            formik={formik}
                                            label="Reports"
                                            color="#B8D6BF"
                                            control="checkbox"
                                            checked={formik.values.reports}
                                        />
                                    </div>
                                    <div className="report_form_questions_question">
                                        <FormControl
                                            name="risk"
                                            label="Risk"
                                            color="#B8D6BF"
                                            formik={formik}
                                            control="checkbox"
                                            checked={formik.values.risk}
                                        />
                                    </div>
                                    <div className="report_form_questions_question">
                                        <FormControl
                                            color="#B8D6BF"
                                            formik={formik}
                                            control="checkbox"
                                            name="safetyObservation"
                                            label="Safety Observation"
                                            checked={formik.values.safetyObservation}
                                        />
                                    </div>
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
                                        text={'Add'}
                                        type="submit"
                                        loading={false}
                                        disabled={false}
                                        sxProps={{
                                            width: '128px',
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
        </StyledAddUser>
    );
};

export default Create;
// Form validation schema using Yup
const getValidationSchema = () => {
    return Yup.object({
        role: Yup.string().required('Please enter the required field'),
        email: Yup.string().required('Please enter the required field'),
        phoneNo: Yup.string().required('Please enter the required field'),
        lastName: Yup.string().required('Please enter the required field'),
        firstName: Yup.string().required('Please enter the required field'),
    });
};
