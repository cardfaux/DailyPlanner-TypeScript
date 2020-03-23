import React from 'react';
import styled from 'styled-components';

import MyContact from '../MyContact/MyContact';
import Card from '../../../Shared/Components/UIElements/Card/Card';
import Button from '../../../Shared/Components/FormElements/Button/Button';

interface Props {
  contacts?: any;
  className?: string;
  contact?: any;
  onDeleteNote: (deletedContactId: any) => any;
}

const MyContacts: React.FunctionComponent<Props> = (props) => {
  if (props.contacts.length === 0) {
    return (
      <div className={props.className}>
        <StyledCard>
          <h1>You Do Not Have Any Contacts, Create One?</h1>
          <Button to='/add/note'>Create Contact</Button>
        </StyledCard>
      </div>
    );
  }

  return (
    <ul className={props.className}>
      {props.contacts.map(
        (contact: {
          id: number;
          name: string;
          email: string;
          address: string;
          birthday: string;
        }) => (
          <MyContact
            key={contact.id}
            name={contact.name}
            email={contact.email}
            address={contact.address}
            birthday={contact.birthday}
            id={contact.id}
            onDelete={props.onDeleteNote}
          />
        )
      )}
    </ul>
  );
};

export default styled(MyContacts)`
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
