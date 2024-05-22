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
exports.modalBtnStyles = exports.controlBtnStyles = exports.colorTypeBtnStyles = void 0;
const react_1 = __importStar(require("react"));
const icon_js_1 = require("./icon.js");
const context_js_1 = require("../context.js");
const EyeDropper_js_1 = __importDefault(require("./EyeDropper.js"));
const constants_js_1 = require("../constants.js");
const AdvancedControls_js_1 = __importDefault(require("./AdvancedControls.js"));
const ComparibleColors_js_1 = __importDefault(require("./ComparibleColors.js"));
const GradientControls_js_1 = __importDefault(require("./GradientControls.js"));
var { defaultColor, defaultGradient } = constants_js_1.config;
const Controls = ({ locales, hideEyeDrop, hideAdvancedSliders, hideColorGuide, hideInputType, hideColorTypeBtns, hideGradientControls, hideGradientType, hideGradientAngle, hideGradientStop, }) => {
    const { onChange, isGradient, handleChange, classes, previous } = (0, context_js_1.usePicker)();
    const [openComparibles, setOpenComparibles] = (0, react_1.useState)(false);
    const [openInputType, setOpenInputType] = (0, react_1.useState)(false);
    const [openAdvanced, setOpenAdvanced] = (0, react_1.useState)(false);
    const noTools = hideEyeDrop && hideAdvancedSliders && hideColorGuide && hideInputType;
    const solidColor = previous?.color || defaultColor;
    const gradientColor = previous?.gradient || defaultGradient;
    const setSolid = () => {
        onChange(solidColor);
    };
    const setGradient = () => {
        onChange(gradientColor);
    };
    const allRightControlsHidden = hideEyeDrop && hideAdvancedSliders && hideColorGuide && hideInputType;
    const allControlsHidden = allRightControlsHidden && hideColorTypeBtns;
    if (allControlsHidden) {
        if (isGradient && !hideGradientControls) {
            return (react_1.default.createElement(GradientControls_js_1.default, { hideGradientType: hideGradientType, hideGradientAngle: hideGradientAngle, hideGradientStop: hideGradientStop }));
        }
        else {
            return null;
        }
    }
    else {
        return (react_1.default.createElement("div", { style: { paddingTop: 12, paddingBottom: 4 } },
            react_1.default.createElement("div", { style: { width: '100%' }, className: `${classes.ac} ${classes.jsb}` },
                react_1.default.createElement(ColorTypeBtns, { hideColorTypeBtns: hideColorTypeBtns, setGradient: setGradient, isGradient: isGradient, setSolid: setSolid, locales: locales }),
                !allRightControlsHidden && (react_1.default.createElement("div", { style: { display: noTools ? 'none' : '' }, className: classes.rbgcpControlBtnWrapper },
                    !hideEyeDrop && react_1.default.createElement(EyeDropper_js_1.default, { onSelect: handleChange }),
                    react_1.default.createElement("div", { id: "rbgcp-advanced-btn", onClick: () => setOpenAdvanced(!openAdvanced), className: (0, exports.controlBtnStyles)(openAdvanced, classes), style: { display: hideAdvancedSliders ? 'none' : 'flex' } },
                        react_1.default.createElement(icon_js_1.SlidersIcon, { color: openAdvanced ? '#568CF5' : '' })),
                    react_1.default.createElement("div", { id: "rbgcp-comparibles-btn", style: { display: hideColorGuide ? 'none' : 'flex' }, onClick: () => setOpenComparibles(!openComparibles), className: (0, exports.controlBtnStyles)(openComparibles, classes) },
                        react_1.default.createElement(icon_js_1.PaletteIcon, { color: openComparibles ? '#568CF5' : '' })),
                    react_1.default.createElement("div", { id: "rbgcp-color-model-btn", onClick: () => setOpenInputType(!openInputType), className: (0, exports.controlBtnStyles)(openInputType, classes), style: { display: hideInputType ? 'none' : 'flex' } },
                        react_1.default.createElement(icon_js_1.InputsIcon, { color: openInputType ? '#568CF5' : '' }),
                        react_1.default.createElement(InputTypeDropdown, { openInputType: openInputType, setOpenInputType: setOpenInputType }))))),
            !hideAdvancedSliders && (react_1.default.createElement(AdvancedControls_js_1.default, { openAdvanced: openAdvanced })),
            !hideColorGuide && (react_1.default.createElement(ComparibleColors_js_1.default, { openComparibles: openComparibles })),
            isGradient && !hideGradientControls && (react_1.default.createElement(GradientControls_js_1.default, { hideGradientType: hideGradientType, hideGradientAngle: hideGradientAngle, hideGradientStop: hideGradientStop }))));
    }
};
exports.default = Controls;
const InputTypeDropdown = ({ openInputType, setOpenInputType, }) => {
    const { inputType, setInputType, classes } = (0, context_js_1.usePicker)();
    const vTrans = openInputType
        ? 'visibility 0ms linear'
        : 'visibility 100ms linear 150ms';
    const zTrans = openInputType
        ? 'z-index 0ms linear'
        : 'z-index 100ms linear 150ms';
    const oTrans = openInputType
        ? 'opacity 120ms linear'
        : 'opacity 150ms linear 50ms';
    const handleInputType = (e, val) => {
        if (openInputType) {
            e.stopPropagation();
            setInputType(val);
            setOpenInputType(false);
        }
    };
    return (react_1.default.createElement("div", { style: {
            visibility: openInputType ? 'visible' : 'hidden',
            zIndex: openInputType ? '' : -100,
            opacity: openInputType ? 1 : 0,
            transition: `${oTrans}, ${vTrans}, ${zTrans}`,
        }, className: classes.rbgcpColorModelDropdown },
        react_1.default.createElement("div", { onClick: (e) => handleInputType(e, 'rgb'), className: (0, exports.modalBtnStyles)(inputType === 'rgb', classes) }, "RGB"),
        react_1.default.createElement("div", { onClick: (e) => handleInputType(e, 'hsl'), className: (0, exports.modalBtnStyles)(inputType === 'hsl', classes) }, "HSL"),
        react_1.default.createElement("div", { onClick: (e) => handleInputType(e, 'hsv'), className: (0, exports.modalBtnStyles)(inputType === 'hsv', classes) }, "HSV"),
        react_1.default.createElement("div", { onClick: (e) => handleInputType(e, 'cmyk'), className: (0, exports.modalBtnStyles)(inputType === 'cmyk', classes) }, "CMYK")));
};
const ColorTypeBtns = ({ hideColorTypeBtns, isGradient, setSolid, setGradient, locales, }) => {
    const { classes } = (0, context_js_1.usePicker)();
    if (hideColorTypeBtns) {
        return react_1.default.createElement("div", { style: { width: 1 } });
    }
    else {
        return (react_1.default.createElement("div", { className: classes.rbgcpControlBtnWrapper },
            react_1.default.createElement("div", { onClick: setSolid, id: "rbgcp-solid-btn", className: (0, exports.colorTypeBtnStyles)(!isGradient, classes) }, locales?.CONTROLS?.SOLID),
            react_1.default.createElement("div", { onClick: setGradient, id: "rbgcp-gradient-btn", className: (0, exports.colorTypeBtnStyles)(isGradient || false, classes) }, locales?.CONTROLS?.GRADIENT)));
    }
};
const colorTypeBtnStyles = (selected, classes) => {
    if (selected) {
        return `${classes.rbgcpControlBtn} ${classes.rbgcpControlBtnSelected}`;
    }
    else {
        return classes.rbgcpControlBtn;
    }
};
exports.colorTypeBtnStyles = colorTypeBtnStyles;
const controlBtnStyles = (selected, classes) => {
    if (selected) {
        return `${classes.rbgcpControlIconBtn} ${classes.rbgcpControlBtnSelected}`;
    }
    else {
        return classes.rbgcpControlIconBtn;
    }
};
exports.controlBtnStyles = controlBtnStyles;
const modalBtnStyles = (selected, classes) => {
    if (selected) {
        return `${classes.rbgcpControlBtn} ${classes.rbgcpColorModelDropdownBtn} ${classes.rbgcpControlBtnSelected}`;
    }
    else {
        return `${classes.rbgcpControlBtn} ${classes.rbgcpColorModelDropdownBtn}`;
    }
};
exports.modalBtnStyles = modalBtnStyles;
