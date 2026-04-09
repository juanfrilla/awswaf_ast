exports.__esModule = 1;
var _0x5bbeb0 = require("./2.js");
var _0x4473ba = require("./6.js");
var _0x4ba89f = require("./4.js");
var _0x1c88c0 = function () {
  var _0xb282e = ["Spacebar", "ArrowUp", " ", "bindMouseHandler", "MOUSE_EVENT", "get", "getTime", "start", "MOUSE_WHEEL_EVENT", "v", "VISIBILITY_CHANGE_EVENT", "Up", "Control", "Down", "listener", "t", "ArrowRight", "prototype", "Enter", "Right", "k", "default", "KEY_EVENT", "Left", "Space", "ArrowLeft", "sampleRateMilliseconds", "MOUSE_MOVE_EVENT", "el", "TOUCH_EVENT", "s", "ArrowDown", "bindTouchHandler", "KEY_WHITELIST", "Meta", "w", "SCROLL_EVENT", "Alt", "bindMouseScrollHandler", "mm", "bindEventCycleTelemetry", "bindKeyboardHandler", "bindHandlers", "m", "clear", "Escape", "throttler", "Esc", "events", "Shift", 0, "DEFAULT_SAMPLE_RATE", 100];
  function _0x5d1626(_0x42f4bb = {
    el: document,
    sampleRateMilliseconds: _0x5d1626[_0xb282e[51]]
  }) {
    this[_0xb282e[46]] = new _0x4473ba[_0xb282e[21]]();
    this[_0xb282e[7]] = new Date()[_0xb282e[6]]();
    this[_0xb282e[48]] = [];
    this[_0xb282e[28]] = _0x42f4bb[_0xb282e[28]];
    this[_0xb282e[26]] = _0x42f4bb[_0xb282e[26]];
    this[_0xb282e[14]] = new _0x5bbeb0[_0xb282e[21]](this[_0xb282e[28]]);
    this[_0xb282e[42]]();
  }
  _0x5d1626[_0xb282e[17]][_0xb282e[42]] = function () {
    var _0x1ded7d = ["bindKeyboardHandler", "bindMouseScrollHandler", "bindMouseHandler", "bindTouchHandler"];
    this[_0x1ded7d[1]]();
    this[_0x1ded7d[2]]();
    this[_0x1ded7d[3]]();
    this[_0x1ded7d[0]]();
  };
  _0x5d1626[_0xb282e[17]][_0xb282e[38]] = function () {
    var _0x1166a9 = ["create", "scroll", "listener", "sampleRateMilliseconds", "throttler", "wheel", "addEventListener"];
    var _0x5947aa = this;
    this[_0x1166a9[2]][_0x1166a9[6]](_0x1166a9[1], this[_0x1166a9[4]][_0x1166a9[0]](function (_0x2672d9) {
      var _0x36be97 = ["scrollY", "getTime", "events", "scrollX", "SCROLL_EVENT", "start", "push"];
      _0x5947aa[_0x36be97[2]][_0x36be97[6]]({
        type: _0x5d1626[_0x36be97[4]],
        time: new Date()[_0x36be97[1]]() - _0x5947aa[_0x36be97[5]],
        x: window[_0x36be97[3]],
        y: window[_0x36be97[0]]
      });
    }, this[_0x1166a9[3]]));
    this[_0x1166a9[2]][_0x1166a9[6]](_0x1166a9[5], this[_0x1166a9[4]][_0x1166a9[0]](function (_0x53d7c2) {
      var _0x237fb6 = ["getTime", "fwcim", "deltaX", "deltaY", "MOUSE_WHEEL_EVENT", "events", "start", "deltaZ", "push"];
      _0x5947aa[_0x237fb6[5]][_0x237fb6[8]]({
        type: _0x5d1626[_0x237fb6[4]],
        time: new Date()[_0x237fb6[0]]() - _0x5947aa[_0x237fb6[6]],
        dx: _0x53d7c2[_0x237fb6[2]],
        dy: _0x53d7c2[_0x237fb6[3]],
        dz: _0x53d7c2[_0x237fb6[7]]
      });
    }, this[_0x1166a9[3]]));
  };
  _0x5d1626[_0xb282e[17]][_0xb282e[40]] = function (_0x355992, _0x4c9c17, _0x4e6786, _0x47077e) {
    var _0x57a146 = [1, "el", 0, "default", 33720];
    var _0x45860b = this;
    if (_0x47077e === undefined) {
      _0x47077e = [];
    }
    new _0x4ba89f[_0x57a146[3]]({
      startEvent: _0x355992,
      endEvent: _0x4c9c17,
      buffer: -_0x57a146[0],
      element: this[_0x57a146[1]],
      callback: function (_0x215301, _0x4134c7) {
        var _0xe377d9 = ["x", "events", "pageY", "pageX", "startEvent", 1, "startEventTime", "which", "y", "push", "start", "endEventTime", "indexOf"];
        var _0x2156be = _0x4134c7;
        var _0x1878f7 = _0x2156be[_0xe377d9[4]];
        var _0x5dc986 = _0x2156be[_0xe377d9[6]];
        var _0xe3d2a7 = _0x2156be[_0xe377d9[11]];
        var _0x142000 = {
          startTime: _0x5dc986 - _0x45860b[_0xe377d9[10]],
          time: _0xe3d2a7 - _0x45860b[_0xe377d9[10]],
          type: _0x4e6786
        };
        if (_0x1878f7[_0xe377d9[3]] && _0x1878f7[_0xe377d9[2]]) {
          _0x142000[_0xe377d9[0]] = _0x1878f7[_0xe377d9[3]];
          _0x142000[_0xe377d9[8]] = _0x1878f7[_0xe377d9[2]];
        }
        if (_0x215301 && _0x47077e[_0xe377d9[12]](_0x215301) > -_0xe377d9[5]) {
          _0x142000[_0xe377d9[7]] = _0x215301;
        }
        _0x45860b[_0xe377d9[1]][_0xe377d9[9]](_0x142000);
      }
    });
  };
  _0x5d1626[_0xb282e[17]][_0xb282e[3]] = function () {
    var _0x5a59fc = ["listener", "throttler", "addEventListener", "mousemove", "sampleRateMilliseconds", "mousedown", "create", "bindEventCycleTelemetry", "mouseup", "MOUSE_EVENT"];
    var _0x1ee13d = this;
    this[_0x5a59fc[7]](_0x5a59fc[5], _0x5a59fc[8], _0x5d1626[_0x5a59fc[9]]);
    this[_0x5a59fc[0]][_0x5a59fc[2]](_0x5a59fc[3], this[_0x5a59fc[1]][_0x5a59fc[6]](function (_0x4960b8) {
      var _0x2aa882 = ["push", "pageY", "pageX", "getTime", "start", "events", "MOUSE_MOVE_EVENT"];
      _0x1ee13d[_0x2aa882[5]][_0x2aa882[0]]({
        time: new Date()[_0x2aa882[3]]() - _0x1ee13d[_0x2aa882[4]],
        type: _0x5d1626[_0x2aa882[6]],
        x: _0x4960b8[_0x2aa882[2]],
        y: _0x4960b8[_0x2aa882[1]]
      });
    }, this[_0x5a59fc[4]]));
  };
  _0x5d1626[_0xb282e[17]][_0xb282e[32]] = function () {
    var _0x4ef395 = ["touchstart", "TOUCH_EVENT", "bindEventCycleTelemetry", "touchend"];
    this[_0x4ef395[2]](_0x4ef395[0], _0x4ef395[3], _0x5d1626[_0x4ef395[1]]);
  };
  _0x5d1626[_0xb282e[17]][_0xb282e[41]] = function () {
    var _0x379cc0 = ["keydown", "KEY_EVENT", "KEY_WHITELIST", "listADocument", "keyup", "bindEventCycleTelemetry"];
    this[_0x379cc0[5]](_0x379cc0[0], _0x379cc0[4], _0x5d1626[_0x379cc0[1]], _0x5d1626[_0x379cc0[2]]);
  };
  _0x5d1626[_0xb282e[17]][_0xb282e[5]] = function () {
    var _0x27e025 = ["clear", "start", "events", "splice", 0];
    var _0x16ab4e = this[_0x27e025[1]];
    var _0x15e8db = this[_0x27e025[2]][_0x27e025[3]](_0x27e025[4]);
    this[_0x27e025[0]]();
    return {
      start: _0x16ab4e,
      events: _0x15e8db
    };
  };
  _0x5d1626[_0xb282e[17]][_0xb282e[44]] = function () {
    var _0x25aff0 = ["getTime", "events", "start", 0.087151410085202];
    this[_0x25aff0[2]] = new Date()[_0x25aff0[0]]();
    this[_0x25aff0[1]] = [];
  };
  _0x5d1626[_0xb282e[51]] = _0xb282e[52];
  _0x5d1626[_0xb282e[36]] = _0xb282e[30];
  _0x5d1626[_0xb282e[8]] = _0xb282e[35];
  _0x5d1626[_0xb282e[4]] = _0xb282e[43];
  _0x5d1626[_0xb282e[27]] = _0xb282e[39];
  _0x5d1626[_0xb282e[22]] = _0xb282e[20];
  _0x5d1626[_0xb282e[29]] = _0xb282e[15];
  _0x5d1626[_0xb282e[10]] = _0xb282e[9];
  _0x5d1626[_0xb282e[33]] = [_0xb282e[0], _0xb282e[24], _0xb282e[2], _0xb282e[1], _0xb282e[11], _0xb282e[31], _0xb282e[13], _0xb282e[25], _0xb282e[23], _0xb282e[16], _0xb282e[19], _0xb282e[47], _0xb282e[45], _0xb282e[49], _0xb282e[18], _0xb282e[12], _0xb282e[37], _0xb282e[34]];
  return _0x5d1626;
}();
exports.default = _0x1c88c0;