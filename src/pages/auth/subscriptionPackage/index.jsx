import { Images } from "assets";
import CustomButton from "components/button";
import { customColors } from "theme/pallete";
import { StyledSubscriptionPackage } from "./style";
import StyledAuthWrapper from "components/authWrapper";
import { useLocation, useNavigate } from "react-router-dom";

const list = [
  {
    data: "Cloud Based Software"
  },
  {
    data: "Quick Implementation"
  },
  {
    data: "Digital Inspections"
  },
  {
    data: "Incident Tracking with Notifications"
  },
  {
    data: "Easy to Use Modules"
  },
  {
    data: "Never Miss a Deadline"
  },
  {
    data: "Safety Observation Leader Boards"
  },
  {
    data: "Advanced Intelligence Modules for KPIs"
  },
  {
    data: "Streamline Safety. Empower Your Workforce"
  },
]

const SubscriptionPackage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location?.state?.userId;

  return (
    <StyledAuthWrapper className="subscription">
      <h2 className="title">Purchase Package</h2>
      <p className="text">Proceed with the subscription plan</p>
      <StyledSubscriptionPackage>
        <div className="header">
          <h6>Single Basic</h6>
          <h2>$10 month</h2>
          <p>$49.99 Annual Fee</p>
        </div>
        <ul className="feature-list">
          {list.map((item) => {
            return (
              <li>
                <img src={Images.check} alt="check" />
                <span>{item.data}</span>
              </li>
            )
          })}
        </ul>
        <div className="note">
          <p>
            Note:
            <span>Annual fee will be deduct on every year automatically from your card. You can cancel it anytime.</span>
          </p>
        </div>
        <div className="footer">
          <CustomButton
            text='Proceed to payment'
            clicked={() => navigate("/payment", { state: { userId } })}
            sxProps={{
              height: '52px',
              fontWeight: 600,
              fontSize: '16px',
              bg: customColors.secondary
            }}
          />
        </div>
      </StyledSubscriptionPackage>
    </StyledAuthWrapper>
  );
}

export default SubscriptionPackage;