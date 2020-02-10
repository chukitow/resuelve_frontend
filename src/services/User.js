import { createAxiosWrapper } from 'config/axios';
import { getSession } from 'lib/session';

class User {
  static all(params) {
    return createAxiosWrapper({
      headers: { Authorization: `Bearer ${getSession()}` }
    }).get('/users/list', { params });
  }
}

export default User;
