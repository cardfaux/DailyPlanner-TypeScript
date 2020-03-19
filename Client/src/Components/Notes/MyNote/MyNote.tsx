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
  title: string;
  description: string;
  date: Date;
}

const MyNote: React.FunctionComponent<NoteProps> = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const auth = useContext(AuthContext);
  const noteId = `${props.id}`;
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
        `${process.env.REACT_APP_BACKEND_URL}/notes/${noteId}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token
        }
      );
      props.onDelete(props.id);
    } catch (err) {}

    history.push('/notes');

    addToast('Note Deleted Successfully', {
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
          Do you want to proceed and delete this note? Please note that it can't
          be undone thereafter.
        </p>
      </Modal>
      <li className={props.className}>
        <StyledCard>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className='header'>
            <header>
              <h1>{props.title}</h1>
              <h3>{auth.userName}</h3>
              <h4>
                <Moment format='YYYY/MM/DD'>{moment.utc(props.date)}</Moment>
              </h4>
            </header>
          </div>

          <Description>{props.description}</Description>
          <Footer>
            <Button inverse to={`/note/edit/${props.id}`}>
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

export default styled(MyNote)`
  text-align: center;
  list-style: none;
  max-width: 50%;
  min-width: 40rem;
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
    }
  }
`;
const StyledCard = styled(Card)`
  padding: 0;
  min-height: 10rem;
  margin-bottom: 3rem;
`;
const Description = styled.div`
  padding: 2rem;
  background: ${OffWhite};
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
