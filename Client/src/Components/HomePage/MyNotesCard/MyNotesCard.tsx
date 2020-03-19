import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// tslint:disable-next-line: no-submodule-imports
import { FaEvernote } from 'react-icons/fa';

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

const MyNotesCard: React.FunctionComponent<StyledProps> = ({ className }) => {
  const auth = useContext<any>(AuthContext);
  const [noteCount, setNoteCount] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/notes/me`,
          'GET',
          null,
          {
            Authorization: 'Bearer ' + auth.token
          }
        );
        setNoteCount(responseData.notes.length);
      } catch (err) {}
    };
    fetchNotes();
  }, [sendRequest, setNoteCount]);

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
          <Link to='/notes'>
            <Card className='cardDiv'>
              <h1>
                <FaEvernote /> My Notes: {noteCount}
              </h1>
            </Card>
          </Link>
          <footer className='footer'>
            <Button to='/add/note'>ADD NOTE</Button>
          </footer>
        </div>
      )}
    </React.Fragment>
  );
};

export default styled(MyNotesCard)`
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
