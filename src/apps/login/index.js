import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Tabs, Tab } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import { getSession } from 'lib/session';
import LoginForm from 'shared/login';
import './styles.scss';

const Login = () => {
  const history = useHistory();

  useEffect(() => {
    if(!isEmpty(getSession())) {
      history.push('/admin');
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
          <LoginForm type="user" />
        </Tab>
      </Tabs>
    </Container>
  )
};

export default Login;
