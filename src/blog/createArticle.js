export class createArticle{
    constructor(){
        this.newArticle = {
            title: '',
            content: '',
            imageUrl: ''
        }
    }

    attached() {
        this.contentEditor = new Jodit("#article-content", {
            "toolbarButtonSize": "small"
        });
    }

    post(){
        console.log(this.newArticle);
    }
}