exports.__esModule = 1;
var _0x74a31d = require("./2.js");
var _0x1caebe = require("./4.js");
var _0x49b58a = function () {
  var _0x312a58 = ["data", 0, "prototype", "options", "cycleBuffer", "element", "get", "bindElement"];
  function _0x19f733(_0x8bbf47) {
    this[_0x312a58[3]] = _0x8bbf47;
    this[_0x312a58[5]] = _0x8bbf47[_0x312a58[5]];
    this[_0x312a58[0]] = {
      clicks: _0x312a58[1],
      touches: _0x312a58[1],
      keyPresses: _0x312a58[1],
      cuts: _0x312a58[1],
      copies: _0x312a58[1],
      pastes: _0x312a58[1],
      keyPressTimeIntervals: [],
      mouseClickPositions: [],
      keyCycles: [],
      mouseCycles: [],
      touchCycles: []
    };
    this[_0x312a58[7]](_0x8bbf47[_0x312a58[4]]);
  }
  _0x19f733[_0x312a58[2]][_0x312a58[7]] = function (_0x5635dd) {
    var _0xdde1a2 = ["copy", "keyCycles", "addEventListener", "mouseCycles", "keydown", "hashJsonBody", "mousedown", "touchCycles", "mouseup", "paste", "click", 0, "element", "touchstart", "touchend", 1, "keyup", "cut", "default"];
    var _0x4110ca = this;
    if (_0x5635dd === undefined) {
      _0x5635dd = -_0xdde1a2[15];
    }
    var _0x508c47 = new _0x74a31d[_0xdde1a2[18]](this[_0xdde1a2[12]]);
    _0x508c47[_0xdde1a2[2]](_0xdde1a2[4], function () {
      var _0x3c0a22 = ["data", "keyPresses"];
      return _0x4110ca[_0x3c0a22[0]][_0x3c0a22[1]]++;
    });
    _0x508c47[_0xdde1a2[2]](_0xdde1a2[14], function () {
      var _0x5d44d3 = ["data", "touches"];
      return _0x4110ca[_0x5d44d3[0]][_0x5d44d3[1]]++;
    });
    _0x508c47[_0xdde1a2[2]](_0xdde1a2[10], function (_0x41f0f6) {
      var _0x3c9c96 = ["clicks", ",", "top", "push", "scrollY", "pageX", "getBoundingClientRect", "join", "scrollX", "data", "element", "function", "length", 10, "pageY", "mouseClickPositions", 0, "left"];
      _0x4110ca[_0x3c9c96[9]][_0x3c9c96[0]]++;
      if (_0x4110ca[_0x3c9c96[9]][_0x3c9c96[15]][_0x3c9c96[12]] <= _0x3c9c96[13]) {
        var _0x3e22b3 = {
          top: _0x3c9c96[16],
          left: _0x3c9c96[16]
        };
        if (_0x3c9c96[11] == typeof _0x4110ca[_0x3c9c96[10]][_0x3c9c96[6]]) {
          _0x3e22b3 = _0x4110ca[_0x3c9c96[10]][_0x3c9c96[6]]();
        }
        var _0x2e2b5b = _0x3e22b3[_0x3c9c96[2]] + window[_0x3c9c96[4]];
        var _0x3f94a8 = _0x3e22b3[_0x3c9c96[17]] + window[_0x3c9c96[8]];
        _0x4110ca[_0x3c9c96[9]][_0x3c9c96[15]][_0x3c9c96[3]]([_0x41f0f6[_0x3c9c96[5]] - _0x3f94a8, _0x41f0f6[_0x3c9c96[14]] - _0x2e2b5b][_0x3c9c96[7]](_0x3c9c96[1]));
      }
    });
    _0x508c47[_0xdde1a2[2]](_0xdde1a2[17], function () {
      var _0x12776b = ["data", 0.387225623913219, "cuts", 0.6487615882273357];
      return _0x4110ca[_0x12776b[0]][_0x12776b[2]]++;
    });
    _0x508c47[_0xdde1a2[2]](_0xdde1a2[0], function () {
      var _0x2a3a9f = ["data", "copies"];
      return _0x4110ca[_0x2a3a9f[0]][_0x2a3a9f[1]]++;
    });
    _0x508c47[_0xdde1a2[2]](_0xdde1a2[9], function () {
      var _0x23eda1 = ["data", "pastes"];
      return _0x4110ca[_0x23eda1[0]][_0x23eda1[1]]++;
    });
    this[_0xdde1a2[1]] = new _0x1caebe[_0xdde1a2[18]]({
      startEvent: _0xdde1a2[4],
      endEvent: _0xdde1a2[16],
      element: this[_0xdde1a2[12]],
      buffer: _0x5635dd,
      callback: function () {
        var _0x44988e = [1, "startEventTime", "splice", "keyPressTimeIntervals", 0, "sort", "get", "data", "keyCycles", "length"];
        _0x4110ca[_0x44988e[7]][_0x44988e[8]] = _0x4110ca[_0x44988e[8]][_0x44988e[6]]();
        _0x4110ca[_0x44988e[7]][_0x44988e[8]][_0x44988e[5]](function (_0x10e1c6, _0x3fea8b) {
          var _0x5e3c34 = ["startEventTime"];
          return _0x10e1c6[_0x5e3c34[0]] - _0x3fea8b[_0x5e3c34[0]];
        });
        _0x4110ca[_0x44988e[7]][_0x44988e[3]] = [];
        if (_0x4110ca[_0x44988e[7]][_0x44988e[8]][_0x44988e[9]] > _0x44988e[0]) {
          for (var _0x573f40 = _0x4110ca[_0x44988e[7]][_0x44988e[8]][_0x44988e[9]] - _0x44988e[0]; _0x573f40 > _0x44988e[4]; _0x573f40--) {
            _0x4110ca[_0x44988e[7]][_0x44988e[3]][_0x44988e[2]](_0x44988e[4], _0x44988e[4], _0x4110ca[_0x44988e[7]][_0x44988e[8]][_0x573f40][_0x44988e[1]] - _0x4110ca[_0x44988e[7]][_0x44988e[8]][_0x573f40 - _0x44988e[0]][_0x44988e[1]]);
          }
        }
      }
    });
    this[_0xdde1a2[3]] = new _0x1caebe[_0xdde1a2[18]]({
      startEvent: _0xdde1a2[6],
      endEvent: _0xdde1a2[8],
      element: this[_0xdde1a2[12]],
      buffer: _0x5635dd,
      callback: function () {
        var _0x1e57a0 = ["get", "data", "mouseCycles"];
        return _0x4110ca[_0x1e57a0[1]][_0x1e57a0[2]] = _0x4110ca[_0x1e57a0[2]][_0x1e57a0[0]]();
      }
    });
    this[_0xdde1a2[7]] = new _0x1caebe[_0xdde1a2[18]]({
      startEvent: _0xdde1a2[13],
      endEvent: _0xdde1a2[14],
      element: this[_0xdde1a2[12]],
      buffer: _0x5635dd,
      callback: function () {
        var _0xc2fce4 = ["touchCycles", "get", "data"];
        return _0x4110ca[_0xc2fce4[2]][_0xc2fce4[0]] = _0x4110ca[_0xc2fce4[0]][_0xc2fce4[1]]();
      }
    });
  };
  _0x19f733[_0x312a58[2]][_0x312a58[6]] = function () {
    var _0x16d5d4 = [34528, "data"];
    return this[_0x16d5d4[1]];
  };
  return _0x19f733;
}();
exports.default = _0x49b58a;