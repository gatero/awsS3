"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Crypto = require("crypto-js");

var Signature = function () {
    function Signature() {
        _classCallCheck(this, Signature);
    }

    _createClass(Signature, null, [{
        key: "getSignature",
        value: function getSignature(config, date, policyBase64) {
            var getSignatureKey = function getSignatureKey(key, dateStamp, regionName) {
                var kDate = Crypto.HmacSHA256(dateStamp, "AWS4" + key);
                var kRegion = Crypto.HmacSHA256(regionName, kDate);
                var kService = Crypto.HmacSHA256("s3", kRegion);
                var kSigning = Crypto.HmacSHA256("aws4_request", kService);
                return kSigning;
            };
            var signature = function signature(policyEncoded) {
                return Crypto.HmacSHA256(policyEncoded, getSignatureKey(config.secretAccessKey, date, config.region)).toString(Crypto.enc.Hex);
            };
            return signature(policyBase64);
        }
    }]);

    return Signature;
}();

exports.default = Signature;