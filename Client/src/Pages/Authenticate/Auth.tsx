import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useToasts } from 'react-toast-notifications';

import Card from '../../Shared/Components/UIElements/Card/Card';
import Input from '../../Shared/Components/FormElements/Input/Input';
import Button from '../../Shared/Components/FormElements/Button/Button';
import ErrorModal from '../../Shared/Components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../Shared/Components/UIElements/LoadingSpinner/LoadingSpinner';
import ImageUpload from '../../Shared/Components/FormElements/ImageUpload/ImageUpload';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../Utils/Validators';
import { useForm } from '../../Shared/Hooks/Form-Hook';
import { useHttpClient } from '../../Shared/Hooks/Http-Hook';
import { AuthContext } from '../../Shared/Context/auth-context';
import { White, Black, Secondary } from '../../Styles/JS/Colors';

interface AuthProps {
  className?: string;
}

const Auth: React.FunctionComponent<AuthProps> = ({ className }) => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { addToast } = useToasts();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          image: {
            value: null,
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        auth.login(
          responseData.userName,
          responseData.userId,
          responseData.token
        );
        addToast('Authenticated Successfully!', {
          appearance: 'success'
        });
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          'POST',
          formData
        );

        auth.login(
          responseData.userName,
          responseData.userId,
          responseData.token
        );

        addToast('Authenticated Successfully!', {
          appearance: 'success'
        });
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className={className}>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element='input'
              id='name'
              type='text'
              label='Your Name'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter a name.'
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              center
              id='image'
              onInput={inputHandler}
              errorText='Please Provide An Image'
            />
          )}
          <Input
            element='input'
            id='email'
            type='email'
            label='E-Mail'
            validators={[VALIDATOR_EMAIL()]}
            errorText='Please enter a valid email address.'
            onInput={inputHandler}
          />
          <Input
            element='input'
            id='password'
            type='password'
            label='Password'
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText='Please enter a valid password, at least 6 characters.'
            onInput={inputHandler}
          />
          <Button type='submit' disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default styled(Auth)`
  color: ${White};
  width: 90%;
  width: 100vw;
  margin: 7rem auto;
  text-align: center;

  form {
    margin-bottom: 1rem;
  }

  h2 {
    color: ${Black};
  }

  label {
    color: ${Black};
  }
  hr {
    color: ${Secondary};
  }
  /* If screen size is more than 768px wide, set the width to 11vw */
  @media (min-width: 768px) {
    max-width: 27rem;
  }
`;
