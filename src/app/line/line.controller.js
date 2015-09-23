(function() {
  'use strict';

  angular
    .module('credit')
    .controller('LineController', LineController);

  /** @ngInject */
  function LineController($scope, $state, $stateParams, $ionicLoading, $ionicModal, $location, $ionicActionSheet, $log, OPENID, utils, userService, NonoWebApi, localStorageService) {
    $scope.user = userService.getUser();

    $scope.download = 'https://m.nonobank.com/mxdsite/outpage/downapp/downmxd.html';
  }
})();
