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
  VALIDATOR_EMAIL,
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

const EditContacts: React.FunctionComponent<EditProps> = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedContact, setLoadedContact] = useState<object | null | any>();

  let { contactId } = useParams();
  const history = useHistory();

  const { addToast } = useToasts();

  const [formState, inputHandler, setFormData] = useForm(
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
      },
      anniversary: {
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
          `${process.env.REACT_APP_BACKEND_URL}/contacts/${contactId}`,
          'GET',
          null,
          {
            Authorization: 'Bearer ' + auth.token
          }
        );
        setLoadedContact(responseData.contact);
        setFormData(
          {
            name: {
              value: responseData.contact.name,
              isValid: true
            },
            email: {
              value: responseData.contact.email,
              isValid: true
            },
            address: {
              value: responseData.contact.address,
              isValid: true
            },
            birthday: {
              value: responseData.contact.birthday,
              isValid: true
            },
            anniversary: {
              value: responseData.contact.anniversary,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchNote();
  }, [sendRequest, contactId, setFormData]);

  const contactUpdateSubmitHandler = async (event: {
    preventDefault: () => void;
  }) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/contacts/${contactId}`,
        'PATCH',
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          address: formState.inputs.address.value,
          birthday: formState.inputs.birthday.value,
          anniversary: formState.inputs.anniversary.value
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      history.push('/contacts');
    } catch (err) {}

    addToast('Contact Updated Successfully', {
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

  if (!loadedContact && !error) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find Contact!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedContact && (
        <form className={props.className} onSubmit={contactUpdateSubmitHandler}>
          <Input
            id='name'
            element='input'
            type='text'
            label='Name'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid name.'
            onInput={inputHandler}
            initialValue={loadedContact.name}
            initialValid={true}
          />
          <Input
            id='email'
            element='input'
            label='E-Mail'
            type='text'
            validators={[VALIDATOR_EMAIL()]}
            errorText='Please enter a valid E-Mail.'
            onInput={inputHandler}
            initialValue={loadedContact.email}
            initialValid={true}
          />
          <Input
            id='address'
            element='input'
            label='Address'
            type='text'
            validators={[VALIDATOR_MAXLENGTH(200)]}
            errorText='Please enter a valid address.'
            onInput={inputHandler}
            initialValue={loadedContact.address}
            initialValid={true}
          />
          <Input
            id='birthday'
            element='input'
            label='Birthday'
            type='text'
            validators={[VALIDATOR_MAXLENGTH(60)]}
            errorText='Please enter a valid birthday.'
            onInput={inputHandler}
            initialValue={loadedContact.birthday}
            initialValid={true}
          />
          <Input
            id='anniversary'
            element='input'
            label='Anniversary'
            type='text'
            validators={[VALIDATOR_MAXLENGTH(60)]}
            errorText='Please enter a valid Anniversary.'
            onInput={inputHandler}
            initialValue={loadedContact.anniversary}
            initialValid={true}
          />
          <Button type='submit' disabled={!formState.isValid}>
            UPDATE CONTACT
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default styled(EditContacts)`
  list-style: none;
  margin: 6rem auto;
  padding: 1rem;
  width: 90%;
  max-width: 40rem;
  box-shadow: ${BoxShadow2};
  border-radius: 6px;
  background: ${White};
  @media (min-width: 368px) {
  }
`;
