import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import { ArticleService } from './../services/articleService';
import { ValidationRules, ValidationController, validateTrigger } from 'aurelia-validation';
import { FormRendererBootstrap } from 'aurelia-form-renderer-bootstrap';

@inject(Router, ArticleService, ValidationController)

export class createArticle{
    constructor(router, articleService, validationController){
        this.articleService = articleService;
        this.validationController = validationController;
        this.validationController.validateTrigger = validateTrigger.change;
        this.validationController.addRenderer( new FormRendererBootstrap());
        this.router = router;
        this.article = {
            title: '',
            content: '',
            imageUrl: ''
        }

        ValidationRules
        .ensure(a => a.title)
        .required()
        .minLength(5)
        .on(this.article)
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