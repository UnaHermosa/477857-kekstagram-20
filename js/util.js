'use strict';
(function () {
  var KeyCode = {
    ENTER: 13,
    ESCAPE: 27
  };

  var shuffleArray = function (arr) {
    var copyArr = arr.slice();
    for (var i = copyArr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copyArr[i];
      copyArr[i] = copyArr[j];
      copyArr[j] = temp;
    }
    return copyArr;
  };

  var sortObjectsArrayByField = function (arr, field) {
    var cloneArr = arr.slice();
    cloneArr.sort(function (first, second) {
      if (first[field] < second[field]) {
        return 1;
      } else if (first[field] > second[field]) {
        return -1;
      } else {
        return 0;
      }
    });
    return cloneArr;
  };

  window.util = {
    ENTER: KeyCode.ENTER,
    ESCAPE: KeyCode.ESCAPE,
    shuffleArray: shuffleArray,
    sortObjectsArrayByField: sortObjectsArrayByField
  };
})();
