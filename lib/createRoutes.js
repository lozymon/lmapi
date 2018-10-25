'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var createRoutes = function createRoutes(apiList) {
    var router = _express2.default.Router();
    var flatten = function flatten(a) {
        var _ref;

        return Array.isArray(a) ? (_ref = []).concat.apply(_ref, (0, _toConsumableArray3.default)(a.map(flatten))) : a;
    };
    var routeList = flatten(apiList.map(function (api) {
        return Object.keys(api).map(function (func) {
            return {
                type: func.substr(0, func.indexOf('_')),
                name: func.substr(func.indexOf('_') + 1),
                callback: api[func]
            };
        });
    }));

    routeList.forEach(function (route) {
        console.log(route.type + ' -> ', route.name);
        router[route.type]('/' + route.name, function (req, res) {
            var ret = route.callback(req, res);

            // if callback has return value trye to find the type and return the value
            if (typeof ret === 'string') {
                res.send(ret);
            } else if ((typeof ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(ret)) === 'object') {
                res.send(JSON.stringify(ret));
            }
        });
    });

    return router;
};

exports.default = createRoutes;