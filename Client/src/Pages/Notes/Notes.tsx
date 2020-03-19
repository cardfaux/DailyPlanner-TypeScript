import React, { useState, useEffect, useContext } from 'react';

import MyNotes from '../../Components/Notes/MyNotes/MyNotes';
import ErrorModal from '../../Shared/Components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../Shared/Hooks/Http-Hook';
import { AuthContext } from '../../Shared/Context/auth-context';

interface Props {
  notes: [any];
}

const Notes: React.FunctionComponent<Props> = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedNotes, setLoadedNotes] = useState([]);

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
        setLoadedNotes(responseData.notes);
        console.log(responseData.notes);
      } catch (err) {}
    };
    fetchNotes();
  }, [sendRequest]);

  const noteDeletedHandler = (deletedNoteId: number) => {
    setLoadedNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== deletedNoteId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedNotes && (
        <MyNotes notes={loadedNotes} onDeleteNote={noteDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default Notes;
