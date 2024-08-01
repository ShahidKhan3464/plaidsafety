import React from 'react';
import { Images } from 'assets';
import { StyledAuthWrapper } from './style';

// The main authentication layout component
const AuthWrapper = ({ className, children }) => {
  return (
    <StyledAuthWrapper>
      <div className="content">
        <div className="content_logo">
          <img src={Images.logo} alt='logo' />
        </div>
        <div className='content_children'>
          <div className={className}>
            {children}
          </div>
        </div>
      </div>
    </StyledAuthWrapper>
  );
};

export default AuthWrapper;
