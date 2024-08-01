import React, { useState } from 'react';
import { Icons, Images } from 'assets';
import { customColors } from 'theme/pallete';
import { useNavigate } from 'react-router-dom';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { StyledAppBar, StyledDropdownButton, StyledToolbar } from './style';

const accountData = [
  {
    text: 'Profile Info',
    // path: '/profile',
    icon: Icons.user
  },
  {
    text: 'Change Password',
    // path: '/log',
    icon: Icons.settings
  },
  {
    text: 'Logout',
    path: '/login',
    icon: Icons.logOut
  }
];

const options = [
  {
    value: "action plan",
    label: "Action Plan",
    children: [
      { value: "action plan log", label: "Action Plan Log" },
      { value: "action plan search", label: "Action Plan Search" },
      { value: "new corrective action", label: "New Corrective Action" },
    ],
  },
  { value: "calendar", label: "Calendar", path: "/hazard-reports/list" },
  {
    value: "hazard report",
    label: "Hazard Report",
    children: [
      {
        value: "hazard report log",
        label: "Hazard Report Log",
        path: "/hazard-reports/list",
      },
      {
        value: "hazard report search",
        label: "Hazard Report Search",
        path: "/hazard-reports/search",
      },
      {
        value: "new hazard report",
        label: "New Hazard Report",
        path: "/hazard-reports/create",
      },
    ],
  },
  {
    value: "incident",
    label: "Incident",
    children: [
      { value: "first report", label: "First Report" },
      { value: "incident log", label: "Incident Log" },
      { value: "incident search", label: "Incident Search" },
    ],
  },
  {
    value: "inspections",
    label: "Inspections",
    children: [
      { value: "facility assessments", label: "Facility Assessments" },
      { value: "create new", label: "Create New" },
      { value: "inspections search", label: "Inpections Search" },
      { value: "inspections", label: "Inspections" },
    ],
  },
  { value: "near miss", label: "Near Miss" },
  { value: "plan and policies", label: "Plan and Policies" },
  { value: "reports", label: "Reports" },
  {
    value: "risk",
    label: "Risk",
    children: [
      { value: "new risk assessment", label: "New Risk Assessment" },
      { value: "risk assessments log", label: "Risk assessments Log" },
      { value: "risk assessment search", label: "Risk assessment Search" },
    ],
  },
  {
    value: "safety observation",
    label: "Safety Observation",
    children: [
      {
        value: "new safety observation",
        label: "New Safety Observation",
        path: "/safety-observations/create",
      },
      {
        value: "safety observation log",
        label: "Safety Observation Log",
        path: "/safety-observations/list",
      },
    ],
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOptionSelect = (selectedOption) => {
    selectedOption.path && navigate(selectedOption.path);
  };

  // Handle menu item click
  const handleItemClick = (item) => {
    if (item.text === 'Logout') {
      localStorage.removeItem('user');
      localStorage.removeItem('auth_token');
      navigate(item?.path)
    }
  };

  const DropdownMenu = ({ clr, fontSize, label, options, onSelect }) => {
    const groupedOptions = [];
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClose = () => {
      setAnchorEl(null);
    };

    const groupOptions = (options, groupSize) => {
      for (let i = 0; i < options.length; i += groupSize) {
        groupedOptions.push(options.slice(i, i + groupSize));
      }
      return groupedOptions;
    };

    return (
      <React.Fragment>
        <StyledDropdownButton
          clr={clr}
          fontSize={fontSize}
          aria-haspopup="true"
          endIcon={<KeyboardArrowDownIcon />}
          aria-expanded={open ? 'true' : undefined}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          aria-controls={open ? 'demo-customized-menu' : undefined}
        >
          {label}
        </StyledDropdownButton>
        <Menu
          anchorEl={anchorEl}
          onClose={handleClose}
          open={Boolean(anchorEl)}
          MenuListProps={{
            style: {
              padding: 0,
              display: 'grid',
              width: 'min-content',
              gridTemplateColumns: '1fr 1fr 1fr'
            }
          }}
          PaperProps={{
            style: {
              borderRadius: '8px',
              color: customColors.text,
              background: customColors.white,
              boxShadow: '0px 0px 16px 0px rgba(0, 0, 0, 0.08)'
            }
          }}
        >
          {groupOptions(options, 4).map((group, index) => (
            <div key={index}>
              {group.map((option) => (
                <MenuItem
                  key={option.value}
                  onClick={() => !option.children && onSelect(option)}
                  sx={{
                    fontSize: '14px',
                    fontWeight: '700',
                    lineHeight: '18px',
                    fontStyle: 'normal',
                    padding: '15px 20px',
                    borderBottom: 'none',
                    fontFamily: 'DM Sans !important',
                    '&:hover': {
                      color: 'inherit',
                      backgroundColor: 'transparent !important'
                    },
                    '&:focus-visible': {
                      backgroundColor: 'transparent !important'
                    }
                  }}
                >
                  {option.children ? (
                    <DropdownMenu
                      fontSize="14px"
                      onSelect={onSelect}
                      label={option.label}
                      clr={customColors.text}
                      options={option.children}
                    />
                  ) : (
                    option.label
                  )}
                </MenuItem>
              ))}
            </div>
          ))}
        </Menu>
      </React.Fragment>
    );
  };

  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        <div className="toolbar_content">
          <div className="toolbar_content_left">
            <div
              className="toolbar_content_left_logo"
              onClick={() => navigate('/dashboard')}
            >
              <img src={Icons.logo} alt="logo" />
              <h2 style={{ fontWeight: 800 }}>
                Plaid<span style={{ fontWeight: 300 }}>Safety</span>
              </h2>
            </div>
            <div className="toolbar_content_left_modules">
              <DropdownMenu
                label="Modules"
                fontSize="16px"
                options={options}
                clr={customColors.white}
                onSelect={handleOptionSelect}
              />
            </div>
          </div>
          <div className="toolbar_content_right">
            <IconButton
              size="large"
              sx={{
                padding: '6px',
                '@media screen and (max-width: 520px)': {
                  padding: 0,
                  '& > svg': {
                    width: '23px',
                    height: '23px'
                  }
                }
              }}
            >
              <img src={Icons.sms} alt="sms" />
            </IconButton>
            <div className="profile">
              <Avatar
                alt="avatar"
                src={Images.avatar}
                sx={{
                  '@media screen and (max-width: 520px)': {
                    width: '25px',
                    height: '25px'
                  }
                }}
              />
              <div
                className="detail"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <div>
                  <p className="role">Admin</p>
                  <p className="name">Maria Gibson</p>
                </div>
                <KeyboardArrowDownIcon
                  sx={{ fontSize: '1.3rem', color: customColors.white }}
                />
              </div>
            </div>
            <Menu
              open={open}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              MenuListProps={{ style: { padding: 0 } }}
              PaperProps={{
                style: {
                  color: '#5C5C5C',
                  borderRadius: '8px',
                  background: customColors.white
                }
              }}
            >
              {accountData?.map((option, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleItemClick(option)}
                  sx={{
                    gap: '8px',
                    padding: '12px',
                    fontWeight: 500,
                    fontSize: '12px',
                    lineHeight: '18px',
                    fontStyle: 'normal',
                    fontFamily: 'Inter',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: 'inherit'
                    },
                    '&:focus-visible': {
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  <img src={option.icon} alt="icon" />
                  <span>{option.text}</span>
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;
