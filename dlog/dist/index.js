"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default() {
  var a = 1,
      b = 2;

  var fn = function fn(a, b) {
    return a + b + (arguments.length <= 2 ? undefined : arguments[2]);
  };

  var result = fn(a, b, 7);
  var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var resultArr = arr.map(function (item) {
    if (item === result) {
      return item * 2;
    }

    return item;
  });
  return resultArr;
}