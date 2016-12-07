import {inject} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';
//import 'fetch';
import { singleton } from 'aurelia-framework';
//import {transient} from 'aurelia-framework';

@singleton()
//@transient()

@inject(Endpoint.of('articles'))

export class ArticleService{
    constructor(articlesEndpoint){
        this.articlesEndpoint = articlesEndpoint;
    }

    getArticles(){
        var promise = new Promise((resolve, reject) => {
            return this.articlesEndpoint.find('')
            .then(articles => {
                resolve(articles);
            });
        })
        
        return promise;
    }

    getArticle(id){
        var promise = new Promise((resolve, reject) => {
            return this.articlesEndpoint.find('/' + id)
            .then(article => {
                resolve(article);
            });
        })
        return promise;
    }

    newArticle(article){
        var promise = new Promise((resolve, reject) => {
            return this.articlesEndpoint.create('', article)
            .then(article => {
                resolve(article);
            });
        })
        
        return promise;
    }

    updateArticle(article){
        var articleId = article.id;
        delete article.id;
        var promise = new Promise((resolve, reject) => {
            return this.articlesEndpoint.update('/' + articleId, null ,article)
            .then(article => {
                resolve(article);
            });
        })
        
        return promise;
    }

    deleteArticle(id){  
        var promise = new Promise((resolve, reject) => {
            return this.articlesEndpoint.destroy('/' + id)
            .then(() => {
                resolve();
            });
        })
        
        return promise;
    }
}