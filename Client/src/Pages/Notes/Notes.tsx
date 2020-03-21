import React, { useState, useEffect, useContext } from 'react';

import MyNotes from '../../Components/Notes/MyNotes/MyNotes';
import ErrorModal from '../../Shared/Components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../Shared/Hooks/Http-Hook';
import { AuthContext } from '../../Shared/Context/auth-context';

import Pagination from '../../Utils/Pagination';

interface Props {
  notes: [any];
}

const Notes: React.FunctionComponent<Props> = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedNotes, setLoadedNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(1);

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

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = loadedNotes.slice(indexOfFirstNote, indexOfLastNote);

  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedNotes && (
        <React.Fragment>
          <MyNotes notes={currentNotes} onDeleteNote={noteDeletedHandler} />
          <Pagination
            itemsPerPage={notesPerPage}
            totalItems={loadedNotes.length}
            paginate={paginate}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Notes;
