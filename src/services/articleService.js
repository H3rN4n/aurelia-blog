import { singleton } from 'aurelia-framework';
//import {transient} from 'aurelia-framework';

@singleton()
//@transient()

export class ArticleService{
    constructor(){
        this.articles = [
            {'title':'Aurelia is Awesome', 'content': 'Post content', id: 1},
            {'title':'Getting started with Loopback', 'content': 'Post content', id: 2},
            {'title':'Oauth with Firebase', 'content': 'Post content', id: 3},
            {'title':'Aurelia Resources', 'content': 'Post content', id: 4}
        ];
    }

    getArticles(){
        var articles = this.articles;
        var promise = new Promise((resolve, reject) => {
            resolve(articles);
        })
        
        return promise;
    }

    getArticle(id){
        var promise = new Promise((resolve, reject) => {
            var article = this.articles.filter(n => n.id == id);
            resolve(article);
        })
        
        return promise;
    }

    newArticle(article){
        article.id = this.articles.length + 1;
        this.articles = this.articles.concat(article);

        var promise = new Promise((resolve, reject) => {
            resolve(article);
        })
        
        return promise;
    }

    updateArticle(updatedArticle){
        var promise = new Promise((resolve, reject) => {
            var oldArticle = this.articles.filter(n => n.id == updatedArticle.id);
            var index = this.articles.indexOf(oldArticle);
            console.log(index);
            this.articles[index] = updatedArticle;
            resolve(updatedArticle);
        })
        
        return promise;
    }

    deleteArticle(){

    }
}