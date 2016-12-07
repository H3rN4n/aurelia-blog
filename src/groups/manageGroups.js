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
        this.group = {'title':'', 'users': [], 'description': ''}
    }

    activate(params, routeConfig, $navigationInstruction) {
        this.routeName = routeConfig.name; 
        
        this.userService.getUsers().then((response)=>{
            this.users = response;
            console.log(this.users);
        })
        

        if(routeConfig.name == "group-management"){
            this.groupService.getGroup(params.id).then((response)=>{
                this.group = response[0];
            })
        }

        return true;
    }

    delete(){
        console.log('delete');
    }

    post(){
        if(this.validationController.error && this.validationController.error.length > 0) return;
        
        if(this.routeName == "create-group"){
            this.groupService.newGroup(this.group).then((response) => {
                console.log('newGroup');
               console.log(response);
                
            });
        } else {
            this.groupService.updateGroup(this.user).then((response) => {
               console.log('updateGroup');
               console.log(response);
            });
        }

        this.userService.updateGroupInUsers(this.user).then((response) => {
            console.log('updateGroupInUsers');
            console.log(response);
        });

        this.goToGroupList();
        
    }

    goToGroupList(){
        this.router.navigateToRoute('group-list')
    }


}