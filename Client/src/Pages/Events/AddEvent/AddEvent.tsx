import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useToasts } from 'react-toast-notifications';

import Input from '../../../Shared/Components/FormElements/Input/Input';
import Button from '../../../Shared/Components/FormElements/Button/Button';
import ErrorModal from '../../../Shared/Components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../Shared/Components/UIElements/LoadingSpinner/LoadingSpinner';
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE
} from '../../../Utils/Validators';
import { useForm } from '../../../Shared/Hooks/Form-Hook';
import { useHttpClient } from '../../../Shared/Hooks/Http-Hook';
import { AuthContext } from '../../../Shared/Context/auth-context';

import { White } from '../../../Styles/JS/Colors';
import { BoxShadow2 } from '../../../Styles/JS/Shadows';

interface AddEventProps {
  className?: string;
}

const AddEvent: React.FunctionComponent<AddEventProps> = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { addToast } = useToasts();

  const [formState, inputHandler] = useForm(
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

  const history = useHistory();

  const eventSubmitHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/events`,
        'POST',
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
      addToast('Event Added Successfully', {
        appearance: 'success'
      });
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {/* <div className={props.className}> */}
      <form className={props.className} onSubmit={eventSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id='title'
          element='input'
          type='text'
          label='Title'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid title.'
          onInput={inputHandler}
        />
        <Input
          id='start'
          element='input'
          type='date'
          label='Start Date'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please Enter A Valid Start Date'
          onInput={inputHandler}
        />
        <Input
          id='end'
          element='input'
          type='date'
          label='End Date'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please Enter A Valid Start Date'
          onInput={inputHandler}
        />
        <Input
          id='description'
          element='textarea'
          label='Description'
          rows='10'
          validators={[VALIDATOR_MAXLENGTH(100)]}
          errorText='Please enter a valid description (less than 100 characters).'
          onInput={inputHandler}
        />
        {/* <Input
            id='allDay'
            element='input'
            type='radio'
            label='All Day Event'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please Enter A Valid Start Date'
            onInput={inputHandler}
          /> */}
        <Button type='submit' disabled={!formState.isValid}>
          ADD EVENT
        </Button>
      </form>
      {/* </div> */}
    </React.Fragment>
  );
};

export default styled(AddEvent)`
  list-style: none;
  margin: 10rem auto;
  padding: 1rem;
  width: 90%;
  max-width: 40rem;
  box-shadow: ${BoxShadow2};
  border-radius: 6px;
  background: ${White};
`;
