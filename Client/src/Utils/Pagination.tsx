import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Primary, Secondary, White } from '../Styles/JS/Colors';

const Pagination = ({ itemsPerPage, totalItems, paginate }: any) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <StyledNav>
      <PageList>
        {pageNumbers.map((number) => (
          <ListItem key={number}>
            <AnchorTag onClick={() => paginate(number)} to='#!'>
              {number}
            </AnchorTag>
          </ListItem>
        ))}
      </PageList>
    </StyledNav>
  );
};

const StyledNav = styled.nav``;
const PageList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  text-decoration: none;
  list-style: none;
`;
const ListItem = styled.li`
  text-decoration: none;
`;
const AnchorTag = styled(Link)`
  text-decoration: none;
  margin: 0 0.75rem;
  padding: 0.5rem;
  border: solid 1px ${Secondary};
  color: ${Primary};
  &:hover,
  &:active {
    background: ${Primary};
    color: ${White};
  }
`;

export default Pagination;
