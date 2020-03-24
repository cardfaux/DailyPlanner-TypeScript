import styled from 'styled-components';

import { Black, Secondary } from '../../../../Styles/JS/Colors';
import { BoxShadow1 } from '../../../../Styles/JS/Shadows';

export const MainHead = styled.header`
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: ${Black};
  border-bottom: 3px solid ${Secondary};
  box-shadow: ${BoxShadow1};
  padding: 0 1rem;
  z-index: 5;
  @media (min-width: 850px) {
    justify-content: space-between;
  }
`;
