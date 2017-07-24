(function () {
    'use strict';

    app.controller('SeriesDialogController', function (series, isProfileView, SeriesService, DialogService) {
        const self = this,
              NOT_AVAILABLE = 'N/A';

        this.originalSeries = series;
        this.originalSeries.setInvalidFields();
        this.editableSeries = angular.copy(this.originalSeries);

        this.isProfileView = isProfileView;
        this.isEdition = false;

        this.save = function () {
            SeriesService.update(self.editableSeries).then(function (response) {
                if (response.data) {
                    angular.copy(response.data, self.originalSeries);
                    self.discardChanges();
                } else {
                    DialogService.error('Something really strange happened. Series don\'t updated. ' +
                        'Try again later!');
                }
            });
        };

        this.discardChanges = function() {
            angular.copy(self.originalSeries, self.editableSeries);
            self.isEdition = false;
        };

        this.toggleEdit = function () {
            self.isEdition = true;
        };

        this.getSeriesTitle = function () {
            return self.originalSeries.title;
        };

        this.getSeriesYear = function () {
            return '(' + self.originalSeries.year + ')';
        };

        this.getSeriesSeason = function () {
            return self.originalSeries.season === -1 ? undefined : self.originalSeries.season;
        };

        this.getSeriesLastEpisode = function () {
            return self.originalSeries.lastEpisode === -1 ? undefined : self.originalSeries.lastEpisode;
        };

        this.getSeriesRating = function () {
            return self.originalSeries.rating === -1 ? undefined : self.originalSeries.rating;
        };

        this.hasAttr = function (attr) {
            return self.originalSeries[attr] && self.originalSeries[attr] !== NOT_AVAILABLE;
        };
    });
})();