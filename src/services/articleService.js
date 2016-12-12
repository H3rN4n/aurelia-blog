import {inject} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';
//import 'fetch';
import { singleton } from 'aurelia-framework';
//import {transient} from 'aurelia-framework';

@singleton()
//@transient()

@inject(Endpoint.of('public'))

export class ArticleService{
    constructor(apiEndpoint){
        this.apiEndpoint = apiEndpoint;
    }

    getArticles(){
        var promise = new Promise((resolve, reject) => {
            return this.apiEndpoint.find('/posts',)
            .then(users => {
                resolve(users);
            });
        })
        
        return promise;
    }

    getArticle(id){
        var promise = new Promise((resolve, reject) => {
            return this.apiEndpoint.find('/posts/' + id)
            .then(article => {
                resolve(article);
            });
        })
        return promise;
    }

    newArticle(article){
        var promise = new Promise((resolve, reject) => {
            return this.apiEndpoint.create('/posts', article)
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
            return this.apiEndpoint.update('/posts/' + articleId, null ,article)
            .then(article => {
                resolve(article);
            });
        })
        
        return promise;
    }

    deleteArticle(id){  
        var promise = new Promise((resolve, reject) => {
            return this.apiEndpoint.destroy('/posts/' + id)
            .then(() => {
                resolve();
            });
        })
        
        return promise;
    }
}