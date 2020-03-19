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

interface NotesProps {
  className?: string;
}

const AddNote: React.FunctionComponent<NotesProps> = (props) => {
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
      }
    },
    false
  );

  const history = useHistory();

  const noteSubmitHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/notes`,
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      addToast('Note Added Successfully', {
        appearance: 'success'
      });
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {/* <div className={props.className}> */}
      <form className={props.className} onSubmit={noteSubmitHandler}>
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
          id='description'
          element='textarea'
          label='Description'
          rows='10'
          validators={[VALIDATOR_MAXLENGTH(800)]}
          errorText='Please enter a valid description (less than 800 characters).'
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!formState.isValid}>
          ADD NOTE
        </Button>
      </form>
      {/* </div> */}
    </React.Fragment>
  );
};

export default styled(AddNote)`
  list-style: none;
  margin: 10rem auto;
  padding: 1rem;
  width: 90%;
  max-width: 40rem;
  box-shadow: ${BoxShadow2};
  border-radius: 6px;
  background: ${White};
`;
