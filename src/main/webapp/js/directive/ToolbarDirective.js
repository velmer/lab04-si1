(function () {
    'use strict';

    app.directive('toolbar', function ($state, UserService, DialogService) {
        function link(scope, element, attr) {

            scope.isUserLogged = function () {
                return UserService.isUserLogged();
            };

            scope.logout = function() {
                UserService.logout();
                $state.go('login');
            };

            scope.showLoginDialog = function () {
                const isLogin = true;
                return showAccessDialog(isLogin);
            };

            scope.showSignUpDialog = function () {
                const isLogin = false;
                return showAccessDialog(isLogin);
            };

            function showAccessDialog(isLogin) {
                const dialogConfig = {
                    templateUrl: 'view/accessDialog.html',
                    controller: 'AccessDialogController',
                    controllerAs: 'AccessDialogCtrl',
                    locals: {
                        isLogin: isLogin
                    },
                    clickOutsideToClose: false,
                    escapeToClose: false
                };

                return DialogService.custom(dialogConfig);
            }
        }

        return {
            restrict: 'E',
            templateUrl: './view/toolbar.html',
            link: link
        };
    });

})();