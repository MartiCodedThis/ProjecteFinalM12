export default class SessionService {
  setToken(token) {
    sessionStorage.setItem('token', token);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  clearToken() {
    sessionStorage.removeItem('token');
  }

  setUser(user) {
    sessionStorage.setItem('user', user);
  }

  getUser() {
    return sessionStorage.getItem('user');
  }

  clearUser() {
    sessionStorage.removeItem('user');
  }
}