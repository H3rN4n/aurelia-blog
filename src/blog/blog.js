import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ArticleService } from '../services/articleService'

@inject(Router, ArticleService)

export class Blog{
    constructor(router, ArticleService){
        this.articles = null;
        this.router = router;
        this.ArticleService = ArticleService;
        this.articles = [
            {'title':'Aurelia is Awesome', 'content': 'Post content', id: 1},
            {'title':'Getting started with Loopback', 'content': 'Post content', id: 2},
            {'title':'Oauth with Firebase', 'content': 'Post content', id: 3},
            {'title':'Aurelia Resources', 'content': 'Post content', id: 4}
        ];
    }

    canActivate(params, routeConfig, $navigationInstruction) {
        
    }
    
    activate(params, routeConfig, $navigationInstruction) {
        console.log(ArticleService);
        //this.articles = ArticleService.getArticles();
        return true;
    }

    canDeactivate() {
        
    }

    deactivate() {
        
    }

    created(owningView, myView) {
        
    }
}