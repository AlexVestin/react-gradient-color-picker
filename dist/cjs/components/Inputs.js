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
const react_1 = __importStar(require("react"));
const formatters_js_1 = require("../utils/formatters.js");
const converters_js_1 = require("../utils/converters.js");
const context_js_1 = require("../context.js");
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const Input = ({ value, callback, max = 100, label, }) => {
    const [temp, setTemp] = (0, react_1.useState)(value);
    const { hideOpacity, classes } = (0, context_js_1.usePicker)();
    const width = hideOpacity ? '22%' : '18%';
    (0, react_1.useEffect)(() => {
        setTemp(value);
    }, [value]);
    const onChange = (e) => {
        const newVal = (0, formatters_js_1.formatInputValues)(parseFloat(e.target.value), 0, max);
        setTemp(newVal);
        callback(newVal);
    };
    return (react_1.default.createElement("div", { style: { width: width } },
        react_1.default.createElement("input", { value: temp, id: "rbgcp-input", onChange: (e) => onChange(e), className: classes.rbgcpInput }),
        react_1.default.createElement("div", { className: classes.rbgcpInputLabel }, label)));
};
const HexInput = ({ opacity }) => {
    const { handleChange, tinyColor, classes } = (0, context_js_1.usePicker)();
    const [disable, setDisable] = (0, react_1.useState)('');
    const hex = tinyColor.toHex();
    const [newHex, setNewHex] = (0, react_1.useState)(hex);
    (0, react_1.useEffect)(() => {
        if (disable !== 'hex') {
            setNewHex(hex);
        }
    }, [tinyColor, disable, hex]);
    const hexFocus = () => {
        setDisable('hex');
    };
    const hexBlur = () => {
        setDisable('');
    };
    const handleHex = (e) => {
        const tinyHex = (0, tinycolor2_1.default)(e.target.value);
        setNewHex(e.target.value);
        if (tinyHex.isValid()) {
            const { r, g, b } = tinyHex.toRgb();
            const newColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            handleChange(newColor);
        }
    };
    return (react_1.default.createElement("div", { style: { width: '23%' } },
        react_1.default.createElement("input", { value: newHex, onBlur: hexBlur, onFocus: hexFocus, id: "rbgcp-hex-input", onChange: (e) => handleHex(e), className: `${classes.rbgcpInput} ${classes.rbgcpHexInput}` }),
        react_1.default.createElement("div", { className: classes.rbgcpInputLabel }, "HEX")));
};
const RGBInputs = () => {
    const { handleChange, hc } = (0, context_js_1.usePicker)();
    const handleRgb = ({ r, g, b }) => {
        handleChange(`rgba(${r}, ${g}, ${b}, ${hc?.a})`);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Input, { value: hc?.r, callback: (newVal) => handleRgb({ r: newVal, g: hc?.g, b: hc?.b }), label: "R", max: 255 }),
        react_1.default.createElement(Input, { value: hc?.g, callback: (newVal) => handleRgb({ r: hc?.r, g: newVal, b: hc?.b }), label: "G", max: 255 }),
        react_1.default.createElement(Input, { value: hc?.b, callback: (newVal) => handleRgb({ r: hc?.r, g: hc?.g, b: newVal }), label: "B", max: 255 })));
};
const HSLInputs = () => {
    const { handleChange, tinyColor, setHc, hc } = (0, context_js_1.usePicker)();
    const { s, l } = tinyColor.toHsl();
    const handleH = (h, s, l) => {
        const { r, g, b } = (0, tinycolor2_1.default)({ h: h, s: s, l: l }).toRgb();
        handleChange(`rgba(${r}, ${g}, ${b}, ${hc?.a})`);
        setHc({ ...hc, h });
    };
    const handleSl = (value) => {
        const { r, g, b } = (0, tinycolor2_1.default)(value).toRgb();
        handleChange(`rgba(${r}, ${g}, ${b}, ${hc?.a})`);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Input, { value: (0, formatters_js_1.round)(hc?.h), callback: (newVal) => handleH(newVal, s, l), label: "H", max: 360 }),
        react_1.default.createElement(Input, { value: (0, formatters_js_1.round)(s * 100), callback: (newVal) => handleSl({ h: hc?.h, s: newVal, l: l }), label: "S" }),
        react_1.default.createElement(Input, { value: (0, formatters_js_1.round)(l * 100), callback: (newVal) => handleSl({ h: hc?.h, s: s, l: newVal }), label: "L" })));
};
const HSVInputs = () => {
    const { handleChange, setHc, hc } = (0, context_js_1.usePicker)();
    const handleH = (h, s, v) => {
        const { r, g, b } = (0, tinycolor2_1.default)({ h: h, s: s, v: v }).toRgb();
        handleChange(`rgba(${r}, ${g}, ${b}, ${hc?.a})`);
        setHc({ ...hc, h });
    };
    const handleSV = (value) => {
        const { r, g, b } = (0, tinycolor2_1.default)(value).toRgb();
        handleChange(`rgba(${r}, ${g}, ${b}, ${hc?.a})`);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Input, { value: (0, formatters_js_1.round)(hc?.h), callback: (newVal) => handleH(newVal, hc?.s, hc?.v), label: "H", max: 360 }),
        react_1.default.createElement(Input, { value: (0, formatters_js_1.round)(hc?.s * 100), callback: (newVal) => handleSV({ h: hc?.h, s: newVal, v: hc?.v }), label: "S" }),
        react_1.default.createElement(Input, { value: (0, formatters_js_1.round)(hc?.v * 100), callback: (newVal) => handleSV({ h: hc?.h, s: hc?.s, v: newVal }), label: "V" })));
};
const CMKYInputs = () => {
    const { handleChange, hc } = (0, context_js_1.usePicker)();
    const { c, m, y, k } = (0, converters_js_1.rgb2cmyk)(hc?.r, hc?.g, hc?.b);
    const handleCmyk = (value) => {
        const { r, g, b } = (0, converters_js_1.cmykToRgb)(value);
        handleChange(`rgba(${r}, ${g}, ${b}, ${hc?.a})`);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Input, { value: (0, formatters_js_1.round)(c * 100), callback: (newVal) => handleCmyk({ c: newVal / 100, m: m, y: y, k: k }), label: "C" }),
        react_1.default.createElement(Input, { value: (0, formatters_js_1.round)(m * 100), callback: (newVal) => handleCmyk({ c: c, m: newVal / 100, y: y, k: k }), label: "M" }),
        react_1.default.createElement(Input, { value: (0, formatters_js_1.round)(y * 100), callback: (newVal) => handleCmyk({ c: c, m: m, y: newVal / 100, k: k }), label: "Y" }),
        react_1.default.createElement(Input, { value: (0, formatters_js_1.round)(k * 100), callback: (newVal) => handleCmyk({ c: c, m: m, y: y, k: newVal / 100 }), label: "K" })));
};
const Inputs = () => {
    const { handleChange, inputType, hideOpacity, hc, classes } = (0, context_js_1.usePicker)();
    return (react_1.default.createElement("div", { style: {
            paddingTop: 14,
            display: 'flex',
            justifyContent: 'space-between',
        }, id: "rbgcp-inputs-wrap", className: classes.rbgcpInputsWrap },
        inputType !== 'cmyk' && react_1.default.createElement(HexInput, { opacity: hc?.a }),
        inputType === 'hsl' && react_1.default.createElement(HSLInputs, null),
        inputType === 'rgb' && react_1.default.createElement(RGBInputs, null),
        inputType === 'hsv' && react_1.default.createElement(HSVInputs, null),
        inputType === 'cmyk' && react_1.default.createElement(CMKYInputs, null),
        !hideOpacity && (react_1.default.createElement(Input, { value: Math.round(hc?.a * 100), callback: (newVal) => handleChange(`rgba(${hc?.r}, ${hc?.g}, ${hc?.b}, ${newVal / 100})`), label: "A" }))));
};
exports.default = Inputs;
