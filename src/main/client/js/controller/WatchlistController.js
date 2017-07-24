(function () {
    'use strict';

    app.controller('WatchlistController', function (UserService) {
        const self = this;

        this.getWatchlistSeries = function () {
            return UserService.getWatchlistSeries();
        };

        this.hasSeries = function () {
            return self.getWatchlistSeries().length > 0;
        }
    });
})();

