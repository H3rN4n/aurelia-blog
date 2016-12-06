import {DialogController} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';

@inject(DialogController)
export class Prompt {
  constructor(dialogController){
    this.controller = dialogController;
  }
  activate(){
    
  }
}