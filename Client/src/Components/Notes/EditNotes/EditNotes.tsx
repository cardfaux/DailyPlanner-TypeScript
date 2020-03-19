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

const EditNotes: React.FunctionComponent<EditProps> = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedNote, setLoadedNote] = useState<object | null | any>();

  let { noteId } = useParams();
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
      }
    },
    false
  );

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/notes/${noteId}`,
          'GET',
          null,
          {
            Authorization: 'Bearer ' + auth.token
          }
        );
        setLoadedNote(responseData.note);
        setFormData(
          {
            title: {
              value: responseData.note.title,
              isValid: true
            },
            description: {
              value: responseData.note.description,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchNote();
  }, [sendRequest, noteId, setFormData]);

  const noteUpdateSubmitHandler = async (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/notes/${noteId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      history.push('/notes');
    } catch (err) {}

    addToast('Note Updated Successfully', {
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

  if (!loadedNote && !error) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find Note!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedNote && (
        <form className={props.className} onSubmit={noteUpdateSubmitHandler}>
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title.'
            onInput={inputHandler}
            initialValue={loadedNote.title}
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
            initialValue={loadedNote.description}
            initialValid={true}
          />
          <Button type='submit' disabled={!formState.isValid}>
            UPDATE NOTE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default styled(EditNotes)`
  list-style: none;
  margin: 0 auto;
  padding: 1rem;
  width: 90%;
  max-width: 40rem;
  box-shadow: ${BoxShadow2};
  border-radius: 6px;
  background: ${White};
`;
