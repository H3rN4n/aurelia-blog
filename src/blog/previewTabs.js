import { inject, customElement } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)

@customElement("preview-tabs")
export class PreviewTabs {
    constructor() {
         this.myTabs = [
            { id: 'tab1', label: 'Tab 1', selected: true },
            { id: 'tab2', label: 'Tab 2' },
            { id: 'tab3', label: 'Tab 3' }
        ];
        this.myModel = { target: 'World' };
    }
}