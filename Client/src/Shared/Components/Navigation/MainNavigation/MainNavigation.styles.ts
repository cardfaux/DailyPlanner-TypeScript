import styled from 'styled-components';

import { White } from '../../../../Styles/JS/Colors';

export const Hamburger = styled.button`
  width: 3rem;
  height: 3rem;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 2rem;
  cursor: pointer;
  > span {
    display: block;
    width: 3rem;
    height: 2.5px;
    background: ${White};
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

export const Title = styled.h1`
  color: ${White};
  > a {
    text-decoration: none;
    color: ${White};
  }
`;

export const Nav = styled.nav`
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`;

export const DrawerNav = styled.nav`
  height: 100%;
`;
