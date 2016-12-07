import {inject, customElement} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)

@customElement('breadcrumb') 
export class Breadcrumb{
    constructor(router){
        this.router = router;
    }

    activate(){
        console.log(this.router);
    }
}