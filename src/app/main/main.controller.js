(function() {
  'use strict';

  angular
    .module('credit')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $state, $ionicLoading, $ionicActionSheet, $filter, $log, OPENID, utils, userService, localStorageService) {
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
      if(!$scope.user.validSchool) {
        utils.alert({
          content: '学校名称不存在，请再次确认~'
        });
        return;
      }

      userService.setUser($scope.user);
      $state.go('line');
    };

    // check whether school in valid
    $scope.$watch('user.school', function(val) {
      $scope.user.validSchool = false;

      if(val) {
        $filter('filter')($scope.schoolList, val).forEach(function(str) {
          if(str === val) {
            $scope.user.validSchool = true;
            return;
          }
        })
      }
    }, true);

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
