import { inject, customElement } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ArticleService } from '../services/articleService'

@inject(Router, ArticleService)

@customElement("more-article-list")
export class moreArticleList{

    constructor(router, ArticleService){
        this.router = router
        this.articleService = ArticleService
    }

    activate(params, routeConfig, $navigationInstruction) {
        this.articleService.getArticles().then((response) => {
            console.log(response);
            this.articles = response;
         });
        return true;
    }
}