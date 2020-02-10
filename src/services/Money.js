import { createAxiosWrapper } from 'config/axios';
import { getSession } from 'lib/session';

class Money {
  static conversion() {
    return createAxiosWrapper({
      headers: { Authorization: `Bearer ${getSession()}` }
    }).get('/money/conversion');
  }
}

export default Money;
