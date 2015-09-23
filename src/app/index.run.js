(function() {
  'use strict';

  angular
    .module('credit')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $state, $rootScope, $ionicLoading, userService) {
    $rootScope.$on('loading:hide', function() {
      $ionicLoading.hide();
    });

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      $log.debug(fromState.name + '-->' + toState.name);
    });

    $log.debug('run');
  }

})();
