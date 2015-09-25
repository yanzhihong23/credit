(function() {
  'use strict';

  angular
    .module('credit')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider, $provide, $sceDelegateProvider, localStorageServiceProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Enable cors
    // $httpProvider.defaults.useXDomain = true;
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $httpProvider.interceptors.push(function($rootScope, $q, $log) {
      return {
        request: function(config) {
          return config;
        },
        response: function(response) {
          $rootScope.$broadcast('loading:hide');
          return response;
        },
        responseError: function(rejection) {
          // do something on error
          if(rejection.status === 404) {
            $rootScope.$broadcast('loading:hide');
            $log.error('404 error');
          }
          return $q.reject(rejection);
         }
      }
    });

    $provide.decorator('$locale', ['$delegate', function($delegate) {
      if($delegate.id == 'en-us') {
        $delegate.NUMBER_FORMATS.PATTERNS[1].negPre = '-\u00A4';
        $delegate.NUMBER_FORMATS.PATTERNS[1].negSuf = '';
      }
      return $delegate;
    }]);

    localStorageServiceProvider.setPrefix('credit');


    $sceDelegateProvider.resourceUrlWhitelist(['**']);
  }

})();
