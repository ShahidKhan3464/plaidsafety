import React from "react";
import { Images } from "assets";
import { Box } from "@mui/material";
import { customColors } from "theme/pallete";
import CustomButton from "components/button";
import { useNavigate } from "react-router-dom";
import StyledAuthWrapper from "components/authWrapper";

const SubscriptionFailed = () => {
  const navigate = useNavigate();

  return (
    <StyledAuthWrapper className="subscription">
      <div className="payment-img">
        <img src={Images.paymentFailed} alt="payment-failed" />
      </div>
      <p
        className="text"
        style={{ color: customColors.black }}
      >
        <span style={{ fontWeight: 600 }}>Oops!</span> something went wrong.
      </p>
      <p
        className="text"
        style={{ maxWidth: '570px', color: customColors.black }}
      >
        Your payment was not successfully done as an error occurred. Update your payment details and try again.
      </p>
      <Box
        sx={{
          pt: 3,
          width: '100%',
          margin: 'auto',
          maxWidth: '509px',

          '& >button': {
            width: '100% !important'
          }
        }}
      >
        <CustomButton
          text='Try again'
          clicked={() => navigate("/payment")}
          sxProps={{
            height: '52px',
            fontWeight: 600,
            fontSize: '16px',
            textTransform: 'math-auto',
            bg: customColors.secondary
          }}
        />
      </Box>
    </StyledAuthWrapper>
  );
}

export default SubscriptionFailed;