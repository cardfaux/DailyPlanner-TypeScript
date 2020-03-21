import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useToasts } from 'react-toast-notifications';

import Input from '../../../Shared/Components/FormElements/Input/Input';
import Button from '../../../Shared/Components/FormElements/Button/Button';
import ErrorModal from '../../../Shared/Components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../../Shared/Components/UIElements/LoadingSpinner/LoadingSpinner';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH
} from '../../../Utils/Validators';
import { useForm } from '../../../Shared/Hooks/Form-Hook';
import { useHttpClient } from '../../../Shared/Hooks/Http-Hook';
import { AuthContext } from '../../../Shared/Context/auth-context';

import { White } from '../../../Styles/JS/Colors';
import { BoxShadow2 } from '../../../Styles/JS/Shadows';

interface NotesProps {
  className?: string;
}

const AddContact: React.FunctionComponent<NotesProps> = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { addToast } = useToasts();

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: false
      },
      email: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      },
      birthday: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const contactSubmitHandler = async (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/contacts`,
        'POST',
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          address: formState.inputs.address.value,
          birthday: formState.inputs.birthday.value
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      addToast('Contact Added Successfully', {
        appearance: 'success'
      });
      history.push('/');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {/* <div className={props.className}> */}
      <form className={props.className} onSubmit={contactSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id='name'
          element='input'
          type='text'
          label='Name'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid name.'
          onInput={inputHandler}
        />
        <Input
          id='email'
          element='input'
          label='E-Mail'
          type='text'
          validators={[VALIDATOR_EMAIL()]}
          errorText='Please enter a valid E-Mail.'
          onInput={inputHandler}
        />
        <Input
          id='address'
          element='input'
          label='Address'
          type='text'
          validators={[VALIDATOR_MAXLENGTH(200)]}
          errorText='Please enter a valid Address.'
          onInput={inputHandler}
        />
        <Input
          id='birthday'
          element='input'
          label='Birthday'
          type='text'
          validators={[VALIDATOR_MAXLENGTH(60)]}
          errorText='Please enter a valid Birthday.'
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!formState.isValid}>
          ADD CONTACT
        </Button>
      </form>
      {/* </div> */}
    </React.Fragment>
  );
};

export default styled(AddContact)`
  list-style: none;
  margin: 10rem auto;
  padding: 1rem;
  width: 90%;
  max-width: 40rem;
  box-shadow: ${BoxShadow2};
  border-radius: 6px;
  background: ${White};
`;
