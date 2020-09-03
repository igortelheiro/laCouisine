import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: boolean = true;
  clientID: number = 1;

  constructor() { }

  async isAuthenticated() {
    const promise = await new Promise((resolve, reject) => resolve(this.loggedIn));
    return promise;
  }

  login() {
    this.loggedIn = true;
    this.clientID = 1;
  }


  logout() {
    this.loggedIn = false;
  }
}
