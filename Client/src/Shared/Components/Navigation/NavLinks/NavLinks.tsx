import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../../Context/auth-context';
import { Navigation, ListItem, Button } from './NavLinks.styles';

const NavLinks: React.FunctionComponent = () => {
  const auth = useContext(AuthContext);

  return (
    <Navigation>
      <ListItem>
        <a href='!#'>
          {auth.isLoggedIn ? `Hello ${auth.userName}` : 'Hello Guest'}
        </a>
      </ListItem>

      {auth.isLoggedIn && (
        <ListItem>
          <NavLink to='/events'>MY EVENTS</NavLink>
        </ListItem>
      )}
      {auth.isLoggedIn && (
        <ListItem>
          <NavLink to='/notes'>MY NOTES</NavLink>
        </ListItem>
      )}
      {auth.isLoggedIn && (
        <ListItem>
          <NavLink to='/posts/new'>MY CONTACTS</NavLink>
        </ListItem>
      )}
      {!auth.isLoggedIn && (
        <ListItem>
          <NavLink to='/auth'>AUTHENTICATE</NavLink>
        </ListItem>
      )}
      {auth.isLoggedIn && (
        <ListItem>
          <Button onClick={auth.logout}>LOGOUT</Button>
        </ListItem>
      )}
    </Navigation>
  );
};

export default NavLinks;
