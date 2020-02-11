import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Tabs, Tab } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import { getSession, getDecryptedSession } from 'lib/session';
import LoginForm from 'shared/login';
import './styles.scss';

const Login = () => {
  const history = useHistory();

  useEffect(() => {
    if(!isEmpty(getSession())) {
      const session = getDecryptedSession();
      session.admin ? history.push('/admin') : history.push('/user');
    }
  }, [history]);

  return (
    <Container className="main-container">
      <Tabs defaultActiveKey="admin">
        <Tab eventKey="admin" title="Admin">
          <LoginForm
            onSuccess={() => {
              history.push('/admin');
            }}
            type="admin" />
        </Tab>
        <Tab eventKey="user" title="User">
          <LoginForm
            onSuccess={() => {
              history.push('/user');
            }}
            type="user" />
        </Tab>
      </Tabs>
    </Container>
  )
};

export default Login;
