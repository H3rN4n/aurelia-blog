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
            if(routeConfig.name == "group-management"){
                this.groupService.getGroup(params.id).then((group)=>{
                    this.group = group;
                })
            }
            return true;
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

    removeUserFromGroup(groupId, relation){        
        this.groupService.removeUserFromGroup(groupId, relation.id).then(()=>{
            console.log('user removed');
            var index = this.group.users.indexOf(relation);
            console.log(index); 
            this.group.users.splice(index, 1);
        }).catch((err)=>{
            console.log(err);
        });
    }

    getUserName(id){
        function checkValue(value) {
            return value.id == id;            
        }

        var filtered = this.users.filter(checkValue);
        return filtered[0].firstName + " " + filtered[0].lastName;;   
    }

    addUserFromGroup(groupId, userId){
        //@todo: validate if relation exist;
        this.groupService.addUserToGroup(groupId, userId).then((user)=>{
            console.log('user added');
            this.group.users = this.group.users.concat(user); 
        }).catch((err)=>{
            console.log(err);
        });    
    }
    

    checkedIfUserIsSelected(obj, type){
        console.log(obj ,type)
        function checkValue(value) {
            if(type == "relation"){
                return value.userId == obj.userId;
            } else {
                return value.userId == obj.id;
            } 
        }

        if(this.group.users && this.group.users.length){
            var result = this.group.users.filter(checkValue);
            if(result.length){
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

        this.goToGroupList();   
    }

    goToGroupList(){
        this.router.navigateToRoute('group-list')
    }
}