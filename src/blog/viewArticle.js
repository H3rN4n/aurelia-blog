import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { ArticleService } from './../services/articleService';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from './../common/prompt';
import { AuthService } from 'aurelia-authentication';

@inject(Router, ArticleService, DialogService, AuthService)

export class viewArticle{
    constructor(router, articleService, dialogService, authService){
        this.router = router;
        this.articleService = articleService;
        this.dialogService = dialogService;
        this.authService = authService;
    }

    canActivate(params, routeConfig, $navigationInstruction) {
        this.articleService.getArticle(params.id).then((response)=>{
            this.article = response;
        })
    }
    
    delete(id){
        if(!id) return;
        this.dialogService.open({ viewModel: Prompt, model: 'Good or Bad?'}).then(response => {
        if (!response.wasCancelled) {
            this.articleService.deleteArticle(id).then(()=>{
                this.goToHome();
            })
        } else {
            console.log('bad');
        }
        console.log(response.output);
        });
    }

    goToHome(){
        this.router.navigate('#/');
    }
}