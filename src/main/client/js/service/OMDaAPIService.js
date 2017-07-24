(function () {
    'use strict';

    app.service('OMDaAPIService', function (Series, $http) {
        const API_BASE_URL = "http://www.omdbapi.com/?apikey=93330d3c&type=series";
        const ID_PARAM = "&i=";
        const TITLE_PARAM = "&s=";

        this.searchSeriesList = function (name) {
            var searchUrl = API_BASE_URL + TITLE_PARAM + name;
            return $http.get(searchUrl).then(function (response) {
                const result = {};
                result.data = createSeriesList(response.data.Search);
                return result;
            });
        };

        function createSeriesList(seriesList) {
            const result = [];

            if (seriesList && seriesList.length > 0) {
                seriesList.forEach(function(elem) {
                    const serie = new Series(elem);
                    result.push(serie);
                });
            }

            return result;
        }

        this.searchSingleSeries = function (imdbId) {
            var searchUrl = API_BASE_URL + ID_PARAM + imdbId;
            return $http.get(searchUrl).then(function (response) {
                const result = {};
                result.data = new Series(response.data);
                return result;
            });
        };
    });
})();
