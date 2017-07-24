(function () {
    'use strict';

    app.service('ToastService', function ($mdToast) {
        const self = this;

        this.showToast = function (text) {
            const toast = $mdToast.simple()
                .textContent(text);
            return $mdToast.show(toast);
        }

    });
})();