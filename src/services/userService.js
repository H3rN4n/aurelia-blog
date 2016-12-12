import {inject} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';

import { singleton } from 'aurelia-framework';
//import {transient} from 'aurelia-framework';
import { AuthService } from 'aurelia-authentication';
import { GroupService } from './../services/groupService';
import { EventAggregator } from 'aurelia-event-aggregator';

@singleton()
//@transient()
@inject(Endpoint.of('public'), AuthService, GroupService, EventAggregator)

export class UserService{
    constructor(apiEndpoint, authService, groupService, EventAggregator){
        this.apiEndpoint = apiEndpoint;
        this.authService = authService;
        this.groupService = groupService;
        this.ea = EventAggregator;

        this.subscription = this.ea.subscribe('userAuthenticated', response => {
            console.log('userAuthenticated - UserService')
            console.log(response);
            // This should yield: Object {testValue: "What just happened?"}
            this.getUserRoles(response.user.responseObject.userId).then((response) => {
                console.log(response);
                this.authService.authentication.roles = response
            });
        });
    }

    getUserRoles(id){
        var promise = new Promise((resolve, reject)=>{
          return this.apiEndpoint.find('/users/' + id + '/roles/?access_token=' + this.authService.authentication.accessToken)
            .then(roles => {
                resolve(roles);
            });
        })
        
      return promise;
    }


    getUsers(){
        var promise = new Promise((resolve, reject) => {
            //resolve(this.users);
            console.log(this.authService);
            return this.apiEndpoint.find('/users/?access_token=' + this.authService.authentication.accessToken)
            .then(users => {
                resolve(users);
            }).catch((err) => alert(err));
        })
        
        return promise;
    }

    getUser(id){
        var promise = new Promise((resolve, reject) => {
            console.log(this.authService);
            return this.apiEndpoint.find('/users/' + id + '?access_token=' + this.authService.authentication.accessToken)
            .then(users => {
                resolve(users);
            }).catch((err) => alert(err));
        })
        
        return promise;
    }

    newUser(user){
        user.id = this.users.length + 1;
        this.users = this.users.concat(user);
        var promise = new Promise((resolve, reject) => {
            resolve(user);
        }).catch((err) => alert(err))
        
        return promise;
    }

    updateUser(updatedUser){
        var promise = new Promise((resolve, reject) => {
            var oldUser = this.users.filter(n => n.id == updatedUser.id);
            var index = this.users.indexOf(oldUser);
            this.users[index] = updatedUser;
            resolve(updatedUser);
        }).catch((err) => alert(err))
        
        return promise;
    }

    updateGroupInUsers(user){
        var promise = new Promise((resolve, reject) => {
            // var oldGroup = this.groups.filter(n => n.id == updatedGroup.id);
            // var index = this.groups.indexOf(oldGroup);
            // this.groups[index] = updatedGroup;
            // resolve(updatedGroup);
            resolve();
        }).catch((err) => alert(err))
        
        return promise;
    }

    deleteUser(id){
        var promise = new Promise((resolve, reject) => {
            var user = this.users.filter(n => n.id == id);
            var index = this.users.indexOf(user[0]);
            console.log(user);
            if(user[0].groups.length) reject({message: 'This group still have groups'})
            
            var result = this.groups.splice(index, 1);
            resolve(result);
        }).catch((err) => alert(err))
        
        return promise;
    }

    removeUserFromGroup(group){
        var promise = new Promise((resolve, reject) => {
            return this.apiEndpoint.destroy('/groups/'+ group.id + '/users?access_token=' + this.authService.authentication.accessToken)
            .then(users => {
                resolve(users);
            }).catch((err) => alert(err));
        })

        return promise;
    }

    addUserToGroup(group){
        var promise = new Promise((resolve, reject) => {
            return this.apiEndpoint.create('/groups/'+ group.id + '/users?access_token=' + this.authService.authentication.accessToken, group.users)
            .then(users => {
                resolve(users);
            }).catch((err) => alert(err));
        })

        return promise;
    }

}