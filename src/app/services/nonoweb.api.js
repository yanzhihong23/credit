(function() {
  'use strict';

  angular
    .module('credit')
    .service('NonoWebApi', NonoWebApi);

  /** @ngInject */
  function NonoWebApi($http, md5, utils, APISERVER, OPENID, MERCHANT, PRODUCTID, $log) {
  	var v = 'm.nonobank.com/msapi/' + moment().format('YYYY-MM-DD HH') + Math.floor(moment().minute()/5),
  			vMd5 = md5.createHash(v),
  			headers = {'Authorization': vMd5,'Content-Type': 'application/x-www-form-urlencoded'};

		this.isRegister = function(obj) {
			return $http({
  			method: 'POST',
  			url: APISERVER.NONOWEB + '/creditAuth/isRegister',
  			headers: headers,
  			data: utils.param({
  				request: JSON.stringify({
  					mobile: obj.phone
  				})
  			})
  		});
		};

    this.sendSms = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER.NONOWEB + '/commLoanApply/getSmsCode',
        headers: headers,
        data: utils.param({
          // request: JSON.stringify({
            openId: OPENID,
            merchant: MERCHANT,
            mobile: obj.phone,
            msgKey: md5.createHash(MERCHANT + OPENID)
          // })
        })
      });
    };

    this.getSchoolList = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER.NONOWEB + '/creditAccount/getSchoolList',
        headers: headers,
        data: utils.param({
          request: "{}"
        })
      });
    };

    this.creditApply = function(obj) {
      return $http({
        method: 'POST',
        url: APISERVER.NONOWEB + '/commLoanApply/creditApply',
        headers: headers,
        data: utils.param({
          // request: JSON.stringify({
            openId: OPENID,
            merchant: MERCHANT,
            realName: obj.realname,
            idNum: obj.idNo,
            academy: obj.school,
            education: obj.degree,
            eduStartYear: obj.year,
            mobile: obj.phone,
            validation: obj.vcode,
            sessionId: obj.sessionId,
            approach: obj.approach,
            msgKey: md5.createHash(MERCHANT + OPENID + obj.phone + obj.idNo)
          // })
        })
      });
    };

  }
})();
