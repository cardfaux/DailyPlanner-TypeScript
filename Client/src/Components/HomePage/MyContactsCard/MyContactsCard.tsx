import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// tslint:disable-next-line: no-submodule-imports
import { AiOutlineContacts } from 'react-icons/ai';

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

const MyContactsCard: React.FunctionComponent<StyledProps> = ({
  className
}) => {
  const auth = useContext<any>(AuthContext);
  const [contactCount, setContactCount] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/contacts/me`,
          'GET',
          null,
          {
            Authorization: 'Bearer ' + auth.token
          }
        );
        setContactCount(responseData.contacts.length);
      } catch (err) {}
    };
    fetchEvents();
  }, [sendRequest, setContactCount]);

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
          <Link to='/contacts'>
            <Card className='cardDiv'>
              <h1>
                <AiOutlineContacts /> My Contacts: {contactCount}
              </h1>
            </Card>
          </Link>
          <footer className='footer'>
            <Button to='/add/contact'>ADD CONTACT</Button>
          </footer>
        </div>
      )}
    </React.Fragment>
  );
};

export default styled(MyContactsCard)`
  margin: 2rem 1rem;
  width: 95%;
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
  @media (min-width: 368px) {
  }
`;
