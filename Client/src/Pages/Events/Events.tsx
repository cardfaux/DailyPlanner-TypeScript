import React from 'react';
import styled from 'styled-components';

//import Calendar from '../../Components/Calendar/Calendar';
import RawCalendar from '../../Components/Calendar/RawCalendar';
import Button from '../../Shared/Components/FormElements/Button/Button';

import { Secondary } from '../../Styles/JS/Colors';

const Events: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <StyledDiv>
        <StyledButton inverse to='/events/logs'>
          Go To Event Logs
        </StyledButton>
      </StyledDiv>
      <RawCalendar />
    </React.Fragment>
  );
};

export default Events;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  padding: 0.5rem 0;
`;
const StyledButton = styled(Button)`
  .button {
    border: 1px solid ${Secondary};
    color: ${Secondary};
    &:hover {
      background: ${Secondary};
      color: black;
      border: 1px solid ${Secondary};
    }
  }
`;
