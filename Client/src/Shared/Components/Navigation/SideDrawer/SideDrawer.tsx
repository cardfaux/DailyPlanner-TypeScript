import React from 'react';
import ReactDOM from 'react-dom';

import { Aside, CSSAnimation } from './SideDrawer.styles';

interface DrawerProps {
  show: any;
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  children: React.ReactNode;
}

const SideDrawer: React.FunctionComponent<DrawerProps> = (props) => {
  const content = (
    <CSSAnimation
      in={props.show}
      timeout={200}
      classNames='slide-in-left'
      mountOnEnter
      unmountOnExit
    >
      <Aside onClick={props.onClick}>{props.children}</Aside>
    </CSSAnimation>
  );

  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;
