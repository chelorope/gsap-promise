var assign = require('object-assign');

module.exports = function(Tweens, Promise) {
  Promise.config &&
    Promise.config({
      cancellation: true
    });

  function animateFunc(func, element, duration, opts) {
    opts = assign({}, opts);
    var tween;
    return new Promise(function(resolve, reject, onCancel) {
      opts.onComplete = resolve;
      tween = func(element, duration, opts);
      onCancel &&
        onCancel(function() {
          tween.kill();
        });
    });
  }

  var animateTo = animateFunc.bind(null, Tweens.to);

  var util = animateTo;
  util.to = animateTo;
  util.from = animateFunc.bind(null, Tweens.from);

  util.set = function animateSet(element, params) {
    params = assign({}, params);
    return new Promise(function(resolve, reject) {
      params.onComplete = resolve;
      Tweens.set(element, params);
    });
  };

  util.fromTo = function animateFromTo(element, duration, from, to) {
    to = assign({}, to);
    var tween;
    return new Promise(function(resolve, reject, onCancel) {
      to.onComplete = resolve;
      tween = Tweens.fromTo(element, duration, from, to);
      onCancel &&
        onCancel(function() {
          tween.kill();
        });
    });
  };
  ['staggerTo', 'staggerFrom'].forEach(function(fn) {
    var tweenFunc = Tweens[fn];
    var tweens;
    util[fn] = function(element, duration, from, stagger) {
      return new Promise(function(resolve, reject, onCancel) {
        tweens = tweenFunc(element, duration, from, stagger, resolve);
        onCancel &&
          onCancel(function() {
            tweens.forEach(function(tween) {
              tween.kill();
            });
          });
      });
    };
  });

  util.staggerFromTo = function staggerFromTo(element, duration, from, to, stagger, position) {
    var tweens;
    return new Promise(function(resolve, reject, onCancel) {
      tweens = Tweens.staggerFromTo(element, duration, from, to, stagger, resolve);
      onCancel &&
        onCancel(function() {
          tweens.forEach(function(tween) {
            tween.kill();
          });
        });
    });
  };

  util.killTweensOf = Tweens.killTweensOf;

  util.all = Promise.all;
  return util;
};
