import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ArticleService } from '../services/articleService';
import { AuthService } from 'aurelia-authentication';

@inject(Router, ArticleService, AuthService)

export class Blog{
    constructor(router, articleService, authService){
        this.articles = null;
        this.router = router;
        this.articleService = articleService;
        this.authService = authService;
    }

    activate(params, routeConfig, $navigationInstruction) {
        this.articleService.getArticles().then((response) => {
            this.articles = response;
         });
        return true;
    }

    created(owningView, myView) {
        
    }
}