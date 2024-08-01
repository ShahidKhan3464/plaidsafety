import React from 'react';
import { Icons } from 'assets';
import { Skeleton } from '@mui/material';
import { StyledModuleCards } from './style';
import { customColors } from 'theme/pallete';
import { useNavigate } from 'react-router-dom';

const ModuleCards = () => {
  const navigate = useNavigate();
  const isLoading = false;
  return (
    <StyledModuleCards>
      {isLoading ? (
        <Skeleton height={180} sx={{ bgcolor: customColors.lightBlue }} />
      ) : (
        <div className="card">
          <div>
            <img src={Icons.intelligenceModule} alt="intelligence" />
          </div>
          <div>
            <p>Intelligence</p>
          </div>
        </div>
      )}
      {isLoading ? (
        <Skeleton height={180} sx={{ bgcolor: customColors.lightBlue }} />
      ) : (
        <div className="card">
          <div>
            <img src={Icons.actionModule} alt="action" />
          </div>
          <div>
            <p>Action Plan</p>
          </div>
        </div>
      )}

      {isLoading ? (
        <Skeleton height={180} sx={{ bgcolor: customColors.lightBlue }} />
      ) : (
        <div className="card">
          <div>
            <img src={Icons.calendarModule} alt="calendar" />
          </div>
          <div>
            <p>Calendar</p>
          </div>
        </div>
      )}

      {isLoading ? (
        <Skeleton height={180} sx={{ bgcolor: customColors.lightBlue }} />
      ) : (
        <div className="card" onClick={() => navigate('/hazard-reports/list')}>
          <div>
            <img src={Icons.hazardModule} alt="hazard" />
          </div>
          <div>
            <p>Hazard Reports</p>
          </div>
        </div>
      )}

      {isLoading ? (
        <Skeleton height={180} sx={{ bgcolor: customColors.lightBlue }} />
      ) : (
        <div className="card">
          <div>
            <img src={Icons.incidentModule} alt="incident" />
          </div>
          <div>
            <p>Incidents</p>
          </div>
        </div>
      )}

      {isLoading ? (
        <Skeleton height={180} sx={{ bgcolor: customColors.lightBlue }} />
      ) : (
        <div className="card">
          <div>
            <img src={Icons.inspectionsModule} alt="inspection" />
          </div>
          <div>
            <p>Inspections</p>
          </div>
        </div>
      )}

      {isLoading ? (
        <Skeleton height={180} sx={{ bgcolor: customColors.lightBlue }} />
      ) : (
        <div className="card">
          <div>
            <img src={Icons.nearMissModule} alt="nearMiss" />
          </div>
          <div>
            <p>Near Miss</p>
          </div>
        </div>
      )}

      {isLoading ? (
        <Skeleton height={180} sx={{ bgcolor: customColors.lightBlue }} />
      ) : (
        <div className="card">
          <div>
            <img src={Icons.policyAndPlanModule} alt="policy" />
          </div>
          <div>
            <p>Policies</p>
          </div>
        </div>
      )}

      {isLoading ? (
        <Skeleton height={180} sx={{ bgcolor: customColors.lightBlue }} />
      ) : (
        <div className="card">
          <div>
            <img src={Icons.reportsModule} alt="report" />
          </div>
          <div>
            <p>Reports</p>
          </div>
        </div>
      )}

      {isLoading ? (
        <Skeleton height={180} sx={{ bgcolor: customColors.lightBlue }} />
      ) : (
        <div className="card" onClick={() => navigate('/risk-assessment/list')}>
          <div>
            <img src={Icons.riskModule} alt="risk" />
          </div>
          <div>
            <p>Risk</p>
          </div>
        </div>
      )}

      {isLoading ? (
        <Skeleton height={180} sx={{ bgcolor: customColors.lightBlue }} />
      ) : (
        <div className="card" onClick={() => navigate('/safety-observations/list')}>
          <div>
            <img src={Icons.safetyObservationModule} alt="safetyObservation" />
          </div>
          <div>
            <p>Safety Observation</p>
          </div>
        </div>
      )}
    </StyledModuleCards>
  );
};

export default ModuleCards;
