import React, { useState } from 'react'
import Profile from './profile';
import Security from './security';
import { StyledSettings } from './style'
import Subscription from './subscription';
import Notifications from './notifications';
import { customColors } from 'theme/pallete';
import { Button, ButtonGroup } from '@mui/material'

const buttons = [
    { label: 'Profile' },
    { label: 'Security' },
    { label: 'Subscription' },
    { label: 'Notifications' }
];

const Settings = () => {
    const [activeTab, setActiveTab] = useState(3);

    const TabButton = ({ label, isActive, onClick }) => (
        <Button
            onClick={onClick}
            sx={{
                borderRadius: '8px',
                fontWeight: isActive ? 600 : 400,
                backgroundColor: isActive ? '#F9FAFB' : 'transparent',
                color: isActive ? customColors.secondary : customColors.text
            }}
        >
            {label}
        </Button>
    );

    const getTabContent = (activeTab) => {
        switch (activeTab) {
            case 1:
                return <Profile />;
            case 2:
                return <Security />;
            case 3:
                return <Subscription />;
            case 4:
                return <Notifications />;
            default:
                return null;
        }
    }

    return (
        <StyledSettings>
            <h2>Account Settings</h2>
            <p>Manage your platform preferences</p>
            <ButtonGroup variant="outlined">
                {buttons.map((button, index) => (
                    <TabButton
                        key={index}
                        label={button.label}
                        isActive={activeTab === index + 1}
                        onClick={() => setActiveTab(index + 1)}
                    />
                ))}
            </ButtonGroup>
            {getTabContent(activeTab)}
        </StyledSettings>
    )
}

export default Settings
