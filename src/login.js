import { AuthService } from 'aurelia-authentication';
import {inject, computedFrom} from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { UserService } from './services/userService';

@inject(AuthService, EventAggregator, UserService)

export class Login {
    constructor(authService, EventAggregator, UserService){
        this.authService   = authService;
        this.authenticated = false;
        this.ea = EventAggregator;
        this.userService = UserService;
    }

    // make a getter to get the authentication status.
    // use computedFrom to avoid dirty checking
    @computedFrom('authService.authenticated')
    get authenticated() {
        return this.authService.authenticated;
    }
    set authenticated(authenticated){
        this.authService.authenticated = authenticated;
    }

    // use authService.login(credentialsObject) to login to your auth server
    // authService.authenticated holds the current status
    // authService.getPayload() gives you the current payload object (for jwt)
    login(credentialsObject) {
      console.log(credentialsObject)
      console.log(this.authService);
      return this.authService.login(credentialsObject)
        .then(() => {
            if(this.authService.authenticated){
                console.log('published');
                this.ea.publish('userAuthenticated', {user: this.authService.authentication});
            }
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