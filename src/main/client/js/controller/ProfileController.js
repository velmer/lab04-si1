(function () {
    'use strict';

    app.controller('ProfileController', function (UserService) {
        const self = this;

        this.getProfileSeries = function () {
            return UserService.getProfileSeries();
        };

        this.hasSeries = function () {
            return self.getProfileSeries().length > 0;
        }
    });
})();
