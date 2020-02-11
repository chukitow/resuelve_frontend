import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import MockAdapter from 'axios-mock-adapter';
import axios from "axios";
import App from './App';
import { UsersList } from 'mocks/list';
import { UserMovements } from 'mocks/movements';

const mock = new MockAdapter(axios);
const actions = async (wrapper, _actions) => {
  await act(async () => {
    await (new Promise(resolve => setTimeout(resolve, 0)));
    _actions();
    wrapper.update();
  });
}

describe('@App', () => {
  let component;

  beforeEach(function () {
    mock.reset();
  })

  afterEach(function () {
    mock.restore();
  })

  const getComponent = () => {
    component= mount(<App />);
  };

  const changeValue = (target, name, value) => {
    const event = {
      target: { name, value, persist: () => {} }
    };

    component.find(target).simulate('change', event);
  };

  async function loginAsAdmin () {
    mock.onPost('/users/adminLogin').reply((config) => {
      return [200, {}, { authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJub21icmUiOiJBZG1pbiIsImFwZWxsaWRvIjoiUm9vdCIsInVpZCI6IkFBQUFBQUFBLUREREQtTU1NTS1JSUlJLU5OTk5OTk5OTk5OTiIsImFkbWluIjp0cnVlfQ.Ohm58YFY6V6Y2KtV2fQpJulwTFg-3hza99tBXC8wfsY'}]
    })

    mock.onGet('/users/list').reply(200, UsersList);

    mock.onGet('/money/conversion').reply(200, { usd2mxn:20.136, mxn2usd:0.049 });
    mock.onGet('/users/fc87b07a-7465-5c2b-84f9-4e97b8b6a986/movements').reply(200, UserMovements);

    getComponent();

    await actions(component, () => {
      changeValue('#admin_user', 'user', 'admin');
      changeValue('#admin_password', 'password', 'pruebaresuelve123');
      component.find('#login-admin').at(0).simulate('submit');
      component.update();
    });
  }

  describe('@Admin', () => {
    it('redirects to /admin on success', async () => {
      await loginAsAdmin();
      expect(window.location.pathname).toEqual('/admin');
    });

    it('displays a list of users', async () => {
      component.update();
      expect(component.find('table tbody tr').length).toEqual(UsersList.records.length);
    });

    it('goes to users movements', async () => {
      await actions(component, () => {
        component.find('.see-user-movements').first().simulate('click');
        component.update();
      });

      expect(window.location.pathname).toEqual('/admin/fc87b07a-7465-5c2b-84f9-4e97b8b6a986/movements');
    });
  });
});
