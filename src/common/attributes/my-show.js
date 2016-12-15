import {inject, customAttribute} from 'aurelia-framework';
@customAttribute('my-show')
@inject(Element)
export class MyShow {
//   static inject = [Element];
  constructor(element) {
    this.element = element;
    console.log(this.element)

    setTimeout(()=>{
        this.valueChanged(false);
    },1000)
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