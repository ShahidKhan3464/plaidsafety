import styled from 'styled-components';
import { customColors } from 'theme/pallete';

export const StyledSomethingWentWrongPage = styled.div`
  display: flex;
  min-height: 100vh;
  text-align: center;
  align-items: center;
  justify-content: center;

  h4, p, a {
    line-height: 150%;
    font-style: normal;
    font-family: Inter;
    color: ${customColors.secondary};
  }

  h4 {
    font-size: 30px;
    font-weight: 700;
  }

  p, a {
    font-size: 15px;
    font-weight: 500;
  }

  a {
    text-transform: capitalize;
    color: ${customColors.white};
    background: ${customColors.secondary};

    &:hover {
      background: ${customColors.secondary};
    }
  }
`;