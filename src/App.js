import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from 'apps/login';
import Admin from 'apps/admin';
import { isEmpty } from 'lodash';
import { getSession } from 'lib/session';

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isEmpty(getSession()) ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/admin">
          <Admin />
        </PrivateRoute>
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
