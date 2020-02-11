import { createAxiosWrapper } from 'config/axios';
import { getSession } from 'lib/session';
import { isEmpty } from 'lodash';

class User {
  static all(params = {}) {
    return createAxiosWrapper({
      headers: { Authorization: `Bearer ${getSession()}` }
    }).get('/users/list', { params });
  }

  static movements(id, params = {}) {
    const endpoint = isEmpty(id) ? '/users/myMovements' : `/users/${id}/movements`
    return createAxiosWrapper({
      headers: { Authorization: `Bearer ${getSession()}` }
    }).get(endpoint, { params });

  }

  static myMovements(_, params = {}) {
    return createAxiosWrapper({
      headers: { Authorization: `Bearer ${getSession()}` }
    }).get('', { params });

  }
}

export default User;
