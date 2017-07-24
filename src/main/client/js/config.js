const app = angular.module('lab04-si1', ['ui.router', 'ngMaterial', 'ngAria', 'ngMessages']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'view/login.html'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'view/homePage.html',
            controller: 'HomePageController as homePageCtrl'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'view/profile.html',
            controller: 'ProfileController as profileCtrl'
        })
        .state('watchlist', {
            url: '/watchlist',
            templateUrl: 'view/watchlist.html',
            controller: 'WatchlistController as watchlistCtrl'
        });

        $urlRouterProvider.otherwise('/login');
    }])
    .config(function($mdThemingProvider) {

        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .warnPalette('deep-orange', {default: '700'});
    });