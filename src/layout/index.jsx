import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import { LayoutContainer } from './style';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const pathname = useLocation().pathname.split("/")[1];
  const secondIndex = useLocation().pathname.split("/")[2];
  const isDashboardRoute = pathname === "dashboard";
  const isLeaderboardRoute = secondIndex === "leaderboard";

  return (
    <LayoutContainer
      isDashboardRoute={isDashboardRoute}
      isLeaderboardRoute={isLeaderboardRoute}
    >
      <div className="appbar">
        <Navbar />
      </div>
      <div className="layout">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
    </LayoutContainer>
  );
};

export default Layout;
