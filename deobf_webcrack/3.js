exports.__esModule = 1;
var _0x13d7a7 = function () {
  var _0x85f655 = ["buildCrcTable", 3988292384, "IEEE_POLYNOMIAL", "calculate", "prototype", 11031, 0.3087016403926366];
  function _0x59a50d() {}
  _0x59a50d[_0x85f655[4]][_0x85f655[0]] = function () {
    var _0x3c029c = [256, "IEEE_POLYNOMIAL", 8, 1, 0, "crcTable"];
    this[_0x3c029c[5]] = [];
    for (var _0x260b36 = _0x3c029c[4]; _0x260b36 < _0x3c029c[0]; _0x260b36++) {
      var _0x384d06 = _0x260b36;
      for (var _0x16ff38 = _0x3c029c[4]; _0x16ff38 < _0x3c029c[2]; _0x16ff38++) {
        if (_0x3c029c[3] == (_0x3c029c[3] & _0x384d06)) {
          _0x384d06 = _0x384d06 >>> _0x3c029c[3] ^ _0x59a50d[_0x3c029c[1]];
        } else {
          _0x384d06 >>>= _0x3c029c[3];
        }
      }
      this[_0x3c029c[5]][_0x260b36] = _0x384d06;
    }
  };
  _0x59a50d[_0x85f655[4]][_0x85f655[3]] = function (_0x34e591) {
    var _0x5cd696 = [4294967295, "captchaA", "crcTable", 0, 255, "buildCrcTable", "charCodeAt", 8, "length"];
    if (!this[_0x5cd696[2]]) {
      this[_0x5cd696[5]]();
    }
    var _0x2b44c1;
    var _0x10a835 = _0x5cd696[3];
    _0x10a835 ^= _0x5cd696[0];
    for (var _0x275212 = _0x5cd696[3]; _0x275212 < _0x34e591[_0x5cd696[8]]; _0x275212++) {
      _0x2b44c1 = _0x5cd696[4] & (_0x10a835 ^ _0x34e591[_0x5cd696[6]](_0x275212));
      _0x10a835 = _0x10a835 >>> _0x5cd696[7] ^ this[_0x5cd696[2]][_0x2b44c1];
    }
    return _0x5cd696[0] ^ _0x10a835;
  };
  _0x59a50d[_0x85f655[2]] = _0x85f655[1];
  return _0x59a50d;
}();
exports.default = _0x13d7a7;