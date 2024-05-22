"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.round = exports.formatInputValues = exports.getColors = exports.high = exports.low = void 0;
const constants_js_1 = require("../constants.js");
const gradientParser_js_1 = require("./gradientParser.js");
const { defaultColor, defaultGradient } = constants_js_1.config;
const low = (color) => {
    return color.value.toLowerCase();
};
exports.low = low;
const high = (color) => {
    return color.value.toUpperCase();
};
exports.high = high;
const getColors = (value) => {
    const isGradient = value?.includes('gradient');
    if (isGradient) {
        const isConic = value?.includes('conic');
        const safeValue = !isConic ? value : defaultGradient;
        if (isConic) {
            console.log('Sorry we cant handle conic gradients yet');
        }
        const obj = (0, gradientParser_js_1.gradientParser)(safeValue);
        return obj?.colorStops;
    }
    else {
        const safeValue = value || defaultColor;
        return [{ value: safeValue }];
    }
};
exports.getColors = getColors;
const formatInputValues = (value, min, max) => {
    return isNaN(value) ? min : value < min ? min : value > max ? max : value;
};
exports.formatInputValues = formatInputValues;
const round = (val) => {
    return Math.round(val);
};
exports.round = round;
