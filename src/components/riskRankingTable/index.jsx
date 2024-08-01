import React from 'react'
import { customColors } from 'theme/pallete';
import { StyledRiskRankingTable } from './style'

const RiskRankingTable = ({ likelihoods, severities, riskRankingValues }) => {

    const getColor = (value) => {
        if (value >= 1 && value <= 4) return '#92D050';
        if (value >= 5 && value <= 10) return '#FFFF00';
        if (value >= 11 && value <= 25) return '#FF0000';
        return '';
    };

    return (
        <StyledRiskRankingTable>
            <table>
                <thead>
                    <tr>
                        <th colSpan="2" rowSpan="2">
                            Likelihood / Severity
                        </th>
                        {severities.map((severity) => (
                            <th key={severity.label}>{severity.label}</th>
                        ))}
                    </tr>
                    <tr>
                        {likelihoods.map((likelihood) => (
                            <td key={likelihood.label}>
                                <p style={{ padding: '10px 0' }}>
                                    {likelihood.label}
                                </p>
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(riskRankingValues).map(([label, values], index) => (
                        <tr key={label}>
                            <td>{values.length - index}</td>
                            <td>{label}</td>
                            {values.map((value) => (
                                <td key={value}>
                                    <p
                                        style={{
                                            padding: '10px 0',
                                            background: getColor(value),
                                            color:
                                                getColor(value) === '#FF0000'
                                                    ? customColors.white
                                                    : customColors.black
                                        }}
                                    >
                                        {value}
                                    </p>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="7" style={{ fontWeight: 600 }}>
                            <p style={{ padding: '10px 0' }}>
                                When determining risk levels consider the most
                                probable worst-case outcome.
                            </p>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </StyledRiskRankingTable>
    )
}

export default RiskRankingTable
