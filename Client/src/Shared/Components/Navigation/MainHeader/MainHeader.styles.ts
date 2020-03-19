import styled from 'styled-components';

import { Fixed } from '../../../../Styles/JS/Positions';
import { Black, Secondary } from '../../../../Styles/JS/Colors';
import { BoxShadow1 } from '../../../../Styles/JS/Shadows';

export const MainHead = styled.header`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  ${Fixed({})};
  background: ${Black};
  border-bottom: 3px solid ${Secondary};
  box-shadow: ${BoxShadow1};
  padding: 0 1rem;
  z-index: 5;
  @media (min-width: 768px) {
    justify-content: space-between;
  }
`;
