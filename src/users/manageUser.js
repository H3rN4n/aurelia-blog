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
            console.log(this.groups);
        })
        

        if(routeConfig.name == "user-management"){
            this.userService.getUser(params.id).then((response)=>{
                this.user = response[0];
            })
        }

        return true;
    }

    delete(){
        console.log('delete');
    }

    post(){
        if(this.validationController.error && this.validationController.error.length > 0) return;
        
        if(this.routeName == "create-user"){
            this.userService.newUser(this.user).then((response) => {
                console.log('newUser');
               console.log(response);
                
            });
        } else {
            this.userService.updateUser(this.user).then((response) => {
               console.log('updateUser');
               console.log(response);
            });
        }

        this.groupService.updateUserInGroups(this.user).then((response) => {
            console.log('updateUserInGroups');
            console.log(response);
        });

        this.goToUserList();
        
    }

    goToUserList(){
        this.router.navigateToRoute('user-list')
    }


}