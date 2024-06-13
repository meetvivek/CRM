define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router'
], function (ng, couchPotato) {

    "use strict";

    var dashboardModule = ng.module('dashboardModule', []);

    couchPotato.configureApp(dashboardModule);

    dashboardModule.config(function ($stateProvider, $couchPotatoProvider, $urlRouterProvider) {

        $stateProvider
            /**
             * Main state of the app
             * This state is abstract, only the child states are used
             */
            .state('app', {
                abstract: true,
                views: {
                    root: {
                        templateUrl: 'components/dashboard/dashboardView.html',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'components/dashboard/employees/employeesListController',
                                'components/dashboard/users/usersListController',
                                'components/dashboard/employee/employeeNewController',
                                'components/dashboard/employee/employeeEditController',
                                'components/dashboard/user/userNewController',
                                'components/dashboard/user/userEditController',
                                'components/login/loginInfoDirective'
                            ])
                        }
                    }
                }
            });


        $urlRouterProvider.otherwise('/login');

    });

    dashboardModule.run(function ($couchPotato) {
        dashboardModule.lazy = $couchPotato;
    });

    return dashboardModule;
});
