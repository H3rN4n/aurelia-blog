import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { GroupService } from './../services/groupService';

@inject(Router, GroupService)

export class GroupList{
    constructor(router, groupService){
        this.router = router;
        this.groupService = groupService;
    }

    activate(params, routeConfig, $navigationInstruction) {
        this.groupService.getGroups().then((response) => {
            this.groups = response;
         });
        return true;
    }

}