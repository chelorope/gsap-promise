module.exports = function(Tweens, Promise) {
  !Tweens && console.error('Tween library missing as first argument!');
  !Promise && console.error('Promise library missing as second argument!');
  require('./base')(Tweens, Promise);
};
