(function() {
  'use strict';

  angular
    .module('credit')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $state, $stateParams, $ionicLoading, $location, $ionicActionSheet, $log, OPENID, utils, userService, NonoWebApi, localStorageService) {
    $scope.user = {};

    var initSchoolList = function() {
      $scope.schoolList = localStorageService.get('schoolList') || [];
      if(!$scope.schoolList.length) {
        NonoWebApi.getSchoolList().success(function(data) {
          if(+data.result === 1) {
            data.list.map(function(obj) {
              $scope.schoolList.push(obj.name);
            });

            localStorageService.add('schoolList', $scope.schoolList);
            $log.debug($scope.schoolList);
          }
        });
      }
    };

    initSchoolList();

    $scope.selectDegree = function() {
      var buttons = [
        { text: '专科' },
        { text: '本科' },
        { text: '硕士研究生' },
        { text: '博士研究生' }
      ]
      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: buttons,
        // destructiveText: 'Delete',
        titleText: '选择学历',
        cancelText: '取消',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          $scope.user.degree = buttons[index].text;
          return true;
        }
      });
    };

    $scope.submit = function() {
      userService.setUser($scope.user);
      $state.go('line');
    };

    // init
    var user = userService.getUser();
    if(!user) {
      $state.go('home');
    } else if(user.line){
      $state.go('line:auth');
    } else {
      $state.go('line');
    }
  }
})();
