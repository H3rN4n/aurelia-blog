//import { singleton } from 'aurelia-framework';
import {transient} from 'aurelia-framework';

//@singleton()
@transient()

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
}