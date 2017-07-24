(function () {
    'use strict';

    app.service('SeriesService', function (Series, OMDaAPIService) {
        const self = this;

        this.save = function (series) {
            if (!series.isFullyLoaded()) {
                return OMDaAPIService.searchSingleSeries(series.imdbId).then(function (response) {
                    angular.extend(series, response.data);
                    return series.save();
                });
            } else {
                return series.save();
            }
        };

        this.update = function (series) {
            return series.update();
        };

        this.isFullyLoaded = function (series) {
            return series.isFullyLoaded();
        };

        this.createSeriesList = function(seriesList) {
            const result = [];

            if (seriesList && seriesList.length > 0) {
                seriesList.forEach(function(elem) {
                    const serie = new Series(elem);
                    result.push(serie);
                });
            }

            return result;
        }

    });
})();