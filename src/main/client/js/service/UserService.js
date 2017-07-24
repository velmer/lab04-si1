(function () {
    'use strict';

    app.service('UserService', function (User, $http) {
        const self = this;

        const BASE_URI_ENDPOINT = 'http://localhost:8080/users',
              LOGIN_ENDPOINT = BASE_URI_ENDPOINT + '/login',
              SIGNU_UP_ENDPOINT = BASE_URI_ENDPOINT + '/register';

        var loggedUser;

        this.login = function(user) {
            return $http.post(LOGIN_ENDPOINT, user).then(function (response) {
                if (!response.data) {
                    return response;
                }

                loggedUser = new User(response.data);
                saveUserOnCache();

                return loggedUser.loadSeries().then(function () {
                    const result = {};
                    result.data = loggedUser;
                    return result;
                });
            }).catch(function (response) {
                return response;
            });
        };

        this.isUserLogged = function () {
            return angular.isDefined(loggedUser);
        };

        this.signUp = function(user) {
            return $http.post(SIGNU_UP_ENDPOINT, user).then(function (response) {
                return response;
            }).catch(function (error) {
                return error;
            });
        };

        this.logout = function() {
            loggedUser = undefined;
            removeUserFromCache();
        };

        function removeUserFromCache() {
            localStorage.removeItem('loggedUser');
        }

        function saveUserOnCache() {
            localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        }

        function getUserFromCache() {
            const userStr = localStorage.getItem('loggedUser');

            return userStr ? JSON.parse(userStr) : undefined;
        }

        this.getProfileSeries = function () {
            return loggedUser.getProfileSeries();
        };

        this.getWatchlistSeries = function () {
            return loggedUser.getWatchlistSeries();
        };

        this.isOnProfileSeries = function (imdbId) {
            return loggedUser.isOnProfileSeries(imdbId);
        };

        this.addSeriesToProfile = function (series) {
            return loggedUser.addSeriesToProfile(series);
        };

        this.removeSeriesFromProfile = function (imdbId) {
            return loggedUser.removeSeriesFromProfile(imdbId);
        };

        this.isOnWatchlistSeries = function (imdbId) {
            return loggedUser.isOnWatchlistSeries(imdbId);
        };

        this.addSeriesToWatchlist = function (series) {
            return loggedUser.addSeriesToWatchlist(series);
        };

        (function() {
            const cacheUser = getUserFromCache();
            if (cacheUser) {
                loggedUser = new User(cacheUser);
                loggedUser.loadSeries();
            }
        })();

    });
})();