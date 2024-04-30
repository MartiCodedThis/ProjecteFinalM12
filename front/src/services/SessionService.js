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
    localStorage.setItem('user', user);
  }

  getUser() {
    return localStorage.getItem('user');
  }

  clearUser() {
    localStorage.removeItem('user');
  }
}