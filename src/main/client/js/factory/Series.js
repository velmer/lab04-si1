(function () {
    'use strict';

    app.factory('Series', function ($http) {

        const BASE_URI = '/series',
              SLASH_BAR = '/',
              NOT_AVAILABLE = 'N/A',
              DEFAULT_POSTER = 'img/no-poster-available.jpg',
              DEFAULT_NUMBER = -1;

        function Series(data) {
            this.imdbId = data.imdbID || data.imdbId;
            this.title = data.Title || data.title;
            this.year = data.Year || data.year;
            this.rated = data.Rated || data.rated;
            this.genre = data.Genre || data.genre;
            this.director = data.Director || data.director;
            this.writer = data.Writer || data.writer;
            this.actors = data.Actors || data.actors;
            this.plot = data.Plot || data.plot;
            this.language = data.Language || data.language;
            this.poster = data.Poster || data.poster;
            this.imdbRating = data.imdbRating || data.imdbRating;
            this.season = data.season || DEFAULT_NUMBER;
            this.lastEpisode = data.lastEpisode || DEFAULT_NUMBER;
            this.rating = data.rating || DEFAULT_NUMBER;

            if (this.poster === NOT_AVAILABLE)
                this.poster = DEFAULT_POSTER;
        }

        Series.prototype.save = function () {
            return $http.post(BASE_URI, this).then(function (response) {
                return response.data;
            });
        };

        Series.prototype.update = function () {
            const self = this;

            return $http.put(BASE_URI + SLASH_BAR + this.imdbId, this).then(function (response) {
                if (response.status === 200) {
                    const result = {};
                    angular.extend(self, response.data);
                    result.data = self;
                    return result;
                }
                return response;
            });
        };

        /**
         * Returns if a series is fully loaded, in other words, if has all fields
         * are filled.
         *
         * @return {boolean} {@code true} if the writer - field that is only filled
         * when the series is fully loaded - is filled, {@code false} otherwise.
         */
        Series.prototype.isFullyLoaded = function () {
            return !!this.writer;
        };

        Series.prototype.setInvalidFields = function () {
            if (this.season === DEFAULT_NUMBER) { this.season = undefined }
            if (this.lastEpisode === DEFAULT_NUMBER) { this.lastEpisode = undefined }
            if (this.rating === DEFAULT_NUMBER) { this.rating = undefined }
        };

        Series.prototype.constructor = Series;

        return Series;
    });
})();