import React from 'react';
import { Icons } from 'assets';
import CustomButton from 'components/button';
import { customColors } from 'theme/pallete';
import { useNavigate } from 'react-router-dom';
import { StyledAccountRecovery } from './style';
import { Box, IconButton } from '@mui/material';
import StyledAuthWrapper from 'components/authWrapper';

const AccountRecovery = () => {
  const navigate = useNavigate();

  return (
    <StyledAuthWrapper>
      <StyledAccountRecovery>
        <div className="top">
          <img src={Icons.people} alt="people" />
          <h2>Account Recovery</h2>
        </div>
        <h3>Your Profile’s Account Recovery</h3>
        <p>
          To help keep your account safe, your account PlaidSafety wants to make
          sure it’s really you trying to sign in
        </p>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <IconButton
            //   onClick={() => navigate('/login')}
            sx={{
              gap: 2,
              width: '100%',
              fontWeight: 600,
              fontSize: '14px',
              maxWidth: '286px',
              lineHeight: '100%',
              fontFamily: 'Inter',
              fontStyle: 'normal',
              borderRadius: '30px',
              color: customColors.headline,
              border: `1px solid ${customColors.headline}`,

              '&:hover': {
                background: 'transparent'
              }
            }}
          >
            <img src={Icons.mask} alt="mask" />
            allysonclark42@gmail.com
          </IconButton>
        </Box>
        <div className="options">
          <h6>Choose how you want to sign in:</h6>
          <p>
            Tap <span style={{ fontWeight: 700 }}>Yes</span> on your device
          </p>
          <div className="options_opt">
            <img src={Icons.mobile} alt="mobile" />
            <div>
              <h6>Get verification code at (•••) •••-••00</h6>
              <p>Standard rates apply</p>
            </div>
          </div>
          <div className="options_opt">
            <img src={Icons.mobile} alt="device" />
            <div>
              <h6>Get verification code at •••••42@gmail.com</h6>
              <p>Standard rates apply</p>
            </div>
          </div>
        </div>
        <Box
          sx={{
            pt: 4,
            gap: 3,
            display: 'flex',
            alignItems: 'center',

            '@media screen and (max-width: 520px)': {
              pt: 2
            },

            '& > button': {
              width: '100% !important'
            }
          }}
        >
          <CustomButton
            text="Back"
            variant="outlined"
            // clicked={() => navigate(-1)}
            tColor={customColors.secondary}
            borderColor={customColors.secondary}
            sxProps={{
              height: '40px',
              fontWeight: 600,
              fontSize: '16px'
            }}
          />
          <CustomButton
            text="Send"
            loading={false}
            sxProps={{
              height: '40px',
              fontWeight: 600,
              fontSize: '16px',
              bg: customColors.secondary
            }}
          />
        </Box>
      </StyledAccountRecovery>
    </StyledAuthWrapper>
  );
};

export default AccountRecovery;
