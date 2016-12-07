import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { UserService } from './../services/userService';

@inject(Router, UserService)

export class UserList{
    constructor(router, userService){
        this.router = router;
        this.userService = userService;
    }

    activate(params, routeConfig, $navigationInstruction) {
        this.userService.getUsers().then((response) => {
            this.users = response;
         });
        return true;
    }


}