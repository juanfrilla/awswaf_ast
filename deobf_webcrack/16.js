exports.__esModule = 1;
var _0x132e40 = require("./0.js");
var _0x50e61d = function () {
  var _0x4d48be = ["collect", 19393, "ax-plugin", "checkActiveXPlugin", "collectorName", 0.15950375330397115, 4863, "container", "prototype", "setupVBScript", "VB_SCRIPT", "Function dAXP(n, v)\non error resume next\nset o = CreateObject(v)\nIf IsObject(o) Then\nSelect case n\ncase \"ShockwaveDirector\"\nf = o.ShockwaveVersion(\"\")\ncase \"ShockwaveFlash\"\nf = o.FlashVersion()\ncase \"RealPlayer\"\nf = o.GetVersionInfo\ncase Else\nf = \"\"\nend Select\ndAXP = f\nEnd If\nEnd Function"];
  function _0x56cd2e(_0x1c829b) {
    var _0x43cf29 = _0x1c829b[_0x4d48be[7]];
    this[_0x4d48be[7]] = _0x43cf29;
    this[_0x4d48be[9]]();
  }
  _0x56cd2e[_0x4d48be[8]][_0x4d48be[9]] = function () {
    var _0x454276 = ["text/vbscript", "VB_SCRIPT", "container", "appendChild", "text", "type", "The container was not found.", "script", "createElement"];
    if (!this[_0x454276[2]]) {
      throw new Error(_0x454276[6]);
    }
    var _0x1259c1 = document[_0x454276[8]](_0x454276[7]);
    _0x1259c1[_0x454276[5]] = _0x454276[0];
    _0x1259c1[_0x454276[4]] = _0x56cd2e[_0x454276[1]];
    this[_0x454276[2]][_0x454276[3]](_0x1259c1);
  };
  _0x56cd2e[_0x4d48be[8]][_0x4d48be[3]] = function (_0x3c1634, _0x39035a) {
    var _0x479c33 = [0.47008117140547934, 0, 1, " : ", null, 48627];
    var _0x3f3c16 = _0x479c33[2];
    try {
      if (dAXP) {
        _0x3f3c16 = _0x479c33[2];
      }
    } catch (_0x3bc8b5) {
      _0x3f3c16 = _0x479c33[1];
    }
    if (_0x3f3c16) {
      var _0x3aee4f = dAXP(_0x3c1634, _0x39035a);
      if (_0x3aee4f) {
        return {
          name: _0x3c1634,
          version: _0x3aee4f,
          str: _0x3c1634 + _0x479c33[3] + _0x3aee4f
        };
      }
    }
    return _0x479c33[4];
  };
  _0x56cd2e[_0x4d48be[8]][_0x4d48be[0]] = function () {
    var _0x35f018 = [42675, "__awaiter", "a", 0];
    return (0, _0x132e40[_0x35f018[1]])(this, undefined, undefined, function () {
      var _0xb14826;
      var _0x4f0851;
      var _0xb22aa4;
      var _0x59191b;
      var _0x939af9 = [0, "__generator"];
      return (0, _0x132e40[_0x939af9[1]])(this, function (_0x4bbfff) {
        var _0x38a13c = [null, /Windows NT 6\.0/, "push", ".", "jsonUseragent", "ShockwaveFlash.ShockwaveFlash", 16, "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "version", 2, "SWCtl.SWCtl", "ShockwaveFlash", "ShockwaveDirector", "checkActiveXPlugin", "userAgent", "match", 65535, "RealVideo.RealVideo(tm) ActiveX Control (32-bit)"];
        _0xb14826 = navigator[_0x38a13c[15]][_0x38a13c[16]](_0x38a13c[1]);
        (_0x4f0851 = [])[_0x38a13c[2]](this[_0x38a13c[14]](_0x38a13c[13], _0x38a13c[11]));
        _0xb22aa4 = this[_0x38a13c[14]](_0x38a13c[12], _0x38a13c[5]);
        _0x59191b = _0x38a13c[0];
        if (_0xb22aa4) {
          _0x59191b = (_0xb22aa4[_0x38a13c[9]] >> _0x38a13c[6]) + _0x38a13c[3] + (_0x38a13c[17] & _0xb22aa4[_0x38a13c[9]]);
          _0x4f0851[_0x38a13c[2]](_0xb22aa4);
        }
        if (!_0xb14826) {
          _0x4f0851[_0x38a13c[2]](this[_0x38a13c[14]](_0x38a13c[7], _0x38a13c[8]));
          _0x4f0851[_0x38a13c[2]](this[_0x38a13c[14]](_0x38a13c[7], _0x38a13c[18]));
        }
        return [_0x38a13c[10], {
          plugins: _0x4f0851,
          flashVersion: _0x59191b
        }];
      });
    });
  };
  _0x56cd2e[_0x4d48be[10]] = _0x4d48be[11];
  _0x56cd2e[_0x4d48be[4]] = _0x4d48be[2];
  return _0x56cd2e;
}();
exports.default = _0x50e61d;