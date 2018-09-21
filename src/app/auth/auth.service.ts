import * as firebase from 'firebase';

export class AuthService {
  token: string;

  signupUser(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then(response => {
      firebase.auth().currentUser.getIdToken().then(
        (token: string) => {
          this.token = token;
        });
    });
  }

  signinUser(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password).then(response => {
      firebase.auth().currentUser.getIdToken().then(
        (token: string) => {
          this.token = token;
        });
    });
  }

  getToken() {
    firebase.auth().currentUser.getIdToken().then((token: string) => this.token = token);
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }
}
