"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useColorPicker = void 0;
const react_1 = require("react");
const utils_js_1 = require("../utils/utils.js");
const formatters_js_1 = require("../utils/formatters.js");
const converters_js_1 = require("../utils/converters.js");
const constants_js_1 = require("../constants.js");
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const { defaultColor, defaultGradient } = constants_js_1.config;
const useColorPicker = (value, onChange) => {
    const colors = (0, formatters_js_1.getColors)(value);
    const { degrees, degreeStr, isGradient, gradientType } = (0, utils_js_1.getDetails)(value);
    const { currentColor, selectedColor, currentLeft } = (0, utils_js_1.getColorObj)(colors);
    const [previousColors, setPreviousColors] = (0, react_1.useState)([]);
    const getGradientObject = () => {
        if (value) {
            if (isGradient) {
                return {
                    isGradient: true,
                    gradientType: gradientType,
                    degrees: degreeStr,
                    colors: colors?.map((c) => ({
                        ...c,
                        value: c.value?.toLowerCase(),
                    })),
                };
            }
            else {
                return {
                    isGradient: false,
                    gradientType: null,
                    degrees: null,
                    colors: colors?.map((c) => ({
                        ...c,
                        value: c.value?.toLowerCase(),
                    })),
                };
            }
        }
        else {
            console.log('RBGCP ERROR - YOU MUST PASS A VALUE AND CALLBACK TO THE useColorPicker HOOK');
        }
    };
    const tiny = (0, tinycolor2_1.default)(currentColor);
    const { r, g, b, a } = tiny.toRgb();
    const { h, s, l } = tiny.toHsl();
    (0, react_1.useEffect)(() => {
        if ((0, tinycolor2_1.default)(currentColor)?.isValid() && previousColors[0] !== currentColor) {
            // @ts-expect-error - currentColor type issue
            setPreviousColors([currentColor, ...previousColors.slice(0, 19)]);
        }
    }, [currentColor, previousColors]);
    const setLinear = () => {
        const remaining = value.split(/,(.+)/)[1];
        onChange(`linear-gradient(90deg, ${remaining}`);
    };
    const setRadial = () => {
        const remaining = value.split(/,(.+)/)[1];
        onChange(`radial-gradient(circle, ${remaining}`);
    };
    const setDegrees = (newDegrees) => {
        const remaining = value.split(/,(.+)/)[1];
        onChange(`linear-gradient(${(0, formatters_js_1.formatInputValues)(newDegrees, 0, 360)}deg, ${remaining}`);
        if (gradientType !== 'linear-gradient') {
            console.log('Warning: you are updating degrees when the gradient type is not linear. This will change the gradients type which may be undesired');
        }
    };
    const setSolid = (startingColor) => {
        const newValue = startingColor || defaultColor;
        onChange(newValue);
    };
    const setGradient = (startingGradiant) => {
        const newValue = startingGradiant || defaultGradient;
        onChange(newValue);
    };
    const createGradientStr = (newColors) => {
        const sorted = newColors.sort((a, b) => a.left - b.left);
        const colorString = sorted?.map((cc) => `${cc?.value} ${cc.left}%`);
        onChange(`${gradientType}(${degreeStr}, ${colorString.join(', ')})`);
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
            onChange(newColor);
        }
    };
    const setR = (newR) => {
        const newVal = (0, formatters_js_1.formatInputValues)(newR, 0, 255);
        handleChange(`rgba(${newVal}, ${g}, ${b}, ${a})`);
    };
    const setG = (newG) => {
        const newVal = (0, formatters_js_1.formatInputValues)(newG, 0, 255);
        handleChange(`rgba(${r}, ${newVal}, ${b}, ${a})`);
    };
    const setB = (newB) => {
        const newVal = (0, formatters_js_1.formatInputValues)(newB, 0, 255);
        handleChange(`rgba(${r}, ${g}, ${newVal}, ${a})`);
    };
    const setA = (newA) => {
        const newVal = (0, formatters_js_1.formatInputValues)(newA, 0, 100);
        handleChange(`rgba(${r}, ${g}, ${b}, ${newVal / 100})`);
    };
    const setHue = (newHue) => {
        const newVal = (0, formatters_js_1.formatInputValues)(newHue, 0, 360);
        const tinyNew = (0, tinycolor2_1.default)({ h: newVal, s: s, l: l });
        const { r, g, b } = tinyNew.toRgb();
        handleChange(`rgba(${r}, ${g}, ${b}, ${a})`);
    };
    const setSaturation = (newSat) => {
        const newVal = (0, formatters_js_1.formatInputValues)(newSat, 0, 100);
        const tinyNew = (0, tinycolor2_1.default)({ h: h, s: newVal / 100, l: l });
        const { r, g, b } = tinyNew.toRgb();
        handleChange(`rgba(${r}, ${g}, ${b}, ${a})`);
    };
    const setLightness = (newLight) => {
        const newVal = (0, formatters_js_1.formatInputValues)(newLight, 0, 100);
        const tinyNew = (0, tinycolor2_1.default)({ h: h, s: s, l: newVal / 100 });
        if (tinyNew?.isValid()) {
            const { r, g, b } = tinyNew.toRgb();
            handleChange(`rgba(${r}, ${g}, ${b}, ${a})`);
        }
        else {
            console.log('The new color was invalid, perhaps the lightness you passed in was a decimal? Please pass the new value between 0 - 100');
        }
    };
    const valueToHSL = () => {
        return tiny.toHslString();
    };
    const valueToHSV = () => {
        return tiny.toHsvString();
    };
    const valueToHex = () => {
        return tiny.toHexString();
    };
    const valueToCmyk = () => {
        const { c, m, y, k } = (0, converters_js_1.rgb2cmyk)(r, g, b);
        return `cmyk(${c}, ${m}, ${y}, ${k})`;
    };
    const setSelectedPoint = (index) => {
        if (isGradient) {
            const newGradStr = colors?.map((cc, i) => ({
                ...cc,
                value: i === index ? (0, formatters_js_1.high)(cc) : (0, formatters_js_1.low)(cc),
            }));
            createGradientStr(newGradStr);
        }
        else {
            console.log('This function is only relevant when the picker is in gradient mode');
        }
    };
    const addPoint = (left) => {
        const newColors = [
            ...colors.map((c) => ({ ...c, value: (0, formatters_js_1.low)(c) })),
            { value: currentColor, left: left },
        ];
        createGradientStr(newColors);
        if (!left) {
            console.log('You did not pass a stop value (left amount) for the new color point so it defaulted to 50');
        }
    };
    const deletePoint = (index) => {
        if (colors?.length > 2) {
            const pointToDelete = index || selectedColor;
            const remaining = colors?.filter((rc, i) => i !== pointToDelete);
            createGradientStr(remaining);
            if (!index) {
                console.log('You did not pass in the index of the point you wanted to delete so the function default to the currently selected point');
            }
        }
        else {
            console.log('A gradient must have atleast two colors, disable your delete button when necessary');
        }
    };
    const setPointLeft = (left) => {
        handleGradient(currentColor, (0, formatters_js_1.formatInputValues)(left, 0, 100));
    };
    const rgbaArr = [r, g, b, a];
    const hslArr = [h, s, l];
    return {
        setR,
        setG,
        setB,
        setA,
        setHue,
        addPoint,
        setSolid,
        setLinear,
        setRadial,
        valueToHSL,
        valueToHSV,
        valueToHex,
        valueToCmyk,
        setDegrees,
        setGradient,
        setLightness,
        setSaturation,
        setSelectedPoint,
        deletePoint,
        isGradient,
        gradientType,
        degrees,
        setPointLeft,
        currentLeft,
        rgbaArr,
        hslArr,
        handleChange,
        previousColors,
        getGradientObject,
        selectedPoint: selectedColor,
    };
};
exports.useColorPicker = useColorPicker;
