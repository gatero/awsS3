"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Date = require("./Date");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Policy = function () {
    function Policy() {
        _classCallCheck(this, Policy);
    }

    _createClass(Policy, null, [{
        key: "getPolicy",
        value: function getPolicy(config) {
            var policy = function policy() {
                return {
                    expiration: _Date.dateISOString,
                    conditions: [{ bucket: config.bucketName }, ["starts-with", "$key", "" + (config.dirName ? config.dirName + "/" : "")], { acl: "public-read" }, ["starts-with", "$Content-Type", ""], { "x-amz-meta-uuid": "14365123651274" }, { "x-amz-server-side-encryption": "AES256" }, ["starts-with", "$x-amz-meta-tag", ""], {
                        "x-amz-credential": config.accessKeyId + "/" + _Date.dateYMD + "/" + config.region + "/s3/aws4_request"
                    }, { "x-amz-algorithm": "AWS4-HMAC-SHA256" }, { "x-amz-date": _Date.xAmzDate }]
                };
            };
            //Returns a base64 policy;
            return new Buffer(JSON.stringify(policy())).toString("base64").replace(/\n|\r/, "");
        }
    }]);

    return Policy;
}();

exports.default = Policy;
;