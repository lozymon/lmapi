'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var os = require('os');

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