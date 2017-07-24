(function () {
    'use strict';

    app.controller('HomePageController', function (OMDaAPIService, UserService, DialogService) {
        const self = this;
        this.seriesList = [];
        this.isSearchResult = false;

        this.getSeriesList = function() {
            if (self.seriesList.length > 0) {
                return self.seriesList;
            }

            return UserService.getProfileSeries();
        };

        this.search = function (seriesTitle) {
            function successCallback(response) {
                if (response.data) {
                    self.seriesList = response.data;
                    self.isSearchResult = true;
                } else {
                    var message = 'Your search for \'' + seriesTitle + '\' did not have any matches.',
                        title = 'Alert';
                    return DialogService.error(message, title);
                }
            }

            function errorCallback(error) {
                return DialogService.error();
            }

            OMDaAPIService.searchSeriesList(seriesTitle).then(successCallback).catch(errorCallback);
        };

    });
})();
