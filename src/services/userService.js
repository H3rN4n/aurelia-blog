import { singleton } from 'aurelia-framework';
//import {transient} from 'aurelia-framework';

@singleton()
//@transient()

export class UserService{
    constructor(){
        this.users = [
            {'username':'user1', 'groups': [1,4], 'fullName': 'Hernan De Souza', id: 1},
            {'username':'user2', 'groups': [1,2], 'fullName': 'John Doe', id: 2},
            {'username':'user3', 'groups': [2,4], 'fullName': 'Leonardo Otero', id: 3},
            {'username':'user4', 'groups': [3], 'fullName': 'Doctor Strange', id: 4}
        ];
    }

    getUsers(){
        var promise = new Promise((resolve, reject) => {
            resolve(this.users);
        })
        
        return promise;
    }

    getUser(id){
        var promise = new Promise((resolve, reject) => {
            var user = this.users.filter(n => n.id == id);
            resolve(user);
        })
        
        return promise;
    }

    newUser(user){
        user.id = this.users.length + 1;
        this.users = this.users.concat(user);
        var promise = new Promise((resolve, reject) => {
            resolve(user);
        })
        
        return promise;
    }

    updateUser(updatedUser){
        var promise = new Promise((resolve, reject) => {
            var oldUser = this.users.filter(n => n.id == updatedUser.id);
            var index = this.users.indexOf(oldUser);
            this.users[index] = updatedUser;
            resolve(updatedUser);
        })
        
        return promise;
    }

    updateGroupInUsers(user){
        var promise = new Promise((resolve, reject) => {
            // var oldGroup = this.groups.filter(n => n.id == updatedGroup.id);
            // var index = this.groups.indexOf(oldGroup);
            // this.groups[index] = updatedGroup;
            // resolve(updatedGroup);
            resolve();
        })
        
        return promise;
    }

    deleteUser(id){
        var promise = new Promise((resolve, reject) => {
            var user = this.users.filter(n => n.id == id);
            var index = this.users.indexOf(user[0]);
            
            var user = this.users.splice(index, 1);
            resolve(user);
        })
        
        return promise;
    }
}