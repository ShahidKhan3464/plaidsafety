import styled from 'styled-components';
import { customColors } from 'theme/pallete';

export const LayoutContainer = styled.div`
  background: ${(props) =>
    props.isLeaderboardRoute
      ? 'linear-gradient(151deg, rgba(0, 122, 90, 0.07) 13.9%, #2EB67D 77.16%)'
      : props.isDashboardRoute
        ? 'linear-gradient(180deg, rgba(76, 155, 131, 0.30) 0%, rgba(76, 155, 131, 0.00) 58%), #FFF'
        : 'transparent'};

  .layout {
    display: flex;

    .content {
      width: 100%;
      margin: 24px;
      padding: 24px;
      overflow: auto;
      border-radius: 8px;
      background: ${(props) =>
    props.isLeaderboardRoute || props.isDashboardRoute ? 'transparent' : customColors.white};
      box-shadow: ${(props) =>
    props.isLeaderboardRoute || props.isDashboardRoute
      ? 'none'
      : '0px 0px 16px 0px rgba(0, 0, 0, 0.08)'};

      &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
      }

      @media screen and (max-width: 520px) {
        margin: 12px;
        padding: 12px;
      }
    }
  }
`;
