import { createAxiosWrapper } from 'config/axios';

class Login {
  static admin(data) {
    return createAxiosWrapper().post('/users/adminLogin', data);
  }
}

export default Login;
