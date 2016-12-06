import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ArticleService} from './../services/articleService';

@inject(Router, ArticleService)

export class createArticle{
    constructor(router, articleService){
        this.articleService = articleService;
        this.router = router;
        this.newArticle = {
            title: '',
            content: '',
            imageUrl: ''
        }
    }

    attached() {
        this.contentEditor = new Jodit("#article-content", {
            "toolbarButtonSize": "small"
        });
    }

    post(){
        console.log(this.newArticle);
        this.articleService.newArticle(this.newArticle).then((response) => {
            console.log(response);
            //this.router.
        });
    }

    goToArticle(article){
        //this.router.navigate('#/discussion');
        this.router.navigateToRoute('view-article', {id: article.id})
    }
}