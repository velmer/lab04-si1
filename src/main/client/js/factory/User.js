(function () {
    'use strict';

    app.factory('User', function (SeriesService, $http, $q) {

        const BASE_URI_ENDPOINT = 'http://localhost:8080/users',
              PROFILE_SERIES_ENDPOINT = BASE_URI_ENDPOINT + '/profile',
              WATCHLIST_SERIES_ENDPOINT = BASE_URI_ENDPOINT + '/watchlist',
              ADD_ENDPOINT = '/add',
              DELETE_ENDPOINT = '/delete',
              SLASH_BAR = '/';

        const ADD_PROFILE_SERIES_ENDPOINT = PROFILE_SERIES_ENDPOINT + ADD_ENDPOINT,
              DELETE_PROFILE_SERIES_ENDPOINT = PROFILE_SERIES_ENDPOINT + DELETE_ENDPOINT,
              ADD_WATCHLIST_SERIES_ENDPOINT = WATCHLIST_SERIES_ENDPOINT + ADD_ENDPOINT,
              DELETE_WATCHLIST_SERIES_ENDPOINT = WATCHLIST_SERIES_ENDPOINT + DELETE_ENDPOINT;

        const User = function (data) {
            if (!!data) {
                this.id = data.id;
                this.name = data.name;
                this.email = data.email;
            }
            this.profileSeries = [];
            this.watchlistSeries = [];
        };

        User.prototype.loadSeries = function () {
            const self = this;

            function loadProfileSeries(callback) {
                const uri = PROFILE_SERIES_ENDPOINT,
                    params = {
                        'email': self.email
                    };

                const promise = $http({
                    method: 'GET',
                    url: uri,
                    params: params
                });

                return promise.then(function (response) {
                    self.profileSeries = SeriesService.createSeriesList(response.data || self.profileSeries);
                    return callback();
                });
            }

            function loadWatchlistSeries() {
                const uri = WATCHLIST_SERIES_ENDPOINT,
                    params = {
                        'email': self.email
                    };

                const promise = $http({
                    method: 'GET',
                    url: uri,
                    params: params
                });

                return promise.then(function (response) {
                    self.watchlistSeries = SeriesService.createSeriesList(response.data || self.watchlistSeries);
                    return $q.when({});
                });
            }

            return loadProfileSeries(loadWatchlistSeries);
        };

        User.prototype.getProfileSeries = function () {
            return this.profileSeries;
        };

        User.prototype.getWatchlistSeries = function () {
            return this.watchlistSeries;
        };

        User.prototype.isOnProfileSeries = function (imdbId) {
            return containsSeries(this.profileSeries, imdbId);
        };

        User.prototype.addSeriesToProfile = function (series) {
            const self = this;

            const uri = ADD_PROFILE_SERIES_ENDPOINT + SLASH_BAR + series.imdbId,
                params = {
                    'email': self.email
                };

            const promise = $http({
                method: 'PUT',
                url: uri,
                params: params
            });

            const successCallback = function () {
                if (self.isOnWatchlistSeries(series.imdbId)) {
                    removeSeries(self.watchlistSeries, series.imdbId)
                }

                return addSeries(self.profileSeries, series);
            };

            return promise.then(function (response) {
                if (response.status === 200 && !!response.data) {
                    return successCallback();
                } else {
                    return false;
                }
            });
        };

        User.prototype.isOnWatchlistSeries = function (imdbId) {
            return containsSeries(this.watchlistSeries, imdbId);
        };

        User.prototype.addSeriesToWatchlist = function (series) {
            const self = this;

            const uri = ADD_WATCHLIST_SERIES_ENDPOINT + SLASH_BAR + series.imdbId,
                params = {
                    'email': self.email
                };

            const promise = $http({
                method: 'PUT',
                url: uri,
                params: params
            });

            const successCallback = function () {
                if (self.isOnProfileSeries(series.imdbId)) {
                    removeSeries(self.profileSeries, series.imdbId)
                }

                return addSeries(self.watchlistSeries, series);
            };

            return promise.then(function (response) {
                if (response.status === 200 && !!response.data) {
                    return successCallback();
                } else {
                    return false;
                }
            });
        };

        function addSeries(list, series) {
            if (containsSeries(list, series.imdbId))
                return false;

            list.push(series);
            return true;
        }

        User.prototype.removeSeriesFromProfile = function (imdbId) {
            const self = this;

            const uri = DELETE_PROFILE_SERIES_ENDPOINT + SLASH_BAR + imdbId,
                params = {
                    'email': self.email
                };

            const promise = $http({
                method: 'PUT',
                url: uri,
                params: params
            });

            return promise.then(function (response) {
                if (response.status === 200) {
                    return removeSeries(self.profileSeries, imdbId);
                } else {
                    return false;
                }
            });
        };

        User.prototype.removeSeriesFromWatchlist = function (imdbId) {
            const self = this;

            const uri = DELETE_WATCHLIST_SERIES_ENDPOINT + SLASH_BAR + imdbId,
                params = {
                    'email': self.email
                };

            const promise = $http({
                method: 'PUT',
                url: uri,
                params: params
            });

            return promise.then(function (response) {
                if (response.status === 200) {
                    return removeSeries(self.watchlistSeries, imdbId);
                } else {
                    return false;
                }
            });
        };

        function removeSeries(list, imdbId) {
            var index = indexOf(list, imdbId);
            if (!isIndexValid(list, index)) return false;
            list.splice(index, 1);
            return true;
        }

        function isIndexValid(list, index) {
            return index >= 0 && index < list.length;
        }

        function containsSeries(list, id) {
            return indexOf(list, id) !== -1;
        }

        function indexOf(list, id) {
            var i = 0;
            while (i < list.length) {
                if (list[i].imdbId === id) return i;
                i++;
            }
            return -1;
        }

        User.prototype.constructor = User;

        return User;
    });
})();