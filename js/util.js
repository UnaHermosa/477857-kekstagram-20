'use strict';
(function () {
  var KeyCode = {
    ENTER: 13,
    ESCAPE: 27
  };

  window.util = {
    ENTER: KeyCode.ENTER,
    ESCAPE: KeyCode.ESCAPE,
    isEscapeEvent: function (evt, action) {
      evt.preventDefault();
      if (KeyCode.ESCAPE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (KeyCode.ENTER) {
        action();
      }
    },
    getRandomValue: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };
})();
