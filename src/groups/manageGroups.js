import { inject, computedFrom } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { GroupService } from './../services/groupService';
import { UserService } from './../services/userService';
import { ValidationRules, ValidationController, validateTrigger } from 'aurelia-validation';
import { FormRendererBootstrap } from 'aurelia-form-renderer-bootstrap';

@inject(Router, UserService, GroupService, ValidationController)

export class ManageGroups{
    constructor(router, userService, groupService, validationController){
        this.router = router;
        this.userService = userService;
        this.groupService = groupService;
        this.validationController = validationController;
        this.validationController.validateTrigger = validateTrigger.change;
        this.validationController.addRenderer( new FormRendererBootstrap());
        this.group = {'name':'', 'users': [], 'description': ''}
    }

    // @computedFrom('group.users')
    // get groupUsers() {
    //     return group.users;
    // }
    // set groupUsers(users){
    //     this.group.users = users;
    // }

    activate(params, routeConfig, $navigationInstruction) {
        this.routeName = routeConfig.name; 
        
        this.userService.getUsers().then((users)=>{
            this.users = users;
            if(routeConfig.name == "group-management"){
                this.groupService.getGroup(params.id).then((group)=>{
                    this.group = group;
                    this.checkIfUserIsSelected(group.users);
                })
            }

            return true;
        })
    }

    checkIfUserIsSelected(groupUsers){
        var groupUsersIds = groupUsers.map((user)=>{return user.id});
        console.log(groupUsersIds); 
        this.users.forEach((elem)=>{
            elem.isSelected = false;
            console.log(elem.id, groupUsersIds.indexOf(elem.id) >= 0);
            if(groupUsersIds.indexOf(elem.id) >= 0){
                elem.isSelected = true;    
            }
        })
    }

    delete(group){
        console.log('delete');
        this.groupService.deleteGroup(group).then((response) => {
            console.log('deleteGroup');
            console.log(response); 
            this.goToGroupList();
        }, (err)=>{
            alert(err.message);
        });
    }

    removeUserFromGroup(groupId, user){        
        this.groupService.removeUserFromGroup(groupId, user.relationId).then(()=>{
            console.log('user removed');
            var index = this.group.users.indexOf(user);
            console.log(index); 
            this.group.users.splice(index, 1);
            this.checkIfUserIsSelected(this.group.users);
        }).catch((err)=>{
            console.log(err);
        });
    }

    addUserFromGroup(groupId, user){
        //@todo: validate if relation exist;
        this.groupService.addUserToGroup(groupId, user.id).then((userRelation)=>{
            console.log('user added');
            user.relationId = userRelation.id;
            this.group.users = this.group.users.concat(user);
            this.checkIfUserIsSelected(this.group.users);
        }).catch((err)=>{
            console.log(err);
        });    
    }

    post(group){
        if(this.validationController.error && this.validationController.error.length > 0) return;
        
        if(this.routeName == "create-group"){
            this.groupService.newGroup(this.group).then((response) => {
                console.log('newGroup');
               console.log(response);
                
            });
        } else {
            this.groupService.updateGroup(this.group).then((response) => {
               console.log('updateGroup');
               console.log(response);
            });
        }

        this.goToGroupList();   
    }

    goToGroupList(){
        this.router.navigateToRoute('group-list')
    }
}