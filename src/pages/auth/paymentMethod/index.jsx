import React, { useState } from 'react'
import axios from 'axios'
import { Icons } from 'assets'
import { enqueueSnackbar } from 'notistack'
import { customColors } from 'theme/pallete'
import CustomButton from 'components/button'
import { StyledPaymentOption } from './style'
import { Link, useLocation } from 'react-router-dom'
import StyledAuthWrapper from 'components/authWrapper'
import { Checkbox, FormControlLabel } from '@mui/material'

const Payment = () => {
  const location = useLocation();
  const userId = location?.state?.userId;
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isSubscriptionChecked, setIsSubscriptionChecked] = useState(false);

  const handlePaypalCheckout = () => {
    // console.log("paypal");
  };

  const handleStripeCheckout = async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/payment/checkout-session`,
        { userId }
      );
      window.location.href = response.data.data.redirectUrl;
    } catch (err) {
      setLoading(true)
      let errorMessage =
        err?.response?.data?.message ?? 'Something went wrong. Please try again';
      enqueueSnackbar(errorMessage, { variant: 'error' });
      setLoading(false)
    }
  };

  return (
    <StyledAuthWrapper className="payment">
      <h2 className="title">Payment Method</h2>
      <p className='text'>
        Please enter payment details for monthly Auto-draft payment method.
      </p>
      <StyledPaymentOption>
        <div className='pricing'>
          <label class="custom-radios">
            <input type="radio" name="pricing" checked />
            <span class="radio-btns">
              <span class="radio-circle"></span>
              <div className='pricing_row'>
                <div>
                  <img src={Icons.price} alt="price" />
                </div>
                <div className='pricing_text'>
                  <p>Single Basic</p>
                  <h4>$10 <span>/month</span></h4>
                  <h6>$49.99 Annual Fee</h6>
                </div>
              </div>
            </span>
          </label>
        </div>
        <div className='payment-options'>
          <p>Select payment method:</p>
          <div className='payment-options__row'>
            <label class="custom-radio">
              <input
                type="radio"
                name="radio"
                onChange={() => setPaymentMethod("paypal")}
              />
              <span class="radio-btn">
                <div class="payment-icon">
                  <img src={Icons.paypal} alt='paypal' />
                  <h3>Paypal</h3>
                </div>
              </span>
            </label>
            <label class="custom-radio">
              <input
                type="radio"
                name="radio"
                onChange={() => setPaymentMethod("stripe")}
              />
              <span class="radio-btn">
                <div class="payment-icon">
                  <img src={Icons.stripe} alt='stripe' />
                  <h3>Stripe</h3>
                </div>
              </span>
            </label>
          </div>
          <div className='subscription-check'>
            <FormControlLabel
              sx={{
                margin: "40px 0 0",
                alignItems: 'flex-start',
                color: customColors.text,
                ".MuiFormControlLabel-label": {
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "24px",
                  fontStyle: "normal",
                  fontFamily: "Inter",
                  "@media screen and (max-width: 520px)": {
                    fontSize: "14px",
                  },
                },
              }}
              control={
                <Checkbox
                  checked={isSubscriptionChecked}
                  sx={{
                    display: 'block',
                    padding: '0 9px 0 0',
                    "& .MuiSvgIcon-root": {
                      color: { color: customColors.secondary },
                    },
                  }}
                  onChange={() => setIsSubscriptionChecked(!isSubscriptionChecked)}
                />
              }
              label={
                <span>
                  By confirming your subscription, you allow{' '}
                  <Link to="##" style={{ color: '#0182FC' }}>
                    Davinci AI
                  </Link>{' '}
                  to charge you for future payments in accordance with their terms. You can always cancel your subscription.
                </span>
              }
            />
          </div>
        </div>
        <div className='btn-container'>
          <CustomButton
            loading={loading}
            text="Confirm Payment"
            disabled={loading || !paymentMethod || !isSubscriptionChecked}
            clicked={() => {
              paymentMethod === "stripe"
                ? handleStripeCheckout()
                : handlePaypalCheckout();
            }}
            sxProps={{
              height: '52px',
              fontWeight: 600,
              fontSize: '16px',
              bg: customColors.secondary
            }}
          />
        </div>
      </StyledPaymentOption>
    </StyledAuthWrapper>
  )
}

export default Payment;