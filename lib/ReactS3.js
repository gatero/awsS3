"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.deleteFile = exports.uploadFile = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Signature = require("./Signature");

var _Signature2 = _interopRequireDefault(_Signature);

var _Policy = require("./Policy");

var _Policy2 = _interopRequireDefault(_Policy);

var _Date = require("./Date");

var _ErrorThrower = require("./ErrorThrower");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var S3FileUpload = function () {
    function S3FileUpload() {
        _classCallCheck(this, S3FileUpload);
    }

    _createClass(S3FileUpload, null, [{
        key: "uploadFile",
        value: async function uploadFile(file, config) {

            // Error Thrower :x:
            (0, _ErrorThrower.throwError)(config, file);

            var fd = new FormData();
            var key = "" + (config.dirName ? config.dirName + "/" : "") + file.name;
            var url = config.customURL ? config.customURL : "https://" + config.bucketName + ".s3.amazonaws.com/";
            fd.append("key", key);
            fd.append("acl", "public-read");
            fd.append("Content-Type", file.type);
            fd.append("x-amz-meta-uuid", "14365123651274");
            fd.append("x-amz-server-side-encryption", "AES256");
            fd.append("X-Amz-Credential", config.accessKeyId + "/" + _Date.dateYMD + "/" + config.region + "/s3/aws4_request");
            fd.append("X-Amz-Algorithm", "AWS4-HMAC-SHA256");
            fd.append("X-Amz-Date", _Date.xAmzDate);
            fd.append("x-amz-meta-tag", "");
            fd.append("Policy", _Policy2.default.getPolicy(config));
            fd.append("X-Amz-Signature", _Signature2.default.getSignature(config, _Date.dateYMD, _Policy2.default.getPolicy(config)));
            fd.append("file", file);

            var params = {
                method: "post",
                headers: {
                    fd: fd
                },
                body: fd
            };

            var data = await fetch(url, params);
            if (!data.ok) return Promise.reject(data);
            return Promise.resolve({
                bucket: config.bucketName,
                key: "" + (config.dirName ? config.dirName + "/" : "") + file.name,
                location: "" + url + (config.dirName ? config.dirName + "/" : "") + file.name,
                result: data
            });
        }
    }, {
        key: "deleteFile",
        value: async function deleteFile(fileName, config) {
            var fd = new FormData();
            var url = "https://" + config.bucketName + ".s3-" + config.region + ".amazonaws.com/" + (config.dirName ? config.dirName + "/" : "") + fileName;
            fd.append("Date", _Date.xAmzDate);
            fd.append("X-Amz-Date", _Date.xAmzDate);
            fd.append("Authorization", _Signature2.default.getSignature(config, _Date.dateYMD, _Policy2.default.getPolicy(config)));
            fd.append("Content-Type", "text/plain");

            var params = {
                method: "delete",
                headers: {
                    fd: fd
                }
            };

            var deleteResult = await fetch(url, params);
            if (!deleteResult.ok) return Promise.reject(deleteResult);
            return Promise.resolve({
                ok: deleteResult.ok,
                status: deleteResult.status,
                message: "File Deleted",
                fileName: fileName
            });
        }
    }]);

    return S3FileUpload;
}();

var uploadFile = S3FileUpload.uploadFile,
    deleteFile = S3FileUpload.deleteFile;
exports.uploadFile = uploadFile;
exports.deleteFile = deleteFile;
exports.default = S3FileUpload;