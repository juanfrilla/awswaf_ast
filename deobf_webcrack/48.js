exports.__esModule = 1;
var _0x2a9061 = require("./0.js");
var _0x1eb681 = require("./47.js");
var _0xb86b84 = {
  "pharmacy-beta.corp.amazon.com": "https://development.amazon.com/",
  "pharmacy-gamma.corp.amazon.com": "https://pre-prod.amazon.com/",
  "pharmacy.amazon.com": "https://www.amazon.com/",
  "virtualcare.integ.amazon.com": "https://development.amazon.com/",
  "virtualcare-preprod.iad.xcorp.amazon.com": "https://pre-prod.amazon.com/",
  "virtualcare.amazon.com": "https://www.amazon.com/",
  "clinic-preprod.iad.xcorp.amazon.com": "https://pre-prod.amazon.com/",
  "clinic.integ.amazon.com": "https://development.amazon.com/",
  "clinic.amazon.com": "https://www.amazon.com/",
  "health.integ.amazon.com": "https://development.amazon.com/",
  "health-preprod.iad.xcorp.amazon.com": "https://pre-prod.amazon.com/",
  "health.amazon.com": "https://www.amazon.com/"
};
var _0x5ec290 = function (_0x6fd754) {
  var _0x29c5db = [null, "apply", 0, "__extends", "prototype", "obfuscate", "statement", 0.862433750025623, 0.20125660155970948];
  function _0x47712b() {
    return _0x29c5db[0] !== _0x6fd754 && _0x6fd754[_0x29c5db[1]](this, arguments) || this;
  }
  (0, _0x2a9061[_0x29c5db[3]])(_0x47712b, _0x6fd754);
  _0x47712b[_0x29c5db[4]][_0x29c5db[5]] = function (_0x1c39b4) {
    var _0x360fb6 = ["buildURL", "getRawHostname"];
    var _0x2915a8 = this[_0x360fb6[0]](_0x1c39b4);
    if (_0x2915a8 && _0x2915a8[_0x360fb6[1]]() in _0xb86b84) {
      return _0xb86b84[_0x2915a8[_0x360fb6[1]]()];
    } else {
      return _0x1c39b4;
    }
  };
  return _0x47712b;
}(_0x1eb681.default);
exports.default = _0x5ec290;