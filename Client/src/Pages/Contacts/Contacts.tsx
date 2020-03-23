import React, { useState, useEffect, useContext } from 'react';

import MyContacts from '../../Components/Contacts/MyContacts/MyContacts';
import ErrorModal from '../../Shared/Components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../Shared/Hooks/Http-Hook';
import { AuthContext } from '../../Shared/Context/auth-context';

import Pagination from '../../Utils/Pagination';

interface Props {
  notes: [any];
}

const Contacts: React.FunctionComponent<Props> = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedContacts, setLoadedContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(1);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/contacts/me`,
          'GET',
          null,
          {
            Authorization: 'Bearer ' + auth.token
          }
        );
        setLoadedContacts(responseData.contacts);
        console.log(responseData.contacts);
      } catch (err) {}
    };
    fetchContacts();
  }, [sendRequest]);

  const contactDeletedHandler = (deletedContactId: number) => {
    setLoadedContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== deletedContactId)
    );
  };

  const indexOfLastNote = currentPage * contactsPerPage;
  const indexOfFirstNote = indexOfLastNote - contactsPerPage;
  const currentNotes = loadedContacts.slice(indexOfFirstNote, indexOfLastNote);

  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedContacts && (
        <React.Fragment>
          <MyContacts
            contacts={currentNotes}
            onDeleteNote={contactDeletedHandler}
          />
          <Pagination
            itemsPerPage={contactsPerPage}
            totalItems={loadedContacts.length}
            paginate={paginate}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Contacts;
