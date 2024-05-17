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

  setBranca(branca){
    sessionStorage.setItem('branca_id', branca)
  }
  getBranca() {
    return sessionStorage.getItem('branca_id');
  }

  clearUser() {
    sessionStorage.removeItem('branca_id');
  }
}