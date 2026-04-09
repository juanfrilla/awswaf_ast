exports.__esModule = 1;
var _0x2024ad = require("./0.js");
var _0x49a2d7 = function () {
  var _0x4dd6ab = ["collectData", "prototype", 0.07450931195933141, "createOscillator", "collect", "AudioContext", "data", "webkitAudioContext", "ad", 1983, "collectorName"];
  function _0x5b4e09() {
    this[_0x4dd6ab[5]] = window[_0x4dd6ab[5]] || window[_0x4dd6ab[7]];
    this[_0x4dd6ab[6]] = {
      support: {
        context: !!this[_0x4dd6ab[5]],
        oscillator: !!this[_0x4dd6ab[5]] && !!this[_0x4dd6ab[5]][_0x4dd6ab[1]][_0x4dd6ab[3]]
      }
    };
    this[_0x4dd6ab[0]]();
  }
  _0x5b4e09[_0x4dd6ab[1]][_0x4dd6ab[0]] = function () {
    var _0x82fdf7 = [440, "type", "createOscillator", "connect", "context", "oscillator", "data", "value", "onaudioprocess", "support", "AudioContext", 1, "createGain", "createAnalyser", "createScriptProcessor", 4096, 0, "start", "gain", "triangle", "destination", "frequency"];
    var _0x5ae336 = this;
    if (this[_0x82fdf7[6]][_0x82fdf7[9]][_0x82fdf7[4]] && this[_0x82fdf7[6]][_0x82fdf7[9]][_0x82fdf7[5]]) {
      var _0x169c30 = new this[_0x82fdf7[10]]();
      var _0x43633f = _0x169c30[_0x82fdf7[13]]();
      var _0x5138b3 = _0x169c30[_0x82fdf7[12]]();
      _0x5138b3[_0x82fdf7[18]][_0x82fdf7[7]] = _0x82fdf7[16];
      var _0xdbadcb = _0x169c30[_0x82fdf7[14]](_0x82fdf7[15], _0x82fdf7[11], _0x82fdf7[11]);
      var _0x42cc03 = _0x169c30[_0x82fdf7[2]]();
      _0x42cc03[_0x82fdf7[1]] = _0x82fdf7[19];
      _0x42cc03[_0x82fdf7[21]][_0x82fdf7[7]] = _0x82fdf7[0];
      _0x42cc03[_0x82fdf7[3]](_0x43633f);
      _0x43633f[_0x82fdf7[3]](_0xdbadcb);
      _0xdbadcb[_0x82fdf7[3]](_0x5138b3);
      _0x5138b3[_0x82fdf7[3]](_0x169c30[_0x82fdf7[20]]);
      _0xdbadcb[_0x82fdf7[8]] = function (_0x14f878) {
        var _0x45512f = ["filter", "reduce", 0, "fingerprint", "disconnect", "frequencyBinCount", "stop", "data", "getFloatFrequencyData"];
        _0x14f878 = new Float32Array(_0x43633f[_0x45512f[5]]);
        _0x43633f[_0x45512f[8]](_0x14f878);
        _0x42cc03[_0x45512f[6]]();
        _0x43633f[_0x45512f[4]]();
        _0xdbadcb[_0x45512f[4]]();
        _0x5138b3[_0x45512f[4]]();
        _0x5ae336[_0x45512f[7]][_0x45512f[3]] = "" + _0x14f878[_0x45512f[0]](function (_0x295145) {
          return !isNaN(_0x295145) && Math.abs(_0x295145) !== Infinity;
        })[_0x45512f[1]](function (_0xc12023, _0x348d7c) {
          return _0xc12023 + _0x348d7c;
        }, _0x45512f[2]);
      };
      _0x42cc03[_0x82fdf7[17]](_0x82fdf7[16]);
    }
  };
  _0x5b4e09[_0x4dd6ab[1]][_0x4dd6ab[4]] = function () {
    var _0x73e846 = [0, "__awaiter"];
    return (0, _0x2024ad[_0x73e846[1]])(this, undefined, undefined, function () {
      var _0x4bd685 = [0, "__generator"];
      return (0, _0x2024ad[_0x4bd685[1]])(this, function (_0x50b9bd) {
        var _0x3ed1f0 = [2, "data"];
        return [_0x3ed1f0[0], {
          audio: this[_0x3ed1f0[1]]
        }];
      });
    });
  };
  _0x5b4e09[_0x4dd6ab[10]] = _0x4dd6ab[8];
  return _0x5b4e09;
}();
exports.default = _0x49a2d7;