import React, { useState } from "react";
import axios from "axios";
import { Images } from "assets";
import { Box } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { customColors } from "theme/pallete";
import CustomButton from "components/button";
import StyledAuthWrapper from "components/authWrapper";
import { useNavigate, useSearchParams } from "react-router-dom";

const SubscriptionSuccessful = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const handleLoginWithSession = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL
        }/auth/session-login/${searchParams.get("session_id")}`
      );
      const user = response?.data?.data?.user;
      const auth_token = response.data.data.accessToken;
      enqueueSnackbar(response.data.message, { variant: "success" });
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("auth_token", JSON.stringify(auth_token));
      navigate("/dashboard");
    } catch (err) {
      setLoading(true)
      let errorMessage =
        err?.response?.data?.message ?? 'Something went wrong. Please try again';
      enqueueSnackbar(errorMessage, { variant: 'error' });
      setLoading(false)
    }
  };

  return (
    <StyledAuthWrapper className="subscription">
      <div className="payment-img">
        <img src={Images.paymentConfirm} alt="payment-confirm" />
      </div>
      <p
        className="text"
        style={{ color: customColors.black }}
      >
        <span style={{ fontWeight: 600 }}>Congratulations!</span> your payment is confirmed.
      </p>
      <p
        className="text"
        style={{ maxWidth: '570px', color: customColors.black }}
      >
        Now you can use plaid safety paid version. Enjoy all features
        with us.
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
          loading={loading}
          disabled={loading}
          text='Go to dashboard'
          clicked={() => handleLoginWithSession()}
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

export default SubscriptionSuccessful;