exports.__esModule = 1;
var _0x4fd1d2 = require("./0.js");
var _0x59c043 = require("./48.js");
var _0x4eb5a0 = require("./47.js");
var _0x4b167e = "openid.assoc_handle";
var _0x31f1fd = "openid.return_to";
var _0x3fa0cc = {
  amzn_whidbey_desktop_us: "usflex"
};
var _0xb5636c = {
  amzn_whidbey_desktop_us: "usflex"
};
var _0x1fd1e8 = function (_0x329410) {
  var _0x54a554 = ["obfuscateReturnUrl", "returnUrlObfsucator", 0, "obfuscate", "default", "shouldObfuscate", null, "__extends", "apply", "prototype"];
  function _0xa570ae() {
    var _0x367c7b = _0x54a554[6] !== _0x329410 && _0x329410[_0x54a554[8]](this, arguments) || this;
    _0x367c7b[_0x54a554[1]] = new _0x59c043[_0x54a554[4]]();
    return _0x367c7b;
  }
  (0, _0x4fd1d2[_0x54a554[7]])(_0xa570ae, _0x329410);
  _0xa570ae[_0x54a554[9]][_0x54a554[3]] = function (_0x12dfc8) {
    var _0x715bc3 = ["hasParameter", "toString", "obfuscateReturnUrl", "shouldObfuscate", "setParameter", "buildURL", "getParameter"];
    var _0x595647 = this[_0x715bc3[5]](_0x12dfc8);
    if (!_0x595647 || !this[_0x715bc3[3]](_0x595647)) {
      return _0x12dfc8;
    }
    var _0x1bdcfe = _0x595647[_0x715bc3[6]](_0x4b167e);
    if (_0x1bdcfe in _0x3fa0cc) {
      _0x595647[_0x715bc3[4]](_0x4b167e, _0x3fa0cc[_0x1bdcfe]);
    }
    var _0x392c68 = _0x595647[_0x715bc3[6]]("pageId");
    if (_0x392c68 in _0xb5636c) {
      _0x595647[_0x715bc3[4]]("pageId", _0xb5636c[_0x392c68]);
    }
    if (_0x595647[_0x715bc3[0]](_0x31f1fd)) {
      var _0x4969a7 = _0x595647[_0x715bc3[6]](_0x31f1fd);
      _0x595647[_0x715bc3[4]](_0x31f1fd, this[_0x715bc3[2]](_0x4969a7));
    }
    return _0x595647[_0x715bc3[1]]();
  };
  _0xa570ae[_0x54a554[9]][_0x54a554[0]] = function (_0x16e925) {
    var _0x3605be = ["returnUrlObfsucator", "obfuscate"];
    return this[_0x3605be[0]][_0x3605be[1]](_0x16e925);
  };
  _0xa570ae[_0x54a554[9]][_0x54a554[5]] = function (_0x1a452b) {
    var _0x5838be = ["indexOf", "/ap/", "/a/", 0, "getPathname"];
    return _0x5838be[3] === _0x1a452b[_0x5838be[4]]()[_0x5838be[0]](_0x5838be[1]) || _0x5838be[3] === _0x1a452b[_0x5838be[4]]()[_0x5838be[0]](_0x5838be[2]);
  };
  return _0xa570ae;
}(_0x4eb5a0.default);
exports.default = _0x1fd1e8;