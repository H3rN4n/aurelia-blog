import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)

export class Blog{
    constructor(router){
        this.articles = null;
        this.router = router;
    }

    canActivate(params, routeConfig, $navigationInstruction) {
        
    }
    
    activate(params, routeConfig, $navigationInstruction) {
        this.articles = [
            {'title':'Aurelia is Awesome', 'content': 'Post content'},
            {'title':'Getting started with Loopback', 'content': 'Post content'},
            {'title':'Oauth with Firebase', 'content': 'Post content'},
            {'title':'Aurelia Resources', 'content': 'Post content'}
        ]
    }

    canDeactivate() {
        
    }

    deactivate() {
        
    }

    created(owningView, myView) {
        
    }
}