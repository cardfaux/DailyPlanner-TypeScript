import React, { useState, useEffect, useContext } from 'react';

import MyEventLogs from '../../Components/Events/MyEventLogs/MyEventLogs';
import ErrorModal from '../../Shared/Components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner/LoadingSpinner';
import { useHttpClient } from '../../Shared/Hooks/Http-Hook';
import { AuthContext } from '../../Shared/Context/auth-context';

interface Props {
  events: [any];
}

const EventLogs: React.FunctionComponent<Props> = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedEventLogs, setLoadedEventLogs] = useState([]);

  useEffect(() => {
    const fetchEventLogs = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/events/me`,
          'GET',
          null,
          {
            Authorization: 'Bearer ' + auth.token
          }
        );
        setLoadedEventLogs(responseData.events);
        console.log(responseData.events);
      } catch (err) {}
    };
    fetchEventLogs();
  }, [sendRequest]);

  const eventDeletedHandler = (deletedEventId: number) => {
    setLoadedEventLogs((prevEvents) =>
      prevEvents.filter((event) => event.id !== deletedEventId)
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
      {!isLoading && loadedEventLogs && (
        <MyEventLogs
          events={loadedEventLogs}
          onDeleteEvent={eventDeletedHandler}
        />
      )}
    </React.Fragment>
  );
};

export default EventLogs;
