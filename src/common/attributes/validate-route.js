import {inject, customAttribute} from 'aurelia-framework';
import { AuthService } from 'aurelia-authentication';

@customAttribute('validate-route')
@inject(Element, AuthService)
export class ValidateRoute {
//   static inject = [Element];
  constructor(element, authService) {
    this.element = element;
    console.log(this.element)
    this.authService = authService;
  }

  valueChanged(newValue){
      console.log(newValue);
    if (newValue) {
      this.element.classList.remove('aurelia-hide');
    } else {
      this.element.classList.add('aurelia-hide');
    }
  }
}