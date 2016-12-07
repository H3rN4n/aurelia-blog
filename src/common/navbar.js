import { AuthService } from 'aurelia-authentication';
import { inject, customElement } from 'aurelia-framework'
import { Router } from 'aurelia-router'

@inject(Router, AuthService)

@customElement('nav-bar')
export class Navbar {
    constructor(router, authService){
        this.router = router;
        this.authService = authService;
    }

    attached() {
        console.log(this.authService);
    }

    logout(){
        this.authService.logout('/#/');
    }
}