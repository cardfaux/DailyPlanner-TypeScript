import React from 'react';
import styled from 'styled-components';

import MyNote from '../MyNote/MyNote';
import Card from '../../../Shared/Components/UIElements/Card/Card';
import Button from '../../../Shared/Components/FormElements/Button/Button';

interface Props {
  notes: any;
  className?: string;
  note?: any;
  onDeleteNote: (deletedNoteId: any) => any;
}

const MyNotes: React.FunctionComponent<Props> = (props) => {
  if (props.notes.length === 0) {
    return (
      <div className={props.className}>
        <StyledCard>
          <h1>You Do Not Have Any Notes, Create One?</h1>
          <Button to='/add/note'>Create Note</Button>
        </StyledCard>
      </div>
    );
  }

  return (
    <ul className={props.className}>
      {props.notes.map(
        (note: {
          id: number;
          title: string;
          description: string;
          date: Date;
        }) => (
          <MyNote
            key={note.id}
            title={note.title}
            description={note.description}
            date={note.date}
            id={note.id}
            onDelete={props.onDeleteNote}
          />
        )
      )}
    </ul>
  );
};

export default styled(MyNotes)`
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
