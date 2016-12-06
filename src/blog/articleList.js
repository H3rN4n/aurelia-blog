import { inject, customElement, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)

@customElement("article-list")
export class articleList{

    @bindable list;

    constructor(router){
        this.router = router
    }
}