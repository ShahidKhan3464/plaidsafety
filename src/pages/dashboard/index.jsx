import React from 'react';
import Graphs from './graphs';
import ChartCards from './chartCards';
import ModuleCards from './moduleCards';
import { StyledDashboardContent } from './style';
import SafetyObservation from './safetyObservation';

const Dashboard = () => {
  return (
    <StyledDashboardContent>
      <ChartCards />
      <div className="flex-row">
        <ModuleCards />
        <SafetyObservation />
      </div>
      <Graphs />
    </StyledDashboardContent>
  );
};

export default Dashboard;
