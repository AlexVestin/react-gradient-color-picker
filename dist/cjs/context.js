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
exports.usePicker = void 0;
const react_1 = __importStar(require("react"));
const utils_js_1 = require("./utils/utils.js");
const formatters_js_1 = require("./utils/formatters.js");
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const PickerContext = (0, react_1.createContext)(null);
function PickerContextWrapper({ value, classes, children, onChange, squareWidth, hideOpacity, squareHeight, }) {
    const colors = (0, formatters_js_1.getColors)(value);
    const { degrees, degreeStr, isGradient, gradientType } = (0, utils_js_1.getDetails)(value);
    const { currentColor, selectedColor, currentLeft } = (0, utils_js_1.getColorObj)(colors);
    const [inputType, setInputType] = (0, react_1.useState)('rgb');
    const [previous, setPrevious] = (0, react_1.useState)({});
    const tinyColor = (0, tinycolor2_1.default)(currentColor);
    const rgba = tinyColor.toRgb();
    const hsv = tinyColor.toHsv();
    const [hc, setHc] = (0, react_1.useState)({ ...rgba, ...hsv });
    (0, react_1.useEffect)(() => {
        if (hsv?.s === 0) {
            setHc({ ...rgba, ...hsv, h: hc?.h });
        }
        else {
            setHc({ ...rgba, ...hsv });
        }
    }, [currentColor]);
    const createGradientStr = (newColors) => {
        const sorted = newColors.sort((a, b) => a.left - b.left);
        const colorString = sorted?.map((cc) => `${cc?.value} ${cc.left}%`);
        const newGrade = `${gradientType}(${degreeStr}, ${colorString.join(', ')})`;
        setPrevious({ ...previous, gradient: newGrade });
        onChange(newGrade);
    };
    const handleGradient = (newColor, left) => {
        const remaining = colors?.filter((c) => !(0, utils_js_1.isUpperCase)(c.value));
        const newColors = [
            { value: newColor.toUpperCase(), left: left || currentLeft },
            ...remaining,
        ];
        createGradientStr(newColors);
    };
    const handleChange = (newColor) => {
        if (isGradient) {
            handleGradient(newColor);
        }
        else {
            setPrevious({ ...previous, color: newColor });
            onChange(newColor);
        }
    };
    const deletePoint = () => {
        if (colors?.length > 2) {
            const formatted = colors?.map((fc, i) => ({
                ...fc,
                value: i === selectedColor - 1 ? (0, formatters_js_1.high)(fc) : (0, formatters_js_1.low)(fc),
            }));
            const remaining = formatted?.filter((_, i) => i !== selectedColor);
            createGradientStr(remaining);
        }
    };
    const pickerContext = {
        hc,
        setHc,
        value,
        colors,
        degrees,
        classes,
        onChange,
        previous,
        inputType,
        tinyColor,
        isGradient,
        squareWidth,
        hideOpacity,
        currentLeft,
        deletePoint,
        squareHeight,
        setInputType,
        gradientType,
        handleChange,
        currentColor,
        selectedColor,
        handleGradient,
        createGradientStr,
    };
    return (react_1.default.createElement(PickerContext.Provider, { value: pickerContext }, children));
}
exports.default = PickerContextWrapper;
function usePicker() {
    const pickerContext = (0, react_1.useContext)(PickerContext);
    if (!pickerContext) {
        throw new Error('usePicker has to be used within <PickerContext.Provider>');
    }
    return pickerContext;
}
exports.usePicker = usePicker;
