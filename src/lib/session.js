import jwtDecode from 'jwt-decode';
const SESSION_KEY = 'session';

export const setSession = (data) =>
  window.localStorage.setItem(SESSION_KEY, data.replace('Bearer ', ''));

export const getSession = () =>
  window.localStorage.getItem(SESSION_KEY);

export const getDecryptedSession = () =>
  jwtDecode(getSession());

export const clearSession = () =>
  window.localStorage.clear();
