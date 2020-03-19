import * as React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { StyledHomePage as HomePage } from './Pages/HomePage/HomePage';
import Events from './Pages/Events/Events';
import AddEvent from './Pages/Events/AddEvent/AddEvent';
import Notes from './Pages/Notes/Notes';
import AddNote from './Pages/Notes/AddNote/AddNote';
import EditNote from './Pages/Notes/EditNote/EditNotePage';
import Auth from './Pages/Authenticate/Auth';
import MainNavigation from './Shared/Components/Navigation/MainNavigation/MainNavigation';
import { AuthContext } from './Shared/Context/auth-context';
import { useAuth } from './Shared/Hooks/Auth-Hook';

import { Main, GlobalStyle } from './Styles/JS/App.styles';

const App: React.FunctionComponent = () => {
  const { token, login, logout, userId, userName } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/events' exact component={Events} />
        <Route path='/add/event' exact component={AddEvent} />
        <Route path='/add/note' exact component={AddNote} />
        <Route path='/notes' exact component={Notes} />
        <Route path='/note/edit/:noteId' exact component={EditNote} />
        <Redirect to='/' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/auth' exact component={Auth} />
        <Redirect to='/auth' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        userName: userName,
        login: login,
        logout: logout
      }}
    >
      <ToastProvider
        autoDismiss
        autoDismissTimeout={4000}
        placement='bottom-right'
      >
        <Router>
          <MainNavigation />
          <Main>{routes}</Main>
          <GlobalStyle />
        </Router>
      </ToastProvider>
    </AuthContext.Provider>
  );
};

export default App;
