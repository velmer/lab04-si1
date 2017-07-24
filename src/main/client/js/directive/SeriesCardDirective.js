(function () {
    'use strict';

    app.directive('seriesCard', function (UserService, SeriesService, OMDaAPIService, DialogService, ToastService) {
        function link(scope, element, attr) {

            scope.getSeriesPoster = function () {
                return scope.series.poster;
            };

            scope.isOnProfileSeries = function() {
                return UserService.isOnProfileSeries(scope.series.imdbId);
            };

            scope.isOnWatchlistSeries = function() {
                return UserService.isOnWatchlistSeries(scope.series.imdbId);
            };

            scope.addSeriesToProfile = function () {
                if (scope.isOnWatchlistSeries()) {
                    var message = 'Are you sure you want add ' + scope.series.title + ' to your profile? ' +
                        'It will be removed from your watchlist.';

                    DialogService.confirm(message).then(function () {
                        addSeriesToProfile();
                    });
                } else {
                    addSeriesToProfile();
                }
            };

            function addSeriesToProfile() {
                function addSeriesSuccessCallback(added) {
                    if (added) {
                        ToastService.showToast('Series successfully added to your profile!');
                    } else {
                        DialogService.error('Series not added, already belongs to your profile.');
                    }
                }

                function addSeriesErrorCallback() {
                    DialogService.error();
                }

                function saveSeriesCallback(series) {
                    UserService.addSeriesToProfile(scope.series)
                        .then(addSeriesSuccessCallback)
                        .catch(addSeriesErrorCallback);
                }

                SeriesService.save(scope.series).then(saveSeriesCallback);
            }

            scope.removeSeriesFromProfile = function () {
                function confirmedRemovalCallback() {
                    removeSeriesFromProfile();
                }

                var message = 'Are you sure you want remove ' + scope.series.title + ' from your profile?',
                    title = 'Remove series';

                return DialogService.confirm(message, title).then(confirmedRemovalCallback);
            };

            function removeSeriesFromProfile() {
                function removeSeriesSuccessCallback(removed) {
                    if (removed) {
                        ToastService.showToast('Series successfully removed from profile!');
                    } else {
                        DialogService.error('Series not removed, doesn\'t belongs to your profile');
                    }
                }

                function removeSeriesErrorCallback() {
                    DialogService.error();
                }

                UserService.removeSeriesFromProfile(scope.series.imdbId)
                    .then(removeSeriesSuccessCallback)
                    .catch(removeSeriesErrorCallback);
            }

            scope.addSeriesToWatchlist = function () {
                if (scope.isOnProfileSeries()) {
                    var message = 'Are you sure you want add ' + scope.series.title + ' to your watchlist? ' +
                        'It will be removed from your profile.';

                    DialogService.confirm(message).then(function () {
                        addSeriesToWatchlist();
                    });
                } else {
                    addSeriesToWatchlist();
                }
            };

            function addSeriesToWatchlist() {
                function addSeriesSuccessCallback(added) {
                    if (added) {
                        ToastService.showToast('Series successfully added to your watchlist!');
                    } else {
                        DialogService.error('Series not added, already belongs to your watchlist');
                    }
                }

                function addSeriesErrorCallback(response) {
                    DialogService.error();
                }

                function saveSeriesCallback(series) {
                    UserService.addSeriesToWatchlist(scope.series)
                        .then(addSeriesSuccessCallback)
                        .catch(addSeriesErrorCallback);
                }

                SeriesService.save(scope.series).then(saveSeriesCallback);
            }

            scope.showSeriesDetails = function(targetEvent) {
                function errorCallback() {
                    return DialogService.error();
                }

                if (!scope.series.isFullyLoaded()) {
                    OMDaAPIService.searchSingleSeries(scope.series.imdbId).then(function (response) {
                        scope.series = copyWithRatingInfo(scope.series, response.data);
                        showSeriesDialog(targetEvent);
                    }).catch(errorCallback);
                } else {
                    showSeriesDialog(targetEvent);
                }
            };

            function copyWithRatingInfo(series, seriesResponse) {
                seriesResponse.season = series.season;
                seriesResponse.lastEpisode = series.lastEpisode;
                seriesResponse.rating = series.rating;
                return seriesResponse;
            }

            function showSeriesDialog(targetEvent) {
                const dialogConfig = {
                    templateUrl : 'view/seriesDialog.html',
                    controller: 'SeriesDialogController',
                    controllerAs: 'SeriesDialogCtrl',
                    targetEvent: targetEvent,
                    locals: {
                        series: scope.series,
                        isProfileView: scope.isProfileView
                    },
                    clickOutsideToClose: true,
                    escapeToClose: true
                };

                return DialogService.custom(dialogConfig);
            }
        }

        return {
            templateUrl: './view/seriesCard.html',
            scope: {
                series: '=',
                isProfileView: '=?',
                isSearchResult: '=?'
            },
            link: link
        };
    });
})();
