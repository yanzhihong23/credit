(function() {
  'use strict';

  angular
    .module('credit')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/?openId',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('line', {
        url: '/line',
        templateUrl: 'app/line/line.html',
        controller: 'LineController'
      })
      .state('line:auth', {
        url: '/lineAuth',
        templateUrl: 'app/line/line.auth.html',
        controller: 'LineController'
      })
      .state('student', {
        url: '/student',
        templateUrl: 'app/student/student.html',
        controller: 'StudentAuthController'
      })

    $urlRouterProvider.otherwise('/');
  }

})();
