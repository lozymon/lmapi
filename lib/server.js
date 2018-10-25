'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.server = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _ipAddress = require('./ipAddress');

var _ipAddress2 = _interopRequireDefault(_ipAddress);

var _createRoutes = require('./createRoutes');

var _createRoutes2 = _interopRequireDefault(_createRoutes);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var server = exports.server = function server() {
    var apiList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var exp = (0, _express2.default)();

    if (lmConfig.server.useCors) {
        exp.use((0, _cors2.default)());
    }

    // set up gzip compression
    if (lmConfig.server.gzip) {
        exp.use((0, _compression2.default)({
            filter: function filter(req, res) {
                return req.headers['x-no-compression'] ? false : _compression2.default.filter(req, res);
            }
        }));
    }

    exp.use(_bodyParser2.default.json());
    exp.use(_bodyParser2.default.urlencoded({
        extended: true
    }));

    exp.use('/api', (0, _createRoutes2.default)(apiList));

    exp.use("/", function (req, res) {
        return res.status(422).json({
            message: req.protocol + "://" + req.get('host') + req.originalUrl + " do not exist !"
        });
    });

    var server = _http2.default.createServer(exp);

    server.listen(lmConfig.server.port, function () {

        console.log('\n\nServer listening on port ' + lmConfig.server.port + "\n\n");
        (0, _ipAddress2.default)().forEach(function (ip) {
            console.log("http://" + ip + ":" + lmConfig.server.port + "/api/" + lmConfig.server.module);
        });
    });
};