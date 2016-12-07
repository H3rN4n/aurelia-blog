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
            description: '',
            content: '',
            imageUrl: ''
        }

        ValidationRules
        .ensure(a => a.title)
        .required()
        .minLength(5)
        .on(this.article);

        ValidationRules
        .ensure(a => a.description)
        .required()
        .minLength(20)
        .on(this.article);

        ValidationRules
        .ensure(a => a.content)
        .required()
        .minLength(20)
        .on(this.article);
    }

    canActivate(params, routeConfig, $navigationInstruction) {
        this.routeName = routeConfig.name; 
        if(routeConfig.name == "update-article"){
            this.articleService.getArticle(params.id).then((response)=>{
                console.log(response);
                this.article = response;
                return true;
            })
        }
    }

    attached() {
        var initJoditInterval = setInterval(()=>{
            console.log('initJoditInterval');
            if(this.article && this.article.content){
                this.initJodit();
                clearInterval(initJoditInterval);
            }
        }, 100)
    }

    initJodit(){
        this.contentEditor = new Jodit("#article-content", {
            "toolbarButtonSize": "small"
        });
    }

    post(){
        if(this.validationController.error && this.validationController.error.length > 0) return;
        
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
        this.router.navigateToRoute('view-article', {id: id})
    }


}