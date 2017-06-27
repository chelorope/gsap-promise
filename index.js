var GlobalTweens = null;
var GlobalPromises = null;
module.exports = !GlobalTweens && !GlobalPromises
  ? function(Tweens, Promises) {
    console.log('NoExisten', Tweens, Promises);
    if (Tweens && Promises) {
      GlobalTweens = Tweens;
      GlobalPromises = Promises;
    } else {
      !Tweens && console.error('Tween library missing as first argument!');
      !Promise && console.error('Promise library missing as second argument!');
      return;
    }
    return require('./base')(GlobalTweens, GlobalPromises);
  }
  : function(Tweens, Promises) {
    console.log('Existen');
    require('./base')(GlobalTweens, GlobalPromises);
  };
