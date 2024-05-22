"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorPicker = void 0;
const react_1 = __importStar(require("react"));
const context_js_1 = __importDefault(require("../context.js"));
const Picker_js_1 = __importDefault(require("./Picker.js"));
const constants_js_1 = require("../constants.js");
const utils_js_1 = require("../utils/utils.js");
const core_module_css_1 = __importDefault(require("../core.module.css"));
function ColorPicker({ value = 'rgba(175, 51, 242, 1)', onChange, hideControls = false, hideInputs = false, hideOpacity = false, hidePresets = false, hideHue = false, presets = [], hideEyeDrop = false, hideAdvancedSliders = false, hideColorGuide = false, hideInputType = false, hideColorTypeBtns = false, hideGradientType = false, hideGradientAngle = false, hideGradientStop = false, hideGradientControls = false, locales = constants_js_1.defaultLocales, width = 294, height = 294, style = {}, className, }) {
    const safeValue = (0, utils_js_1.objectToString)(value);
    const contRef = (0, react_1.useRef)(null);
    return (react_1.default.createElement("div", { ref: contRef, className: className, style: { ...style, width: width } },
        react_1.default.createElement(context_js_1.default, { value: safeValue, classes: core_module_css_1.default, onChange: onChange, squareWidth: width, squareHeight: height, hideOpacity: hideOpacity },
            react_1.default.createElement(Picker_js_1.default, { hideControls: hideControls, hideInputs: hideInputs, hidePresets: hidePresets, hideOpacity: hideOpacity, hideHue: hideHue, presets: presets, hideEyeDrop: hideEyeDrop, hideAdvancedSliders: hideAdvancedSliders, hideColorGuide: hideColorGuide, hideInputType: hideInputType, hideColorTypeBtns: hideColorTypeBtns, hideGradientType: hideGradientType, hideGradientAngle: hideGradientAngle, hideGradientStop: hideGradientStop, hideGradientControls: hideGradientControls, locales: locales }))));
}
exports.ColorPicker = ColorPicker;
