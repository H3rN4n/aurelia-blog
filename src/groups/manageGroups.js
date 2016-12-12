import { inject } from 'aurelia-framework';
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

    activate(params, routeConfig, $navigationInstruction) {
        this.routeName = routeConfig.name; 
        
        this.userService.getUsers().then((users)=>{
            this.users = users;
            console.log(this.users);
        })
        

        if(routeConfig.name == "group-management"){
            this.groupService.getGroup(params.id).then((group)=>{
                this.group = group;
            })
        }

        return true;
    }

    delete(group){
        console.log('delete');
        this.groupService.deleteGroup(group).then((response) => {
            console.log('deleteGroup');
            console.log(response); 
        }, (err)=>{
            alert(err.message);
        });
    }

    toggleUserGroup(userId){
        var index = this.group.users.indexOf(userId);
        console.log(index); 
        if(index !== -1){
            console.log('remove');
            this.group.users.splice(index, 1);
            updateGroupUsers(this.group)
        } else {
            console.log('add');
            this.group.users.push(userId);
            this.updateGroupUsers(this.group);
        }
    }

    updateGroupUsers(group){
        this.userService.removeUserFromGroup(group)
        .then((user)=>{
            this.userService.addUserToGroup(group).then((users)=>{
                group.users = users
            }).catch((err)=>{
                console.log(err);
            })
        }).catch((err)=>{
            console.log(err);
        })
    }

    checkedIfUserIsSelected(userId){
        if(this.group.users && this.group.users.length){
            var index = this.group.users.indexOf(userId);
            if(index !== -1){
                return true;
            }
        }        
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

        // this.userService.updateGroupsInUsers(this.group).then((response) => {
        //     console.log('updateGroupInUsers');
        //     console.log(response);
        // });

        this.goToGroupList();
        
    }

    goToGroupList(){
        this.router.navigateToRoute('group-list')
    }


}