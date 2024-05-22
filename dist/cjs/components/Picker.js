"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Hue_js_1 = __importDefault(require("./Hue.js"));
const Inputs_js_1 = __importDefault(require("./Inputs.js"));
const Square_js_1 = __importDefault(require("./Square.js"));
const Opacity_js_1 = __importDefault(require("./Opacity.js"));
const Presets_js_1 = __importDefault(require("./Presets.js"));
const Controls_js_1 = __importDefault(require("./Controls.js"));
const context_js_1 = require("../context.js");
const GradientBar_js_1 = __importDefault(require("./GradientBar.js"));
const Picker = ({ locales, presets, hideHue, hideInputs, hidePresets, hideOpacity, hideEyeDrop, hideControls, hideInputType, hideColorGuide, hideGradientType, hideGradientStop, hideGradientAngle, hideColorTypeBtns, hideAdvancedSliders, hideGradientControls, }) => {
    const { isGradient } = (0, context_js_1.usePicker)();
    return (react_1.default.createElement("div", { style: { userSelect: 'none' }, id: "rbgcp-wrapper" },
        react_1.default.createElement(Square_js_1.default, null),
        !hideControls && (react_1.default.createElement(Controls_js_1.default, { locales: locales, hideEyeDrop: hideEyeDrop, hideInputType: hideInputType, hideColorGuide: hideColorGuide, hideGradientType: hideGradientType, hideGradientStop: hideGradientStop, hideColorTypeBtns: hideColorTypeBtns, hideGradientAngle: hideGradientAngle, hideAdvancedSliders: hideAdvancedSliders, hideGradientControls: hideGradientControls })),
        isGradient && react_1.default.createElement(GradientBar_js_1.default, null),
        !hideHue && react_1.default.createElement(Hue_js_1.default, null),
        !hideOpacity && react_1.default.createElement(Opacity_js_1.default, null),
        !hideInputs && react_1.default.createElement(Inputs_js_1.default, null),
        !hidePresets && react_1.default.createElement(Presets_js_1.default, { presets: presets })));
};
exports.default = Picker;
