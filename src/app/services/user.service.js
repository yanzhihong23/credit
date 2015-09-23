(function() {
  'use strict';

  angular
    .module('credit')
    .service('userService', userService);

    /** @ngInject */
    function userService(localStorageService, MSApi, OPENID, $timeout, $log) {
      var self = this, USER = 'user_' + OPENID;

      this.setUser = function(user) {
        localStorageService.add(USER, user);
      };

      this.getUser = function() {
        return localStorageService.get(USER);
      };

      this.setSessionId = function(sessionId) {
        localStorageService.add('sessionId', sessionId);
      };

      this.getSessionId = function() {
        return localStorageService.get('sessionId');
      };
    }
})();