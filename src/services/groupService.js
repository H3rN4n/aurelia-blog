import {inject} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';

import { singleton } from 'aurelia-framework';
//import {transient} from 'aurelia-framework';
import { AuthService } from 'aurelia-authentication';

@singleton()
//@transient()
@inject(Endpoint.of('public'), AuthService)

export class GroupService{
    constructor(apiEndpoint, authService){
        this.apiEndpoint = apiEndpoint;
        this.authService = authService;
    }

    getGroups(){
        var promise = new Promise((resolve, reject) => {
            return this.apiEndpoint.find('/groups/?access_token=' + this.authService.authentication.accessToken)
            .then(groups => {
                resolve(groups);
            });
        })
        
        return promise;
    }

    getGroup(id){
        var promise = new Promise((resolve, reject) => {
            return this.apiEndpoint.find('/groups/'+ id, {
                "access_token" : this.authService.authentication.accessToken,
                "filter" : {"include": "users"}
            })
            .then(group => {
                console.log(group);
                resolve(group);
            });
        })
        
        return promise;
    }

    newGroup(group){
        var promise = new Promise((resolve, reject) => {
            return this.apiEndpoint.create('/groups/', group, {
                "access_token" : this.authService.authentication.accessToken,
                "filter" : {"include": "users"}
            })
            .then(group => {
                resolve(group);
            });
        })
        
        return promise;
      
    }

    updateGroup(group){
        var groupId = group.id;
        delete group.id;
        var promise = new Promise((resolve, reject) => {
            return this.apiEndpoint.update('/groups/' + groupId, {
                "access_token" : this.authService.authentication.accessToken,
                "filter" : {"include": "users"}
            } ,group)
            .then(group => {
                resolve(group);
            }).catch((err) => {
                reject(err);
            });
        })
        
        return promise;
    }

    // getUsersInGroup(group){
    //     var promise = new Promise((resolve, reject) => {
    //         return this.apiEndpoint.find('/groups/' + group.id + '/users?access_token=' + this.authService.authentication.accessToken)
    //         .then(users => {
    //             resolve(users);
    //         }).catch((err) => {
    //             reject(err);
    //         });
    //     })
        
    //     return promise;
    // }

    deleteGroup(group){
        console.log(group);
        var promise = new Promise((resolve, reject) => {
            if(group.users && group.users.length) {
               return reject({message: 'This group still have users'})
            } else {
                return this.apiEndpoint.destroy('/groups/' + group.id)
                .then(() => {
                    resolve();
                }).catch((err)=> alert(err));
            }
        })
        
        return promise;
    }

    removeUserFromGroup(groupId, fkId){
        var promise = new Promise((resolve, reject) => {
            return this.apiEndpoint.destroy('/groups/'+ groupId + '/users/' + fkId,{
                "access_token" : this.authService.authentication.accessToken,
                "filter" : {"include": "users"}
            })
            .then(() => {
                resolve();
            }).catch((err) => alert(err));
        })

        return promise;
    }

    addUserToGroup(groupId, userId){
        var promise = new Promise((resolve, reject) => {
            return this.apiEndpoint.create('/groups/'+ groupId + '/users', {
                "userId": userId,
                "groupId": groupId
            },{
                "access_token" : this.authService.authentication.accessToken,
                "filter" : {"include": "users"}
            })
            .then(users => {
                resolve(users);
            }).catch((err) => alert(err));
        })

        return promise;
    }
}