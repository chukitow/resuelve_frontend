import { createAxiosWrapper } from 'config/axios';

class Login {
  static admin(data) {
    return createAxiosWrapper().post('/users/adminLogin', data);
  }

  static user(data) {
    return createAxiosWrapper().post('/users/login', data);
  }
}

export default Login;
