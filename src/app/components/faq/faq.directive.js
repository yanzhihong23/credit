(function() {
  'use strict';

  angular
    .module('credit')
    .directive('faq', faq);

  /** @ngInject */
  function faq($ionicModal) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/faq/faq.icon.html',
      link: function(scope, element, attr) {
        $ionicModal.fromTemplateUrl('app/components/faq/faq.html', {
          scope: scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          scope.modal = modal;
        });

        scope.show = function() {
          scope.modal.show();
        };

        scope.hide = function() {
          scope.modal.hide();
        }
      }
    };

    return directive;
  }

})();
