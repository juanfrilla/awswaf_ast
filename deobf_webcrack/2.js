exports.__esModule = 1;
var _0x15041d = function () {
  var _0x141320 = ["prototype", "removeEventListener", "element", "addEventListener"];
  function _0x251c12(_0x572415) {
    this[_0x141320[2]] = _0x572415;
  }
  _0x251c12[_0x141320[0]][_0x141320[3]] = function (_0x355e29, _0x203957) {
    var _0x56074d = ["The event listener could not be bound because the browser does not support any event listener methods.", "on", "attachEvent", "function", "element", "addEventListener"];
    if (_0x56074d[3] == typeof this[_0x56074d[4]][_0x56074d[5]]) {
      this[_0x56074d[4]][_0x56074d[5]](_0x355e29, _0x203957);
    } else {
      if (_0x56074d[3] != typeof this[_0x56074d[4]][_0x56074d[2]]) {
        throw new Error(_0x56074d[0]);
      }
      this[_0x56074d[4]][_0x56074d[2]](_0x56074d[1] + _0x355e29, _0x203957);
    }
  };
  _0x251c12[_0x141320[0]][_0x141320[1]] = function (_0x411306, _0x514604) {
    var _0x112837 = ["on", "function", "removeEventListener", 0.02326886766984404, "The event listener could not be unbound because the browser does not support any event listener methods.", "element", "blobNode", "detachEvent", 0.4122097846524493];
    if (_0x112837[1] == typeof this[_0x112837[5]][_0x112837[2]]) {
      this[_0x112837[5]][_0x112837[2]](_0x411306, _0x514604);
    } else {
      if (_0x112837[1] != typeof this[_0x112837[5]][_0x112837[7]]) {
        throw new Error(_0x112837[4]);
      }
      this[_0x112837[5]][_0x112837[7]](_0x112837[0] + _0x411306, _0x514604);
    }
  };
  return _0x251c12;
}();
exports.default = _0x15041d;