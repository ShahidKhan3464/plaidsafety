import React from 'react';
import { Icons, Images } from 'assets';
import DataTable from 'components/table';
import { IconButton } from '@mui/material';
import CustomButton from 'components/button';
import { customColors } from 'theme/pallete';
import { useNavigate } from 'react-router-dom';
import { StyledTopHeader } from 'styles/global';
import { StyledTaskRiskAssessment } from './style';
import { riskRankingData } from 'constants/dropdownValues';
import RiskRankingTable from 'components/riskRankingTable';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const riskRankingValues = ({
    Catastrophic: Array.from({ length: 5 }, (_, index) => (index + 1) * 5),
    Major: Array.from({ length: 5 }, (_, index) => (index + 1) * 4),
    Moderate: Array.from({ length: 5 }, (_, index) => (index + 1) * 3),
    Minor: Array.from({ length: 5 }, (_, index) => (index + 1) * 2),
    Insignificant: Array.from({ length: 5 }, (_, index) => index + 1)
});

function createData(no, title, category, describeTask, unwantedEvent, hierarchyControls, recommendedImprovements, improvedControls, rankingAfterControl) {
    return { no, title, category, describeTask, unwantedEvent, hierarchyControls, recommendedImprovements, improvedControls, rankingAfterControl };
}

const rows = [
    createData(
        '1', 'Moving boxes from Conveyor', 'Process',
        'Boxes are moved with conveyors at waist height, Workers move boxes on and off and they work around preparing pallets, Working near conveyors, moving boxes on and off, egress around conveyors, forklifts move pallets once',
        'Body part caught in-between, laceration any contact with moving parts. Tool makes contact with person. Loose clothing and or jewelry. People going under the conveyors to get to the egress.',
        '8',
        'Machine Guards need to be used to control access points to laceration risks,',
        'Engineering',
        '1'
    )
];

const Task = () => {
    const navigate = useNavigate()

    const columns = [
        {
            label: 'No',
            accessor: 'no',
        },
        {
            label: 'Title',
            accessor: 'title',
            render: (item) => (
                <>
                    <span>{item.title}</span>
                    <img src={Images.taskPicture} alt='taskPicture' />
                </>
            )
        },
        {
            label: 'Category',
            accessor: 'category',
        },
        {
            label: 'Describe the process or equipment or task',
            accessor: 'describeTask',
        },
        {
            label: 'Hazards or Unwanted Event',
            accessor: 'unwantedEvent',
        },
        {
            label: 'Current Hierarchy of Controls',
            accessor: 'hierarchyControls',
            render: (item) => (
                <div style={{
                    height: '246px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    background: '#FFFF54',
                    justifyContent: 'center',
                }}
                >
                    {item.hierarchyControls}
                </div>
            )
        },
        {
            label: 'Controls (Recommended Safe Job Procedures, Operation Improvements)',
            accessor: 'recommendedImprovements',
        },
        {
            label: 'Improved Hierarchy of Controls',
            accessor: 'improvedControls',
        },
        {
            label: 'Ranking After Control',
            accessor: 'rankingAfterControl',
            render: (item) => (
                <div style={{
                    height: '246px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    background: '#9FCE63',
                    justifyContent: 'center',
                }}
                >
                    {item.rankingAfterControl}
                </div>
            )
        },
    ];

    const renderCellContent = (item, column) => {
        const value = item[column.accessor];
        return column.render ? column.render(item) : value;
    };

    return (
        <StyledTaskRiskAssessment>
            <StyledTopHeader>
                <div className="flex-row">
                    <IconButton onClick={() => navigate(-1)}>
                        <KeyboardBackspaceIcon />
                    </IconButton>
                    <img src={Icons.riskAssessment} alt="risk-assessment" />
                    <h2>Project Risk Assessment</h2>
                </div>
            </StyledTopHeader>
            <div className='output'>
                <div className='output_worksheetPrint'>
                    <h2>Assessment & Content Worksheet Print</h2>
                    <RiskRankingTable
                        riskRankingValues={riskRankingValues}
                        severities={riskRankingData.severities}
                        likelihoods={riskRankingData.likelihoods}
                    />
                </div>
                <div className='output_table'>
                    <table>
                        <tbody>
                            <tr>
                                <td rowSpan="3">
                                    <p>Title</p>
                                    <p>Moving Boxes from a Conveyor</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Division / Site:</p>
                                    <p>SFS</p>
                                </td>
                                <td>
                                    <p>Department</p>
                                    <p>Warehouse</p>
                                </td>
                                <td>
                                    <p>Location</p>
                                    <p>Conveyor</p>
                                </td>
                                <td>
                                    <p>Reviewed By</p>
                                    <p>Allyson Cho</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Date Created</p>
                                    <p>11/11/2022</p>
                                </td>
                                <td>
                                    <p>Created by team members</p>
                                    <p>John Fulton, Mary J Bleige</p>
                                </td>
                                <td>
                                    <p>Date Reviewed</p>
                                    <p>2/22/2023</p>
                                </td>
                                <td>
                                    <p>ID</p>
                                    <p>RA4532</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='output_list'>
                    <DataTable
                        data={rows}
                        columns={columns}
                        isLoading={false}
                        renderCellContent={renderCellContent}
                    />
                </div>
                <div className="output_btn-container">
                    <CustomButton
                        type="submit"
                        variant="outlined"
                        text="Add Corrective Action"
                        tColor={customColors.secondary}
                        // loading={false}
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
                        text={'Submit'}
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
            </div>
        </StyledTaskRiskAssessment>
    )
}

export default Task
