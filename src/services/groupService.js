import { singleton } from 'aurelia-framework';
//import {transient} from 'aurelia-framework';

@singleton()
//@transient()

export class GroupService{
    constructor(){
        this.groups = [
            {'title':'Group 1', 'users': [1,2], 'description': 'Description', id: 1},
            {'title':'Group 2', 'users': [2,3], 'description': 'Description', id: 2},
            {'title':'Group 3', 'users': [4], 'description': 'Description', id: 3},
            {'title':'Group 4', 'users': [1,3], 'description': 'Description', id: 4}
        ];
    }

    getGroups(){
        var promise = new Promise((resolve, reject) => {
            resolve(this.groups);
        })
        
        return promise;
    }

    getGroup(id){
        var promise = new Promise((resolve, reject) => {
            var group = this.groups.filter(n => n.id == id);
            resolve(group);
        })
        
        return promise;
    }

    newGroup(group){
        group.id = this.groups.length + 1;
        this.groups = this.groups.concat(group);
        var promise = new Promise((resolve, reject) => {
            resolve(group);
        })
        
        return promise;
    }

    updateGroup(updatedGroup){
        var promise = new Promise((resolve, reject) => {
            var oldGroup = this.groups.filter(n => n.id == updatedGroup.id);
            var index = this.groups.indexOf(oldGroup);
            this.groups[index] = updatedGroup;
            resolve(updatedGroup);
        })
        
        return promise;
    }

    updateUserInGroups(user){
        var promise = new Promise((resolve, reject) => {
            // var oldGroup = this.groups.filter(n => n.id == updatedGroup.id);
            // var index = this.groups.indexOf(oldGroup);
            // this.groups[index] = updatedGroup;
            // resolve(updatedGroup);
            resolve();
        })
        
        return promise;
    }

    deleteGroup(id){
        var promise = new Promise((resolve, reject) => {
            var group = this.groups.filter(n => n.id == id);
            var index = this.groups.indexOf(group[0]);
            console.log(group);
            if(group[0].users.length) reject({message: 'This group still have users'})
            
            var result = this.groups.splice(index, 1);
            resolve(result);
        })
        
        return promise;
    }
}