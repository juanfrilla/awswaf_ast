var _0x4592bb = require("./66.js")(module);
var _0x5bb9b1 = require("./65.js");
var _0x5156f9;
(function (_0x21c009) {
  if (typeof _0x4592bb == "object" && _0x4592bb) {
    _0x4592bb.exports;
  }
  var _0x33a7f7 = typeof _0x5bb9b1 == "object" && _0x5bb9b1;
  if (_0x33a7f7.global !== _0x33a7f7) {
    _0x33a7f7.window;
  }
  function _0x39cd2b(_0x21d3e1) {
    this.message = _0x21d3e1;
  }
  (_0x39cd2b.prototype = new Error()).name = "InvalidCharacterError";
  function _0x2db41b(_0x597826) {
    throw new _0x39cd2b(_0x597826);
  }
  var _0x352df6 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var _0x491cb5 = /[\t\n\f\r ]/g;
  var _0x2ab576 = {
    encode: function (_0x3620dc) {
      _0x3620dc = String(_0x3620dc);
      if (/[^\0-\xFF]/.test(_0x3620dc)) {
        _0x2db41b("The string to be encoded contains characters outside of the Latin1 range.");
      }
      var _0x39a444;
      var _0x16279a;
      var _0x39e1c6;
      var _0x63fc5b;
      var _0x231fbd = _0x3620dc.length % 3;
      var _0x317569 = "";
      for (var _0x71a213 = -1, _0x1c3a5c = _0x3620dc.length - _0x231fbd; ++_0x71a213 < _0x1c3a5c;) {
        _0x39a444 = _0x3620dc.charCodeAt(_0x71a213) << 16;
        _0x16279a = _0x3620dc.charCodeAt(++_0x71a213) << 8;
        _0x39e1c6 = _0x3620dc.charCodeAt(++_0x71a213);
        _0x317569 += _0x352df6.charAt((_0x63fc5b = _0x39a444 + _0x16279a + _0x39e1c6) >> 18 & 63) + _0x352df6.charAt(_0x63fc5b >> 12 & 63) + _0x352df6.charAt(_0x63fc5b >> 6 & 63) + _0x352df6.charAt(_0x63fc5b & 63);
      }
      if (_0x231fbd == 2) {
        _0x39a444 = _0x3620dc.charCodeAt(_0x71a213) << 8;
        _0x16279a = _0x3620dc.charCodeAt(++_0x71a213);
        _0x317569 += _0x352df6.charAt((_0x63fc5b = _0x39a444 + _0x16279a) >> 10) + _0x352df6.charAt(_0x63fc5b >> 4 & 63) + _0x352df6.charAt(_0x63fc5b << 2 & 63) + "=";
      } else if (_0x231fbd == 1) {
        _0x63fc5b = _0x3620dc.charCodeAt(_0x71a213);
        _0x317569 += _0x352df6.charAt(_0x63fc5b >> 2) + _0x352df6.charAt(_0x63fc5b << 4 & 63) + "==";
      }
      return _0x317569;
    },
    decode: function (_0x34b51f) {
      var _0x104c84 = (_0x34b51f = String(_0x34b51f).replace(_0x491cb5, "")).length;
      if (_0x104c84 % 4 == 0) {
        _0x104c84 = (_0x34b51f = _0x34b51f.replace(/==?$/, "")).length;
      }
      if (_0x104c84 % 4 == 1 || /[^+a-zA-Z0-9/]/.test(_0x34b51f)) {
        _0x2db41b("Invalid character: the string to be decoded is not correctly encoded.");
      }
      var _0xd3200e;
      var _0x49df9a;
      var _0x5a5a85 = 0;
      var _0x59d87d = "";
      for (var _0x597694 = -1; ++_0x597694 < _0x104c84;) {
        _0x49df9a = _0x352df6.indexOf(_0x34b51f.charAt(_0x597694));
        _0xd3200e = _0x5a5a85 % 4 ? _0xd3200e * 64 + _0x49df9a : _0x49df9a;
        if (_0x5a5a85++ % 4) {
          _0x59d87d += String.fromCharCode(_0xd3200e >> (_0x5a5a85 * -2 & 6) & 255);
        }
      }
      return _0x59d87d;
    },
    version: "0.1.0"
  };
  if ((_0x5156f9 = function () {
    return _0x2ab576;
  }.call(exports, require, exports, _0x4592bb)) !== undefined) {
    _0x4592bb.exports = _0x5156f9;
  }
})();