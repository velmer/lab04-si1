(function () {
    'use strict';

    app.service('DialogService', function ($mdDialog) {
        const self = this;

        this.error = function (message, title) {
            const errorDialog = $mdDialog.alert({
                title: title || "Error",
                textContent: message || 'An internal error ocurred, please, try again.',
                clickOutsideToClose: false,
                escapeToClose: false,
                ok: 'Close'
            });

            return $mdDialog.show(errorDialog);
        };

        this.confirm = function (message, title, confirm, cancel) {
            const confirmDialog = $mdDialog.confirm({
                title: title || 'Are you sure?',
                textContent: message,
                clickOutsideToClose: true,
                ok: confirm || 'Confirm',
                cancel: cancel || 'Cancel'
            });

            return $mdDialog.show(confirmDialog);
        };

        this.custom = function (data) {

            return $mdDialog.show({
                templateUrl: data.templateUrl,
                controller: data.controller,
                controllerAs: data.controllerAs,
                targetEvent: data.targetEvent,
                locals: data.locals || {},
                clickOutsideToClose: data.clickOutsideToClose,
                escapeToClose: data.escapeToClose,
                attachTo: data.attachTo || angular.element(document.body),
                parent: data.parent || angular.element(document.body)
            });
        };
    });
})();