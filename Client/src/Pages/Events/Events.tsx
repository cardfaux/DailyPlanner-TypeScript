import React from 'react';
import styled from 'styled-components';

import Calendar from '../../Components/Calendar/Calendar';
import Button from '../../Shared/Components/FormElements/Button/Button';

const Events: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <StyledDiv>
        <Button to='/events/logs'>Go To Event Logs</Button>
      </StyledDiv>
      <Calendar />
    </React.Fragment>
  );
};

export default Events;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`;
