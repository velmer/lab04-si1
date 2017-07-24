(function () {
    'use strict';

    app.controller('AccessDialogController', function (User, UserService, ToastService, DialogService, $mdDialog, $state, isLogin) {
        const self = this;
        const OK = 200, CREATED = 201, NOT_FOUND = 404;

        this.user = new User();
        this.isLogin = isLogin;

        this.access = function () {
            if (isLogin) {
                login();
            } else {
                signUp();
            }
        };

        function login() {
            function errorCallback(message) {
                $mdDialog.show({ multiple: true });

                DialogService.error(message || 'Something really strange happened, the login failed, try again later.');
            }

            UserService.login(self.user).then(function (response) {
                if (!response.data) {
                    const message = getErrorMessage(response);
                    errorCallback(message);
                } else {
                    ToastService.showToast('Welcome, ' + response.data.name + '!');
                    $state.go('home');
                    closeDialog();
                }
            }).catch(function () {
                errorCallback();
            });
        }

        function signUp() {
            function errorCallback(message) {
                $mdDialog.show({ multiple: true });

                DialogService.error(message || 'Something really strange happened, the sign up failed, try again later.');
            }

            UserService.signUp(self.user).then(function (response) {
                if (response.status === CREATED) {
                    ToastService.showToast('User registered successfully!');
                    closeDialog();
                } else {
                    errorCallback('Email is already being used!')
                }
            }).catch(function () {
                errorCallback();
            });
        }

        this.cancel = function () {
            closeDialog();
        };

        function closeDialog() {
            $mdDialog.hide();
        }

        function getErrorMessage(response) {
            const USER_NOT_REGISTERED = 'Account not found! Have you tried sign up first?',
                  WRONG_PASSWORD = 'You entered a wrong password!';

            var message;

            if (response.status === NOT_FOUND) {
                message = USER_NOT_REGISTERED;
            } else if (response.status === OK) {
                message = WRONG_PASSWORD;
            }

            return message;
        }
    });

})();