import React from 'react';
import { Icons } from 'assets';
import List from '@mui/material/List';
import { StyledDrawer } from './style';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation().pathname;
  const path = location.split('/')[1];

  const menuItems = [
    {
      icon: Icons.home,
      path: '/dashboard',
      isActive: path === 'dashboard'
    },
    {
      // path: '/courses',
      icon: Icons.message,
    },
    {
      // path: '/instructors',
      icon: Icons.notifications,
    },
    {
      path: '/settings',
      icon: Icons.setting,
      isActive: path === 'settings'
    },
    {
      path: '/users',
      icon: Icons.users,
      isActive: path === 'users'
    }
  ];

  return (
    <StyledDrawer variant="permanent">
      <List sx={{ pt: 2 }}>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                py: 0,
                px: 0,
                mb: 2,
                width: 36,
                minHeight: 36,
                justifyContent: 'center',
                borderRadius: item.isActive ? '8px' : 'none',
                backgroundColor: item.isActive ? 'rgba(0, 122, 90, 0.20)' : 'transparent',

                '&:hover': {
                  borderRadius: '8px',
                  background: 'rgba(0, 122, 90, 0.20)'
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center'
                }}
              >
                <img src={item.icon} alt="icon" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
