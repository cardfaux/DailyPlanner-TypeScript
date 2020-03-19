import * as React from 'react';
import styled from 'styled-components';

import MyEventsCard from '../../Components/HomePage/MyEventsCard/MyEventsCard';
import MyNotesCard from '../../Components/HomePage/MyNotesCard/MyNotesCard';

interface StyledProps {
  className?: string;
}

const HomePage: React.FunctionComponent<StyledProps> = (props) => {
  return (
    <div className={props.className}>
      <MyEventsCard />
      <MyNotesCard />
    </div>
  );
};

export const StyledHomePage = styled(HomePage)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
