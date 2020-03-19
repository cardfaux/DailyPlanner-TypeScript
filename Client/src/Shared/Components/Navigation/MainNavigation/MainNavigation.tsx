import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

import MainHeader from '../MainHeader/MainHeader';
import NavLinks from '../NavLinks/NavLinks';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../../UIElements/Backdrop/Backdrop';
import { Hamburger, Title, Nav, DrawerNav } from './MainNavigation.styles';

const MainNavigation: React.FunctionComponent = () => {
  const fade = useSpring({
    from: {
      opacity: 0
    },
    to: {
      opacity: 1
    }
  });

  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <DrawerNav>
          <NavLinks />
        </DrawerNav>
      </SideDrawer>

      <MainHeader>
        <Hamburger onClick={openDrawerHandler}>
          <animated.span style={fade} />
          <animated.span style={fade} />
          <animated.span style={fade} />
        </Hamburger>
        <animated.div style={fade}>
          <Title>
            <Link to='/'>DailyPlanner</Link>
          </Title>
        </animated.div>
        <Nav>
          <NavLinks />
        </Nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
