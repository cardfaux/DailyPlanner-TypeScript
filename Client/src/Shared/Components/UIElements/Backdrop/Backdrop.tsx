import React from 'react';
import ReactDOM from 'react-dom';

import { BackdropDiv } from './Backdrop.styles';

interface BackdropProps {
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const Backdrop: React.FunctionComponent<BackdropProps> = (props) => {
  return ReactDOM.createPortal(
    <BackdropDiv onClick={props.onClick}></BackdropDiv>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
