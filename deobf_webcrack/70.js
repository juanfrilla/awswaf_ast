exports.__esModule = 1;
var _0x929d63 = require("./2.js");
var _0x95894 = function () {
  var _0x3b5b00 = ["idleCallbackStart", "IDLE_TIME_MS", null, "bindInteractionEvents", "default", "idleCallbackCalled", "handleInteractionEvent", 10, "click", 0, "triggerCallback", "keypress", "clear", "keydown", "timeout", "DOCUMENT_INTERACTION_EVENTS", "prototype", "DOCUMENT_EVENT_LISTENER", 45797, "getTime", "keyup", "IMMEDIATELY_RUN_TIMEOUT_MS", "idleTimeout", "scroll", 0.34218665650200997, "callback", "minimumCallbackTime", 500];
  function _0xde7004(_0x1491d2, _0x3d73be, _0xd4c932 = _0x3b5b00[9]) {
    this[_0x3b5b00[25]] = _0x1491d2;
    this[_0x3b5b00[14]] = _0x3d73be;
    this[_0x3b5b00[26]] = _0xd4c932;
    this[_0x3b5b00[0]] = new Date()[_0x3b5b00[19]]();
    this[_0x3b5b00[22]] = _0x3b5b00[2];
    this[_0x3b5b00[5]] = _0x3b5b00[9];
    this[_0x3b5b00[3]]();
  }
  _0xde7004[_0x3b5b00[16]][_0x3b5b00[3]] = function () {
    var _0x4a3c8c = ["addEventListener", "length", 23704, "fwcim", "number", "DOCUMENT_EVENT_LISTENER", "DOCUMENT_INTERACTION_EVENTS", "timeout", "callHandleInteractionEvent", 0];
    var _0xcd4b1 = this;
    this[_0x4a3c8c[8]] = function () {
      _0xcd4b1.handleInteractionEvent();
    };
    for (var _0x51494c = _0x4a3c8c[9], _0x13718a = _0xde7004[_0x4a3c8c[6]]; _0x51494c < _0x13718a[_0x4a3c8c[1]]; _0x51494c++) {
      var _0x2f65c9 = _0x13718a[_0x51494c];
      _0xde7004[_0x4a3c8c[5]][_0x4a3c8c[0]](_0x2f65c9, this[_0x4a3c8c[8]]);
    }
    if (_0x4a3c8c[4] == typeof this[_0x4a3c8c[7]]) {
      setTimeout(function () {
        var _0x19e1ce = ["triggerCallback", 0.06168729673247908, "aBodyNode"];
        _0xcd4b1[_0x19e1ce[0]]();
      }, this[_0x4a3c8c[7]]);
    }
  };
  _0xde7004[_0x3b5b00[16]][_0x3b5b00[6]] = function () {
    var _0x17fca6 = ["getTime", "number", "blobDocumentA", "idleCallbackStart", null, "IMMEDIATELY_RUN_TIMEOUT_MS", "IDLE_TIME_MS", "timeout", "idleTimeout"];
    var _0x38b12f = this;
    if (_0x17fca6[4] !== this[_0x17fca6[8]]) {
      clearTimeout(this[_0x17fca6[8]]);
    }
    var _0x351267 = new Date()[_0x17fca6[0]]() - this[_0x17fca6[3]];
    var _0x449dcb = _0x17fca6[1] == typeof this[_0x17fca6[7]] && _0x351267 > this[_0x17fca6[7]] ? _0xde7004[_0x17fca6[5]] : _0xde7004[_0x17fca6[6]];
    this[_0x17fca6[8]] = setTimeout(function () {
      var _0x22bc00 = ["minimumCallbackTime", "triggerCallback"];
      if (_0x351267 >= _0x38b12f[_0x22bc00[0]]) {
        _0x38b12f[_0x22bc00[1]]();
      }
    }, _0x449dcb);
  };
  _0xde7004[_0x3b5b00[16]][_0x3b5b00[10]] = function () {
    var _0x29564d = ["clear", 1, 0, "callback", "idleCallbackCalled"];
    if (_0x29564d[2] == this[_0x29564d[4]]) {
      this[_0x29564d[4]] = _0x29564d[1];
      this[_0x29564d[0]]();
      this[_0x29564d[3]]();
    }
  };
  _0xde7004[_0x3b5b00[16]][_0x3b5b00[12]] = function () {
    var _0x1073fd = ["idleTimeout", "idleCallbackCalled", 1, 0, "DOCUMENT_INTERACTION_EVENTS", "callHandleInteractionEvent", null, "removeEventListener", "length", "DOCUMENT_EVENT_LISTENER"];
    this[_0x1073fd[1]] = _0x1073fd[2];
    if (_0x1073fd[6] !== this[_0x1073fd[0]]) {
      clearTimeout(this[_0x1073fd[0]]);
      this[_0x1073fd[0]] = _0x1073fd[6];
    }
    for (var _0x114138 = _0x1073fd[3], _0x35b8ee = _0xde7004[_0x1073fd[4]]; _0x114138 < _0x35b8ee[_0x1073fd[8]]; _0x114138++) {
      var _0x1af4eb = _0x35b8ee[_0x114138];
      _0xde7004[_0x1073fd[9]][_0x1073fd[7]](_0x1af4eb, this[_0x1073fd[5]]);
    }
  };
  _0xde7004[_0x3b5b00[1]] = _0x3b5b00[27];
  _0xde7004[_0x3b5b00[21]] = _0x3b5b00[7];
  _0xde7004[_0x3b5b00[17]] = new _0x929d63[_0x3b5b00[4]](document);
  _0xde7004[_0x3b5b00[15]] = [_0x3b5b00[11], _0x3b5b00[13], _0x3b5b00[20], _0x3b5b00[8], _0x3b5b00[23]];
  return _0xde7004;
}();
exports.default = _0x95894;