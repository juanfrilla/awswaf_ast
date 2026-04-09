exports.__esModule = 1;
var _0x518b19 = function () {
  var _0x321b73 = ["ie", "windows"];
  function _0x59a43d() {}
  _0x59a43d[_0x321b73[0]] = function () {
    var _0x5445f8 = ["match", /MSIE [0-9.]+/i, "userAgent", "navigator"];
    return !!window[_0x5445f8[3]][_0x5445f8[2]][_0x5445f8[0]](_0x5445f8[1]);
  };
  _0x59a43d[_0x321b73[1]] = function () {
    var _0x376b03 = ["captchaBlob", "userAgent", "amazonBody", /Windows/i, "match", "navigator", 14613];
    return !!window[_0x376b03[5]][_0x376b03[1]][_0x376b03[4]](_0x376b03[3]);
  };
  return _0x59a43d;
}();
exports.default = _0x518b19;