import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import Input from '../../../Shared/Components/FormElements/Input/Input';
import Button from '../../../Shared/Components/FormElements/Button/Button';
import Card from '../../../Shared/Components/UIElements/Card/Card';
import LoadingSpinner from '../../../Shared/Components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../Shared/Components/UIElements/ErrorModal/ErrorModal';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH
} from '../../../Utils/Validators';
import { useHttpClient } from '../../../Shared/Hooks/Http-Hook';
import { AuthContext } from '../../../Shared/Context/auth-context';
import { useForm } from '../../../Shared/Hooks/Form-Hook';

import { White } from '../../../Styles/JS/Colors';
import { BoxShadow2 } from '../../../Styles/JS/Shadows';

interface EditProps {
  className?: string;
}

const EditEvents: React.FunctionComponent<EditProps> = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedEvent, setLoadedEvent] = useState<object | null | any>();

  let { eventId } = useParams();
  const history = useHistory();

  const { addToast } = useToasts();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      start: {
        value: '',
        isValid: false
      },
      end: {
        value: '',
        isValid: false
      },
      allDay: {
        value: true,
        isValid: true
      }
    },
    false
  );

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/events/${eventId}`,
          'GET',
          null,
          {
            Authorization: 'Bearer ' + auth.token
          }
        );
        setLoadedEvent(responseData.event);
        setFormData(
          {
            title: {
              value: responseData.event.title,
              isValid: true
            },
            description: {
              value: responseData.event.description,
              isValid: true
            },
            start: {
              value: responseData.event.start,
              isValid: true
            },
            end: {
              value: responseData.event.end,
              isValid: true
            },
            allDay: {
              value: responseData.event.allDay,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchEvent();
  }, [sendRequest, eventId, setFormData]);

  const eventUpdateSubmitHandler = async (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/events/${eventId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          start: formState.inputs.start.value,
          end: formState.inputs.end.value,
          allDay: formState.inputs.allDay.value
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      history.push('/events');
    } catch (err) {}

    addToast('Event Updated Successfully', {
      appearance: 'success'
    });
  };

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedEvent && !error) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find Event!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedEvent && (
        <form className={props.className} onSubmit={eventUpdateSubmitHandler}>
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title.'
            onInput={inputHandler}
            initialValue={loadedEvent.title}
            initialValid={true}
          />
          <Input
            id='description'
            element='textarea'
            rows='10'
            label='Description'
            validators={[VALIDATOR_MAXLENGTH(800)]}
            errorText='Please enter a valid note (max. 800 characters).'
            onInput={inputHandler}
            initialValue={loadedEvent.description}
            initialValid={true}
          />
          <Input
            id='start'
            element='input'
            type='date'
            label='Start Date'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid start date.'
            onInput={inputHandler}
            initialValue={loadedEvent.start}
            initialValid={true}
          />
          <Input
            id='end'
            element='input'
            type='date'
            label='End Date'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid end date.'
            onInput={inputHandler}
            initialValue={loadedEvent.end}
            initialValid={true}
          />
          <Button type='submit' disabled={!formState.isValid}>
            UPDATE EVENT
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default styled(EditEvents)`
  list-style: none;
  margin: 0 auto;
  padding: 1rem;
  width: 90%;
  max-width: 40rem;
  box-shadow: ${BoxShadow2};
  border-radius: 6px;
  background: ${White};
`;
