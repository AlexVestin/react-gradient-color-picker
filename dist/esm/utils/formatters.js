import { config } from '../constants.js';
import { gradientParser } from './gradientParser.js';
const { defaultColor, defaultGradient } = config;
export const low = (color) => {
    return color.value.toLowerCase();
};
export const high = (color) => {
    return color.value.toUpperCase();
};
export const getColors = (value) => {
    const isGradient = value?.includes('gradient');
    if (isGradient) {
        const isConic = value?.includes('conic');
        const safeValue = !isConic ? value : defaultGradient;
        if (isConic) {
            console.log('Sorry we cant handle conic gradients yet');
        }
        const obj = gradientParser(safeValue);
        return obj?.colorStops;
    }
    else {
        const safeValue = value || defaultColor;
        return [{ value: safeValue }];
    }
};
export const formatInputValues = (value, min, max) => {
    return isNaN(value) ? min : value < min ? min : value > max ? max : value;
};
export const round = (val) => {
    return Math.round(val);
};
