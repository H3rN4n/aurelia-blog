import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { GroupService } from './../services/groupService';
import { UserService } from './../services/userService';
import { ValidationRules, ValidationController, validateTrigger } from 'aurelia-validation';
import { FormRendererBootstrap } from 'aurelia-form-renderer-bootstrap';

@inject(Router, UserService, GroupService, ValidationController)

export class ManageUser{
    constructor(router, userService, groupService, validationController){
        this.router = router;
        this.userService = userService;
        this.groupService = groupService;
        this.validationController = validationController;
        this.validationController.validateTrigger = validateTrigger.change;
        this.validationController.addRenderer( new FormRendererBootstrap());
        this.user = {'username':'', 'groups': [], 'fullName': ''}
    }

    activate(params, routeConfig, $navigationInstruction) {
        this.routeName = routeConfig.name; 
        
        this.groupService.getGroups().then((response)=>{
            this.groups = response;
            if(routeConfig.name == "user-management"){
                this.userService.getUser(params.id).then((response)=>{
                    this.user = response;
                    this.checkIfGroupIsSelected(this.user.groups);
                    return true;
                })
            } else {
                return true;
            }

        })
        
    }

    removeGroupFromUser(userId, group){    
        console.log(group);    
        this.userService.removeGroupFromUser(userId, group.relationId).then(()=>{
            console.log('group removed');
            var index = this.user.groups.indexOf(group);
            console.log(index); 
            this.user.groups.splice(index, 1);
            this.checkIfGroupIsSelected(this.user.groups);
        }).catch((err)=>{
            console.log(err);
        });
    }

    addGroupToUser(userId, group){
        //@todo: validate if relation exist;
        this.userService.addGroupToUser(userId, group.id).then((groupRelation)=>{
            console.log('group added');
            group.relationId = groupRelation.id;
            this.user.groups = this.user.groups.concat(group);
            this.checkIfGroupIsSelected(this.user.groups);
        }).catch((err)=>{
            console.log(err);
        });    
    }

    checkIfGroupIsSelected(userGroups){
        var userGroupsIds = userGroups.map((group)=>{return group.id});
        console.log('userGroupsIds',userGroupsIds); 
        this.groups.forEach((elem)=>{
            elem.isSelected = false;
            console.log(elem.id, userGroupsIds.indexOf(elem.id) >= 0);
            if(userGroupsIds.indexOf(elem.id) >= 0){
                elem.isSelected = true;    
            }
        })
    }

    delete(){
        console.log('delete');
        this.userService.deleteUser(this.user.id).then((response) => {
            console.log('deleteUser');
            console.log(response); 
        }, (err)=>{
            alert(err.message);
        }).catch((err) => alert(err));
    }

    post(){
        if(this.validationController.error && this.validationController.error.length > 0) return;
        
        if(this.routeName == "create-user"){
            this.userService.newUser(this.user).then((response) => {
                console.log('newUser');
               console.log(response);
                
            }).catch((err) => alert(err));
        } else {
            this.userService.updateUser(this.user).then((response) => {
               console.log('updateUser');
               console.log(response);
            }).catch((err) => alert(err));
        }

        this.groupService.updateUserInGroups(this.user).then((response) => {
            console.log('updateUserInGroups');
            console.log(response);
        }).catch((err) => alert(err));

        this.goToUserList();
        
    }

    goToUserList(){
        this.router.navigateToRoute('user-list')
    }


}