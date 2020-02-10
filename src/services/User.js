import { createAxiosWrapper } from 'config/axios';
import { getSession } from 'lib/session';

class User {
  static all(params = {}) {
    return createAxiosWrapper({
      headers: { Authorization: `Bearer ${getSession()}` }
    }).get('/users/list', { params });
  }

  static movements(id, params = {}) {
    return createAxiosWrapper({
      headers: { Authorization: `Bearer ${getSession()}` }
    }).get(`/users/${id}/movements`, { params });

  }
}

export default User;
