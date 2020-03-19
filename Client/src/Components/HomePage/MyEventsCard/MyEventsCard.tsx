import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// tslint:disable-next-line: no-submodule-imports
import { FaRegCalendarAlt } from 'react-icons/fa';

import ErrorModal from '../../../Shared/Components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../Shared/Components/UIElements/LoadingSpinner/LoadingSpinner';
import Card from '../../../Shared/Components/UIElements/Card/Card';
import Button from '../../../Shared/Components/FormElements/Button/Button';
import { useHttpClient } from '../../../Shared/Hooks/Http-Hook';
import { AuthContext } from '../../../Shared/Context/auth-context';

import { Secondary, Primary } from '../../../Styles/JS/Colors';

interface StyledProps {
  className?: string;
}

const MyEventsCard: React.FunctionComponent<StyledProps> = ({ className }) => {
  const auth = useContext<any>(AuthContext);
  const [eventCount, setEventCount] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/events/me`,
          'GET',
          null,
          {
            Authorization: 'Bearer ' + auth.token
          }
        );
        setEventCount(responseData.events.length);
      } catch (err) {}
    };
    fetchEvents();
  }, [sendRequest, setEventCount]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <div className={className}>
          <Link to='/events'>
            <Card className='cardDiv'>
              <h1>
                <FaRegCalendarAlt /> My Events: {eventCount}
              </h1>
            </Card>
          </Link>
          <footer className='footer'>
            <Button to='/add/event'>ADD EVENT</Button>
          </footer>
        </div>
      )}
    </React.Fragment>
  );
};

export default styled(MyEventsCard)`
  margin: 4rem;
  width: 30rem;
  text-align: center;

  a {
    text-decoration: none;
    color: black;
  }
  .cardDiv {
    &:hover {
      background: ${Secondary};
      color: ${Primary};
    }
  }
  svg {
    color: ${Primary};
  }
  .footer {
    border-radius: 6px;
    background: ${Secondary};
    &:hover {
      background: ${Primary};
    }

    > div a {
      margin-right: 0;
    }
  }
`;
