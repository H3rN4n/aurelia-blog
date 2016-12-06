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

    attached() {
        this.articleService.getArticles().then((response) => {
            this.articles = response;
         });
        return true;
    }
}