import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import styled from 'styled-components';
import Moment from 'react-moment';
import moment from 'moment';

import Card from '../../../Shared/Components/UIElements/Card/Card';
import LoadingSpinner from '../../../Shared/Components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../../Shared/Components/UIElements/ErrorModal/ErrorModal';
import Modal from '../../../Shared/Components/UIElements/Modal/Modal';
import Button from '../../../Shared/Components/FormElements/Button/Button';
import { AuthContext } from '../../../Shared/Context/auth-context';
import { useHttpClient } from '../../../Shared/Hooks/Http-Hook';

import { Primary, Secondary, OffWhite, White } from '../../../Styles/JS/Colors';

interface NoteProps {
  id: number;
  onDelete: (id: any) => void;
  className?: string;
  name: string;
  email: string;
  address: string;
  birthday: string;
  anniversary: string;
}

const MyContact: React.FunctionComponent<NoteProps> = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const auth = useContext(AuthContext);
  const contactId = `${props.id}`;
  const history = useHistory();
  const { addToast } = useToasts();

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/contacts/${contactId}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token
        }
      );
      props.onDelete(props.id);
    } catch (err) {}

    history.push('/contacts');

    addToast('Contact Deleted Successfully', {
      appearance: 'success',
      autoDismiss: true
    });
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header='Are you sure?'
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this contact? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className={props.className}>
        <StyledCard>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className='header'>
            <header>
              <h1>{props.name}</h1>
            </header>
            <section>
              <h3>{props.email}</h3>
            </section>
          </div>

          <Description>
            {props.address}
            <h4>
              <Moment format='MMMM/DD/YYYY'>
                {moment.utc(props.birthday)}
              </Moment>
            </h4>
            <h4>
              <Moment format='MMMM/DD/YYYY'>
                {moment.utc(props.anniversary)}
              </Moment>
            </h4>
          </Description>
          <Footer>
            <Button inverse to={`/contact/edit/${props.id}`}>
              EDIT
            </Button>
            <Button danger onClick={showDeleteWarningHandler}>
              DELETE
            </Button>
          </Footer>
        </StyledCard>
      </li>
    </React.Fragment>
  );
};

export default styled(MyContact)`
  text-align: center;
  list-style: none;
  width: 95%;
  margin: auto;
  .header {
    background: ${Secondary};
    h1 {
      margin: 0;
    }
    header {
      color: ${Primary};
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      @media (min-width: 850px) {
        > h2 {
          font-size: 2rem;
        }
        > h6 {
          font-size: 1rem;
        }
      }
    }
  }
  @media (min-width: 850px) {
    max-width: 45rem;
  }
`;
const StyledCard = styled(Card)`
  padding: 0;
  min-height: 10rem;
  margin-bottom: 3rem;
`;
const Description = styled.div`
  padding: 1rem 1.5rem;
  background: ${OffWhite};
  font-size: 0.75rem;
  @media (min-width: 850px) {
    font-size: inherit;
  }
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: 2px solid ${Secondary};
  background: ${White};
  padding: 0.5rem 0;
`;
