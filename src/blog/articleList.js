import { inject, customElement, bindable } from 'aurelia-framework';

@customElement("articleList")
export class articleList{

    @bindable list;

    constructor(){

    }
}