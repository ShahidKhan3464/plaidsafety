import React from 'react';
import { Icons, Images } from 'assets';
import { StyledMatrix } from './style';
import { IconButton } from '@mui/material';
import { customColors } from 'theme/pallete';
import { useNavigate } from 'react-router-dom';
import { StyledTopHeader } from 'styles/global';
import RiskRankingTable from 'components/riskRankingTable';
import { riskRankingData } from 'constants/dropdownValues';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const riskRankingValues = ({
    Catastrophic: Array.from({ length: 5 }, (_, index) => (index + 1) * 5),
    Major: Array.from({ length: 5 }, (_, index) => (index + 1) * 4),
    Moderate: Array.from({ length: 5 }, (_, index) => (index + 1) * 3),
    Minor: Array.from({ length: 5 }, (_, index) => (index + 1) * 2),
    Insignificant: Array.from({ length: 5 }, (_, index) => index + 1)
});

const data = [
    { level: 1, descriptor: 'Rare', description: 'May occur only in exceptional circumstances' },
    { level: 2, descriptor: 'Unlikely', description: 'Limited potential of occurring' },
    { level: 3, descriptor: 'Possible', description: 'Potential to occur sometime' },
    { level: 4, descriptor: 'Likely', description: 'Will probably occur in most circumstances' },
    { level: 5, descriptor: 'Almost Certain', description: 'Is expected to occur in many circumstances' },
];

const Matrix = () => {
    const navigate = useNavigate();

    const getColor = (value) => {
        if (value <= 2) return '#92D050';
        if (value <= 4) return '#FFFF00';
        return '#FF0000';
    };

    return (
        <StyledMatrix>
            <StyledTopHeader>
                <div className="flex-row">
                    <IconButton onClick={() => navigate(-1)}>
                        <KeyboardBackspaceIcon />
                    </IconButton>
                    <img src={Icons.riskAssessment} alt="risk-assessment" />
                    <h2>Risk Matrix</h2>
                </div>
            </StyledTopHeader>
            <div className='steps'>
                <div className='steps_step'>
                    <h3>Step 1: What is the likelihood of a problem occurring with the task?  </h3>
                    <div className='likelihood'>
                        <table>
                            <thead>
                                <tr>
                                    {['Level', 'Descriptor', 'Example detailed description'].map((label) => (
                                        <th key={label}>{label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row) => (
                                    <tr key={row.level}>
                                        {['level', 'descriptor', 'description'].map((key) => (
                                            <td key={key}>
                                                <p
                                                    style={{
                                                        padding: '10px 3px',
                                                        background: getColor(row.level),
                                                        color:
                                                            getColor(row.level) === '#FF0000'
                                                                ? customColors.white
                                                                : customColors.black
                                                    }}
                                                >
                                                    {row[key]}
                                                </p>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='steps_step'>
                    <h3>Step 2: What is the potential severity if an incident occurred?</h3>
                    <div className='potential-severtiy'>
                        <img src={Images.potentialSeverity} alt='potential-severity' />
                    </div>
                </div>
                <div className='steps_step'>
                    <h3>Step 3: Use hierarchy of controls to determine the reliability of the control</h3>
                    <div className='control-hierarchy'>
                        <img src={Images.controlHierarchy} alt='control-hierarchy' />
                    </div>
                </div>
                <div className='steps_step'>
                    <h3>Step 4: Calculate the risk score using the matrix below:</h3>
                    <div className='riskRanking'>
                        <RiskRankingTable
                            riskRankingValues={riskRankingValues}
                            severities={riskRankingData.severities}
                            likelihoods={riskRankingData.likelihoods}
                        />
                    </div>
                </div>
            </div>
        </StyledMatrix>
    );
};

export default Matrix;
