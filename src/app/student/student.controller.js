(function() {
  'use strict';

  angular
    .module('credit')
    .controller('StudentAuthController', StudentAuthController);

  /** @ngInject */
  function StudentAuthController($scope, $state, $ionicActionSheet, $ionicPopup, $ionicLoading, $filter, $log, NonoWebApi, localStorageService, userService, utils) {
  	$scope.user = userService.getUser() || {};
    var resendCountdown = utils.resendCountdown($scope);

    var initSchoolList = function() {
      $scope.schoolList = localStorageService.get('schoolList') || [];
      if(!$scope.schoolList.length) {
        NonoWebApi.getSchoolList().success(function(data) {
          if(+data.result === 1) {
            data.list.map(function(obj) {
              $scope.schoolList.push(obj.name || obj);
            });

            localStorageService.add('schoolList', $scope.schoolList);
            $log.debug($scope.schoolList);
          }
        });
      }
    };

    initSchoolList();

    // check whether school in valid
    $scope.$watch('user.school', function(val, old) {
      if(val === old) return;

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

    $scope.selectYear = function() {
    	var buttons = [
    		{ text: '2015' },
    		{ text: '2014' },
    		{ text: '2013' },
    		{ text: '2012' },
    		{ text: '2011' },
    		{ text: '2010' },
    		{ text: '2009' }
    	];
    	// Show the action sheet
			var hideSheet = $ionicActionSheet.show({
			 	buttons: buttons,
				// destructiveText: 'Delete',
				titleText: '选择入学年份',
				cancelText: '取消',
				cancel: function() {
			    // add cancel code..
			  },
				buttonClicked: function(index) {
					$scope.user.year = buttons[index].text;
					return true;
				}
			});
    };

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

    $scope.sendVcode = function() {
      $ionicLoading.show();
      NonoWebApi.sendSms({phone: $scope.user.phone})
        .success(function(data) {
          if(+data.result === 1) {
            $scope.user.sessionId = data.map.sessionId;
            resendCountdown();
          } else {
            utils.alert({content: data.message});
          }
        })
    };

    $scope.submit = function() {
      if(!$scope.user.validSchool) {
        utils.alert({
          content: '学校名称不存在，请再次确认~'
        });
        return;
      }

    	$ionicLoading.show();

    	NonoWebApi.creditApply($scope.user)
    		.success(function(data) {
    			if(+data.result === 1) {
            // save user credit info
            var line = data.map.credit_line;
            $scope.user.line = line;
            userService.setUser($scope.user);

            $state.go('line:auth');
    			} else {
            utils.alert({content: data.message});
    			}
    		});
    };
  }
})();
