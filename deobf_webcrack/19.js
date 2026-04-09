exports.__esModule = 1;
var _0x1ed826 = require("./0.js");
var _0x1c8191 = function () {
  var _0x51facc = ["MAX_SIZE_BYTES", 10240, "prototype", "getExistingItems", "MAX_AGE_SECONDS", "storage", 3600, "amzn:fwcim:events", "get", "BUFFER_KEY", "add"];
  function _0x9fee3(_0xe5d404) {
    this[_0x51facc[5]] = _0xe5d404;
  }
  _0x9fee3[_0x51facc[2]][_0x51facc[3]] = function () {
    var _0x4e9450 = ["getItem", "BUFFER_KEY", "string", "filter", "storage", "parse"];
    var _0x92b671 = this[_0x4e9450[4]][_0x4e9450[0]](_0x9fee3[_0x4e9450[1]]);
    if (_0x4e9450[2] == typeof _0x92b671) {
      return JSON[_0x4e9450[5]](_0x92b671)[_0x4e9450[3]](function (_0x517c2b) {
        var _0x4c4a4a = ["getTime", 1000, "MAX_AGE_SECONDS", "time"];
        return _0x517c2b[_0x4c4a4a[3]] > new Date()[_0x4c4a4a[0]]() - _0x4c4a4a[1] * _0x9fee3[_0x4c4a4a[2]];
      });
    } else {
      return [];
    }
  };
  _0x9fee3[_0x51facc[2]][_0x51facc[10]] = function (_0x2aed9f) {
    var _0x5e6102 = [0, "__awaiter"];
    return (0, _0x1ed826[_0x5e6102[1]])(this, undefined, undefined, function () {
      var _0x6a984e;
      var _0x36bbb1;
      var _0x2bae3a = [0, "__generator"];
      return (0, _0x1ed826[_0x2bae3a[1]])(this, function (_0x5a647b) {
        var _0x2a42ed = ["setItem", "getTime", "MAX_SIZE_BYTES", "hashDom", "BUFFER_KEY", "storage", 0.9446920057807127, "getExistingItems", "length", "amazonFwcimStatement", 2, "push", "stringify"];
        (_0x6a984e = this[_0x2a42ed[7]]())[_0x2a42ed[11]]({
          time: new Date()[_0x2a42ed[1]](),
          item: _0x2aed9f
        });
        if (!((_0x36bbb1 = JSON[_0x2a42ed[12]](_0x6a984e))[_0x2a42ed[8]] > _0x9fee3[_0x2a42ed[2]])) {
          this[_0x2a42ed[5]][_0x2a42ed[0]](_0x9fee3[_0x2a42ed[4]], _0x36bbb1);
        }
        return [_0x2a42ed[10]];
      });
    });
  };
  _0x9fee3[_0x51facc[2]][_0x51facc[8]] = function () {
    var _0x3056c4 = [0, "__awaiter"];
    return (0, _0x1ed826[_0x3056c4[1]])(this, undefined, undefined, function () {
      var _0x44f168;
      var _0x3e4024 = ["__generator", 0.153724226614518, 0.9140232397931172, 0];
      return (0, _0x1ed826[_0x3e4024[0]])(this, function (_0x261a2b) {
        var _0x3b23ed = ["removeItem", "getExistingItems", 2, "map", "BUFFER_KEY", "storage"];
        _0x44f168 = this[_0x3b23ed[1]]();
        this[_0x3b23ed[5]][_0x3b23ed[0]](_0x9fee3[_0x3b23ed[4]]);
        return [_0x3b23ed[2], _0x44f168[_0x3b23ed[3]](function (_0x2eb2ff) {
          return _0x2eb2ff.item;
        })];
      });
    });
  };
  _0x9fee3[_0x51facc[9]] = _0x51facc[7];
  _0x9fee3[_0x51facc[0]] = _0x51facc[1];
  _0x9fee3[_0x51facc[4]] = _0x51facc[6];
  return _0x9fee3;
}();
exports.default = _0x1c8191;