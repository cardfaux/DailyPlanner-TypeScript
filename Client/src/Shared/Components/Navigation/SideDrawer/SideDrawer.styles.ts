import styled from 'styled-components';

import { CSSTransition } from 'react-transition-group';

import { White } from '../../../../Styles/JS/Colors';
import { BoxShadow2 } from '../../../../Styles/JS/Shadows';

export const Aside = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  height: 100vh;
  width: 70%;
  background: ${White};
  box-shadow: ${BoxShadow2};
`;

export const CSSAnimation = styled(CSSTransition)`
  .slide-in-left-enter {
    transform: translateX(-100%);
  }

  .slide-in-left-enter-active {
    transform: translateX(0);
    opacity: 1;
    transition: all 200ms;
  }

  .slide-in-left-exit {
    transform: translateX(0%);
    opacity: 1;
  }

  .slide-in-left-exit-active {
    transform: translateX(-100%);
    opacity: 0;
    transition: all 200ms;
  }
`;
