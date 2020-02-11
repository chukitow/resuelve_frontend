import React, { useState } from 'react';
import { Formik } from 'formik';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { noop, capitalize } from 'lodash';
import { setSession } from 'lib/session';
import LoginService from 'services/Login';
import crypto from 'crypto-js';

const Login = ({
  type = 'admin',
  onSuccess = noop,
  onError = noop
}) => {
  const [loginError, setLoginError] = useState('');
  const [submiting, setSubmiting] = useState(false);

  const onSubmit = (values) => {
    //TODO: handle authentication based on type
    setSubmiting(true);
    const authService = type === 'admin' ? LoginService.admin : LoginService.user
    authService({
      ...values,
      password: crypto.MD5(values.password).toString()
    })
    .then(response => {
      setSession(response.headers.authorization);
      setSubmiting(false);
      onSuccess();
    })
    .catch((e) => {
      setLoginError(e.response.data);
      setSubmiting(false);
      onError();
    });
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={type === 'admin' ? { user: '', password: '' } : { email: '', password: '' }}
      >
      {({
        values,
        handleChange,
        handleSubmit
      }) => {
        const inputProps = { onChange: handleChange };
        return (
          <Card className="login-card">
            <Card.Header>{capitalize(type)}</Card.Header>
            <Card.Body>
              <Form
                id={`login-${type}`}
                onSubmit={handleSubmit}>
                {
                  loginError &&
                  <Alert
                    onClose={() => setLoginError('')}
                    variant="danger"
                    dismissible>
                    {loginError}
                  </Alert>
                }
                <Form.Group controlId={`${type}_user`}>
                  <Form.Label>User</Form.Label>
                  <Form.Control
                    value={type === 'admin' ? values.user : values.email}
                    {...inputProps}
                    {...(type === 'admin' ? { name: 'user', type: 'text'} : { name: 'email', type: 'email'})}
                    placeholder="user"
                    />
                </Form.Group>

                <Form.Group controlId={`${type}_password`}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    {...inputProps}
                    value={values.password}
                    type="password"
                    name="password"
                    placeholder="Password" />
                </Form.Group>
                <Button
                  id={`submit-button-${type}`}
                  disabled={submiting}
                  variant="primary"
                  type="submit">
                  Log in
                </Button>
              </Form>
            </Card.Body>
          </Card>
        );
      }}
    </Formik>
  )
};

export default Login;
