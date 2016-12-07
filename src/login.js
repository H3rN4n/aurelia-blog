import { AuthService } from 'aurelia-authentication';
import {inject, computedFrom} from 'aurelia-framework';

@inject(AuthService)

export class Login {
    constructor(authService){
        this.authService   = authService;
        this.authenticated = false;
    }

    // make a getter to get the authentication status.
    // use computedFrom to avoid dirty checking
    @computedFrom('authService.authenticated')
    get authenticated() {
      return this.authService.authenticated;
    }

    // use authService.login(credentialsObject) to login to your auth server
    // authService.authenticated holds the current status
    // authService.getPayload() gives you the current payload object (for jwt)
    login(credentialsObject) {
      console.log(credentialsObject)
      return this.authService.login(credentialsObject)
        .then(() => {
            this.authenticated = this.authService.authenticated;
        });
    };

    // use authService.logout to delete stored data
    // set expiredRedirect in your settings to automatically redirect
    logout() {
      return this.authService.logout()
        .then(() => {
          this.authenticated = this.authService.authenticated;
        });
    }
}