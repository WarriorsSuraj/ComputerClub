"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
// biome-ignore lint/complexity/noStaticOnlyClass: 
var Console = /** @class */ (function () {
    function Console() {
    }
    // biome-ignore lint/suspicious/noExplicitAny: can be any
    Console.log = function () {
        var msgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msgs[_i] = arguments[_i];
        }
        console.log.apply(console, __spreadArray(["[".concat(chalk_1.default.greenBright("*"), "]")], msgs, false));
    };
    // biome-ignore lint/suspicious/noExplicitAny: can be any
    Console.warn = function () {
        var msgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msgs[_i] = arguments[_i];
        }
        console.log.apply(console, __spreadArray(["[".concat(chalk_1.default.yellowBright("?"), "]")], msgs, false));
    };
    // biome-ignore lint/suspicious/noExplicitAny: can be any
    Console.error = function () {
        var msgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msgs[_i] = arguments[_i];
        }
        console.log.apply(console, __spreadArray(["[".concat(chalk_1.default.redBright("!"), "]")], msgs, false));
    };
    return Console;
}());
exports.default = Console;
