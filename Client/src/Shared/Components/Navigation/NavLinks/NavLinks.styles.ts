import styled from 'styled-components';

import { Black, White, Secondary } from '../../../../Styles/JS/Colors';

export const Navigation = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const ListItem = styled.li`
  margin: 1rem;
  > a {
    border: 1px solid transparent;
    color: ${Black};
    text-decoration: none;
    padding: 0.5rem;
    &:hover,
    &:active,
    &.active {
      background: ${Secondary};
      border-color: ${Black};
      color: ${Black};
    }
  }
  @media (min-width: 768px) {
    margin: 0 0.5rem;
    > a {
      color: ${White};
      text-decoration: none;
    }
  }
`;

export const Button = styled.button`
  cursor: pointer;
  border: 1px solid ${Black};
  color: ${Black};
  background: transparent;
  padding: 0.5rem;
  font: inherit;
  &:focus {
    outline: none;
  }
  &:hover,
  &:active {
    background: ${Black};
    color: white;
  }
  @media (min-width: 768px) {
    border: 1px solid ${White};
    color: ${White};
    background: transparent;
    &:hover,
    &:active {
      background: ${Secondary};
      color: ${Black};
    }
  }
`;
