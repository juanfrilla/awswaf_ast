exports.__esModule = 1;
var _0x342bc6 = function () {
  var _0x5c9c94 = ["\\n", "\\r", "encode", "isArray", "\\\\", 0.7965893245377338, 20671, "encodeWithPolyfill", "\\b", "\\f", "ESCAPED_CHARACTERS", "\\\"", "isNumberNaN", "prototype", "\\t", "jsonEscape"];
  function _0x3e9e5c() {}
  _0x3e9e5c[_0x5c9c94[13]][_0x5c9c94[2]] = function (_0x15d25d) {
    var _0x18132e = ["stringify", "encodeWithPolyfill"];
    if (JSON && JSON[_0x18132e[0]]) {
      return JSON[_0x18132e[0]](_0x15d25d);
    } else {
      return this[_0x18132e[1]](_0x15d25d);
    }
  };
  _0x3e9e5c[_0x5c9c94[13]][_0x5c9c94[7]] = function (_0x47da59) {
    var _0x3f5950 = ["hasOwnProperty", "number", "push", "boolean", "Undefined values cannot be stringified.", "jsonEscape", ",", "\"", "join", "[", "true", null, "id", "{", "isArray", "false", 0.6347360452143345, "}", "\":", 15276, "encodeWithPolyfill", "]", "object", "isNumberNaN", "null"];
    if (_0x3f5950[11] === _0x47da59 || this[_0x3f5950[23]](_0x47da59)) {
      return _0x3f5950[24];
    }
    if (_0x3f5950[1] == typeof _0x47da59) {
      return "" + _0x47da59;
    }
    if (_0x3f5950[3] == typeof _0x47da59) {
      if (_0x47da59) {
        return _0x3f5950[10];
      } else {
        return _0x3f5950[15];
      }
    }
    if (_0x3f5950[22] == typeof _0x47da59) {
      if (this[_0x3f5950[14]](_0x47da59)) {
        var _0x4ac5de = [];
        for (var _0x245d5f in _0x47da59) {
          if (_0x47da59[_0x245d5f] !== undefined) {
            _0x4ac5de[_0x3f5950[2]](this[_0x3f5950[20]](_0x47da59[_0x245d5f]));
          } else {
            _0x4ac5de[_0x3f5950[2]](_0x3f5950[24]);
          }
        }
        return _0x3f5950[9] + _0x4ac5de[_0x3f5950[8]](_0x3f5950[6]) + _0x3f5950[21];
      }
      _0x4ac5de = [];
      for (var _0x1ee728 in _0x47da59) {
        if (_0x47da59[_0x3f5950[0]](_0x1ee728) && _0x47da59[_0x1ee728] !== undefined) {
          _0x4ac5de[_0x3f5950[2]](_0x3f5950[7] + this[_0x3f5950[5]](_0x1ee728) + _0x3f5950[18] + this[_0x3f5950[20]](_0x47da59[_0x1ee728]));
        }
      }
      return _0x3f5950[13] + _0x4ac5de[_0x3f5950[8]](_0x3f5950[6]) + _0x3f5950[17];
    }
    if (_0x47da59 === undefined) {
      throw new Error(_0x3f5950[4]);
    }
    return _0x3f5950[7] + this[_0x3f5950[5]](_0x47da59) + _0x3f5950[7];
  };
  _0x3e9e5c[_0x5c9c94[13]][_0x5c9c94[3]] = function (_0x172e30) {
    var _0x221c28 = ["call", "isArray", "[object Array]"];
    if (Array[_0x221c28[1]]) {
      return Array[_0x221c28[1]](_0x172e30);
    } else {
      return _0x221c28[2] === toString[_0x221c28[0]](_0x172e30);
    }
  };
  _0x3e9e5c[_0x5c9c94[13]][_0x5c9c94[12]] = function (_0x27ee35) {
    return typeof _0x27ee35 == "number" && isNaN(_0x27ee35);
  };
  _0x3e9e5c[_0x5c9c94[13]][_0x5c9c94[15]] = function (_0x45f85d) {
    var _0x298c9c = [/[\\"\u0000-\u001F\u2028\u2029]/g, "replace", "statementEncrypt", "toString"];
    return _0x45f85d[_0x298c9c[3]]()[_0x298c9c[1]](_0x298c9c[0], function (_0x479afd) {
      var _0x3591d2 = ["charCodeAt", 16, 0, "toString", "hasOwnProperty", "substring", 0.746732209357865, "ESCAPED_CHARACTERS", 1, "\\u", 65536];
      if (_0x3e9e5c[_0x3591d2[7]][_0x3591d2[4]](_0x479afd)) {
        return _0x3e9e5c[_0x3591d2[7]][_0x479afd];
      } else {
        return _0x3591d2[9] + (_0x479afd[_0x3591d2[0]](_0x3591d2[2]) + _0x3591d2[10])[_0x3591d2[3]](_0x3591d2[1])[_0x3591d2[5]](_0x3591d2[8]);
      }
    });
  };
  _0x3e9e5c[_0x5c9c94[10]] = {
    "\"": _0x5c9c94[11],
    "\\": _0x5c9c94[4],
    "\b": _0x5c9c94[8],
    "\n": _0x5c9c94[0],
    "\f": _0x5c9c94[9],
    "\r": _0x5c9c94[1],
    "\t": _0x5c9c94[14]
  };
  return _0x3e9e5c;
}();
exports.default = _0x342bc6;