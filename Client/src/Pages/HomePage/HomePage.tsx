import * as React from 'react';
import styled from 'styled-components';

import MyEventsCard from '../../Components/HomePage/MyEventsCard/MyEventsCard';
import MyNotesCard from '../../Components/HomePage/MyNotesCard/MyNotesCard';
import MyContactsCard from '../../Components/HomePage/MyContactsCard/MyContactsCard';

interface StyledProps {
  className?: string;
}

const HomePage: React.FunctionComponent<StyledProps> = (props) => {
  return (
    <div className={props.className}>
      <MyEventsCard />
      <MyNotesCard />
      <MyContactsCard />
    </div>
  );
};

export const StyledHomePage = styled(HomePage)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  @media (min-width: 370px) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`;
