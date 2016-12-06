//import jodit from 'jodit/jodit.min.js';
//var riveted = require("exports?riveted!riveted")
//var Jodit = require("jodit/jodit.min.js")

export class createArticle{
    constructor(){
        this.newArticle = {
            title: '',
            content: '',
            imageUrl: ''
        }
    }

    attached() {
        this.contentEditor = new Jodit("#content", {
            "toolbarButtonSize": "small"
        });
    }

    post(){
        console.log(this.newArticle);
    }
}