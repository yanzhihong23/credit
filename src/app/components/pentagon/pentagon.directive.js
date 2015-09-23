(function() {
  'use strict';

  angular
    .module('credit')
    .directive('pentagon', pentagon);

  /** @ngInject */
  function pentagon($log, userService) {
    var directive = {
      restrict: 'E',
      // replace: true,
      templateUrl: 'app/components/pentagon/pentagon.html',
      link: function(scope, element, attr) {
        $log.debug('pentagon');
        var canvas = document.getElementById('canvas');
        var cxt = canvas.getContext('2d');

        var w = canvas.width;
        var h = canvas.height = w;
        var ang = Math.PI*2/5;
        var l = w/4;

        var drawBase = function(op) {
          cxt.save();
          cxt.lineWidth = op.lineWidth ||　1;
          cxt.fillStyle = op.fillStyle;
          cxt.strokeStyle = op.strokeStyle;
          cxt.translate(op.center.x, op.center.y);
          
          // outline
          cxt.beginPath();
          cxt.moveTo(0, -l);
          for(var i=0; i<5; i++) {
            cxt.rotate(ang);
            cxt.lineTo(0, -l);
          }
          cxt.stroke();
          cxt.fill();
          cxt.closePath();
          
          // inline
          cxt.beginPath();
          for(var i=0; i<5; i++) {
            cxt.moveTo(0, 0);
            cxt.rotate(ang);
            cxt.lineTo(0, -l);
          }
          cxt.stroke();
          cxt.closePath();
          
          cxt.restore();
        };

        drawBase({
          center: {x: w/2, y: h/2},
          fillStyle: '#f0f5f5',
          strokeStyle: '#ccc'
        });

        var drawDesc = function(op) {
          cxt.save();
          cxt.translate(op.center.x, op.center.y);
          cxt.beginPath();
          cxt.textBaseline = 'middle';
          cxt.textAlign = 'center';
          cxt.fillStyle = '#4d4d4d';
          cxt.font = '14px microsoft yahei';

          cxt.fillText(op.descs[0], 0, -l*1.2);
          cxt.fillText(op.descs[1], l*1.3, -l*.3);
          cxt.fillText(op.descs[2], l*.6, l);
          cxt.fillText(op.descs[3], -l*.6, l);
          cxt.fillText(op.descs[4], -l*1.3, -l*.3);
          cxt.closePath();
          cxt.restore();
        };

        drawDesc({
          center: {x: w/2, y: h/2},
          descs: ['学校', '学历', '评分等级', '户籍', '地区']
        });


        var drawScore = function(op) {
          var score = 0;
          cxt.save();
          cxt.fillStyle = op.fillStyle ||　'#4fc0de';
          cxt.strokeStyle = op.strokeStyle || 'rgba(0,0,0,.1)';
          cxt.translate(op.center.x, op.center.y);
          for(var i=0; i<5; i++) {
            cxt.beginPath();
            cxt.moveTo(0, 0);
            cxt.lineTo(0, -op.scores[i]*l/100);
            cxt.moveTo(0, 0);
            cxt.rotate(ang);
            cxt.lineTo(0, -op.scores[i+1 === 5? 0 : i+1]*l/100);
            cxt.rotate(-ang);
            cxt.lineTo(0, -op.scores[i]*l/100);
            cxt.stroke();
            cxt.fill();
            cxt.closePath();
            // for next angle
            cxt.rotate(ang);
            // score += +[op.scores[i]];
          }
          // cxt.textBaseline = 'middle';
          // cxt.textAlign = 'center';
          // cxt.fillStyle = '#fff';
          // cxt.font = '28px cursive';
          // cxt.fillText(score, 0, 0);
          // cxt.restore();
        };

        var randomScore = function() {
          return 70 + Math.floor(Math.random()*20);
        };

        var user = userService.getUser();
        if(user) {
          if(!user.scores) {
            user.scores = [];
            for(var i=0; i<5; i++) {
              user.scores.push(randomScore());
            }
            userService.setUser(user);
          }

          drawScore({
            center: {x: w/2, y: h/2},
            scores: user.scores
          });
        }
      }
    };

    return directive;
  }

})();
