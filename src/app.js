export class App {
  configureRouter(config, router) {
    config.title = 'H3rN4n89';
    config.map([{
        route: ['', 'blog'],
        name: 'blog',
        moduleId: './blog/blog',
        nav: true,
        title: 'Blog'
      }, {
        route: 'login',
        name: 'login',
        moduleId: './login',
        title: 'Login'
      },
      {
        route: 'new-article',
        name: 'new-article',
        moduleId: './blog/createArticle',
        title: 'New Article'
      }, {
        route: 'update-article/:id',
        name: 'update-article',
        moduleId: './blog/createArticle',
        title: 'Update Article'
      }, {
        route: 'view-article/:id',
        name: 'view-article',
        moduleId: './blog/viewArticle',
        title: 'View Article'
      }, {
        route: 'users',
        name: 'user-list',
        nav: true,
        moduleId: './users/userList',
        title: 'Users',
        'auth': true,
        'role': 'admin'
      }, {
        route: 'users/create',
        name: 'create-user',
        moduleId: './users/manageUser',
        title: 'Create User',
        'auth': true,
        'role': 'admin'
      }, {
        route: 'users/:id',
        name: 'user-management',
        moduleId: './users/manageUser',
        title: 'User Management',
        'auth': true,
        'role': 'admin'
      }, {
        route: 'groups',
        name: 'group-list',
        moduleId: './groups/groupList',
        nav: true,
        title: 'Groups',
        'auth': true,
        'role': 'admin'
      }, {
        route: 'groups/create',
        name: 'create-group',
        moduleId: './groups/manageGroups',
        title: 'Create Group',
        'auth': true,
        'role': 'admin'
      }, {
        route: 'groups/:id',
        name: 'group-management',
        moduleId: './groups/manageGroups',
        title: 'Group Management',
        'auth': true,
        'role': 'admin'
      },
      //{ route: 'users',         name: 'users',        moduleId: './users',        nav: true, title: 'Github Users' },
      //{ route: 'blog',          name: 'blog',         moduleId: './blog/blog',         nav: true, title: 'Blog' },
      //{ route: 'child-router',  name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
    console.log(this.router.currentInstruction);
  }
}
