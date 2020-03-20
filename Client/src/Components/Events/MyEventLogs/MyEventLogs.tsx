import React from 'react';
import styled from 'styled-components';

import MyEventLog from '../MyEventLog/MyEventLog';
import Card from '../../../Shared/Components/UIElements/Card/Card';
import Button from '../../../Shared/Components/FormElements/Button/Button';

interface Props {
  events?: any;
  className?: string;
  event?: any;
  onDeleteEvent?: (deletedEventId: any) => any;
}

const MyEventLogs: React.FunctionComponent<Props> = (props) => {
  if (props.events.length === 0) {
    return (
      <div className={props.className}>
        <StyledCard>
          <h1>You Do Not Have Any Notes, Create One?</h1>
          <Button to='/add/event'>Create Note</Button>
        </StyledCard>
      </div>
    );
  }

  return (
    <ul className={props.className}>
      {props.events.map(
        (event: {
          id: number;
          title: string;
          description: string;
          start: Date;
          end: Date;
          allDay: boolean;
        }) => (
          <MyEventLog
            key={event.id}
            title={event.title}
            description={event.description}
            startDate={event.start}
            endDate={event.end}
            allDay={event.allDay}
            id={event.id}
            onDelete={props.onDeleteEvent}
          />
        )
      )}
    </ul>
  );
};

export default styled(MyEventLogs)`
  margin-top: 10rem;
`;
const StyledCard = styled(Card)`
  max-width: 50rem;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
