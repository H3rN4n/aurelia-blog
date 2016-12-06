import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ArticleService} from './../services/articleService';

@inject(Router, ArticleService)

export class createArticle{
    constructor(router, articleService){
        this.articleService = articleService;
        this.router = router;
        this.article = {
            title: '',
            content: '',
            imageUrl: ''
        }
    }

    activate(params, routeConfig, $navigationInstruction) {
        this.routeName = routeConfig.name; 
        if(routeConfig.name == "update-article"){
            this.articleService.getArticle(params.id).then((response)=>{
                this.article = response[0];
            })
        }

    }

    attached() {
        this.contentEditor = new Jodit("#article-content", {
            "toolbarButtonSize": "small"
        });
    }

    post(){
        debugger;
        if(this.routeName == "new-article"){
            this.articleService.newArticle(this.article).then((response) => {
                console.log(response);
                this.goToArticle(response.id);
            });
        } else {
            this.articleService.updateArticle(this.article).then((response) => {
                this.goToArticle(response.id);
            });
        }
        
    }

    goToArticle(id){
        //this.router.navigate('#/discussion');
        this.router.navigateToRoute('view-article', {id: id})
    }
}