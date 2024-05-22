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
const react_1 = __importDefault(require("react"));
const context_js_1 = require("../context.js");
const formatters_js_1 = require("../utils/formatters.js");
const Controls_js_1 = require("./Controls.js");
const icon_js_1 = __importStar(require("./icon.js"));
const formatters_js_2 = require("../utils/formatters.js");
const GradientType = () => {
    const { gradientType, onChange, value, classes } = (0, context_js_1.usePicker)();
    const isLinear = gradientType === 'linear-gradient';
    const isRadial = gradientType === 'radial-gradient';
    const handleLinear = () => {
        const remaining = value.split(/,(.+)/)[1];
        onChange(`linear-gradient(90deg, ${remaining}`);
    };
    const handleRadial = () => {
        const remaining = value.split(/,(.+)/)[1];
        onChange(`radial-gradient(circle, ${remaining}`);
    };
    return (react_1.default.createElement("div", { className: classes.rbgcpControlBtnWrapper },
        react_1.default.createElement("div", { onClick: handleLinear, id: "rbgcp-linear-btn", className: `${classes.rbgcpControlBtn} ${isLinear && classes.rbgcpControlBtnSelected}` },
            react_1.default.createElement(icon_js_1.LinearIcon, { color: isLinear ? '#568CF5' : '' })),
        react_1.default.createElement("div", { onClick: handleRadial, id: "rbgcp-radial-btn", className: `${classes.rbgcpControlBtn} ${isRadial && classes.rbgcpControlBtnSelected}` },
            react_1.default.createElement(icon_js_1.RadialIcon, { color: isRadial ? '#568CF5' : '' }))));
};
const StopPicker = () => {
    const { classes, currentLeft, handleGradient, currentColor } = (0, context_js_1.usePicker)();
    const handleMove = (newVal) => {
        handleGradient(currentColor, (0, formatters_js_1.formatInputValues)(parseInt(newVal), 0, 100));
    };
    return (react_1.default.createElement("div", { className: `${classes.rbgcpControlBtnWrapper} ${classes.rbgcpControlInputWrap} ${classes.rbgcpStopInputWrap}`, style: { paddingLeft: 8 } },
        react_1.default.createElement(icon_js_1.StopIcon, null),
        react_1.default.createElement("input", { value: currentLeft, id: "rbgcp-stop-input", onChange: (e) => handleMove(e.target.value), className: `${classes.rbgcpControlInput} ${classes.rbgcpStopInput}` })));
};
const DegreePicker = () => {
    const { classes, degrees, onChange, value } = (0, context_js_1.usePicker)();
    const handleDegrees = (e) => {
        const newValue = (0, formatters_js_1.formatInputValues)(e.target.value, 0, 360);
        const remaining = value.split(/,(.+)/)[1];
        onChange(`linear-gradient(${newValue || 0}deg, ${remaining}`);
    };
    return (react_1.default.createElement("div", { className: `${classes.rbgcpControlBtnWrapper} ${classes.rbgcpControlInputWrap} ${classes.rbgcpDegreeInputWrap}` },
        react_1.default.createElement(icon_js_1.DegreesIcon, null),
        react_1.default.createElement("input", { value: degrees, id: "rbgcp-degree-input", onChange: (e) => handleDegrees(e), className: `${classes.rbgcpControlInput} ${classes.rbgcpDegreeInput}` }),
        react_1.default.createElement("div", { style: {
                position: 'absolute',
                right: degrees > 99 ? 0 : degrees < 10 ? 7 : 3,
                top: 1,
                fontWeight: 400,
                fontSize: 13,
            }, className: classes.rbgcpDegreeIcon }, "\u00B0")));
};
const DeleteBtn = () => {
    const { colors, classes, selectedColor, createGradientStr } = (0, context_js_1.usePicker)();
    const deletePoint = () => {
        if (colors?.length > 2) {
            const formatted = colors?.map((fc, i) => ({
                ...fc,
                value: i === selectedColor - 1 ? (0, formatters_js_2.high)(fc) : (0, formatters_js_2.low)(fc),
            }));
            const remaining = formatted?.filter((_, i) => i !== selectedColor);
            createGradientStr(remaining);
        }
    };
    return (react_1.default.createElement("div", { onClick: deletePoint, style: { width: 28 }, id: "rbgcp-point-delete-btn", className: (0, Controls_js_1.controlBtnStyles)(false, classes) },
        react_1.default.createElement(icon_js_1.default, null)));
};
const GradientControls = ({ hideGradientType, hideGradientAngle, hideGradientStop, }) => {
    const { gradientType, classes } = (0, context_js_1.usePicker)();
    return (react_1.default.createElement("div", { style: {
            marginTop: 12,
            marginBottom: -4,
            justifyContent: 'space-between',
            paddingLeft: hideGradientType ? 4 : 0,
        }, id: "rbgcp-gradient-controls-wrap", className: classes.rbgcpControlBtnWrapper },
        !hideGradientType && react_1.default.createElement(GradientType, null),
        react_1.default.createElement("div", { style: { width: 53 } }, !hideGradientAngle && gradientType === 'linear-gradient' && (react_1.default.createElement(DegreePicker, null))),
        !hideGradientStop && react_1.default.createElement(StopPicker, null),
        react_1.default.createElement(DeleteBtn, null)));
};
exports.default = GradientControls;
