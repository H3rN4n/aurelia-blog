import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ArticleService} from './../services/articleService';

@inject(Router, ArticleService)

export class viewArticle{
    constructor(router, articleService){
        this.router = router;
        this.articleService = articleService;
    }

    canActivate(params, routeConfig, $navigationInstruction) {
        this.articleService.getArticle(params.id).then((response)=>{
            this.article = response[0];
        })
    }
}