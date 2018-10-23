/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ipAddress.js":
/*!**************************!*\
  !*** ./src/ipAddress.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var os = __webpack_require__(/*! os */ "os");

    var networkInterfaces = os.networkInterfaces();

    return Object.keys(networkInterfaces).map(function (key) {
        return networkInterfaces[key].filter(function (addr) {
            return addr.family === 'IPv4';
        }).reduce(function (arr, obj) {
            arr.push(obj.address);
            return arr;
        }, []);
    }).reduce(function (newArr, arr) {
        arr.forEach(function (ip) {
            return newArr.push(ip);
        });
        return newArr;
    }, []);
};

/***/ }),

/***/ "./src/lmApi.js":
/*!**********************!*\
  !*** ./src/lmApi.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = __webpack_require__(/*! ./server */ "./src/server.js");

Object.defineProperty(exports, 'server', {
  enumerable: true,
  get: function get() {
    return _server.server;
  }
});

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.server = undefined;

var _express = __webpack_require__(/*! express */ "express");

var _express2 = _interopRequireDefault(_express);

var _cors = __webpack_require__(/*! cors */ "cors");

var _cors2 = _interopRequireDefault(_cors);

var _http = __webpack_require__(/*! http */ "http");

var _http2 = _interopRequireDefault(_http);

var _compression = __webpack_require__(/*! compression */ "compression");

var _compression2 = _interopRequireDefault(_compression);

var _bodyParser = __webpack_require__(/*! body-parser */ "body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _ipAddress = __webpack_require__(/*! ./ipAddress */ "./src/ipAddress.js");

var _ipAddress2 = _interopRequireDefault(_ipAddress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/***/ }),

/***/ "./srcExample/api/index.js":
/*!*********************************!*\
  !*** ./srcExample/api/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = [];

/***/ }),

/***/ "./srcExample/config/database.js":
/*!***************************************!*\
  !*** ./srcExample/config/database.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    driver: '',
    ip: '',
    user: '',
    password: '',
    database: ''
};

/***/ }),

/***/ "./srcExample/config/index.js":
/*!************************************!*\
  !*** ./srcExample/config/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _server = __webpack_require__(/*! ./server */ "./srcExample/config/server.js");

var _server2 = _interopRequireDefault(_server);

var _database = __webpack_require__(/*! ./database */ "./srcExample/config/database.js");

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.lmConfig = {
    server: _server2.default,
    database: _database2.default
};

/***/ }),

/***/ "./srcExample/config/server.js":
/*!*************************************!*\
  !*** ./srcExample/config/server.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    debug: true,
    useCors: true,
    gzip: true,
    module: '',
    port: 8000
};

/***/ }),

/***/ "./srcExample/index.js":
/*!*****************************!*\
  !*** ./srcExample/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lmApi = __webpack_require__(/*! ../src/lmApi */ "./src/lmApi.js");

var _api = __webpack_require__(/*! ./api */ "./srcExample/api/index.js");

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(/*! ./config */ "./srcExample/config/index.js");

(0, _lmApi.server)(_api2.default);

/***/ }),

/***/ 0:
/*!***********************************!*\
  !*** multi ./srcExample/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./srcExample/index.js */"./srcExample/index.js");


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map