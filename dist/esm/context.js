import React, { createContext, useContext, useState, useEffect, } from 'react';
import { isUpperCase, getColorObj, getDetails } from './utils/utils.js';
import { low, high, getColors } from './utils/formatters.js';
import tinycolor from 'tinycolor2';
const PickerContext = createContext(null);
export default function PickerContextWrapper({ value, classes, children, onChange, squareWidth, hideOpacity, squareHeight, }) {
    const colors = getColors(value);
    const { degrees, degreeStr, isGradient, gradientType } = getDetails(value);
    const { currentColor, selectedColor, currentLeft } = getColorObj(colors);
    const [inputType, setInputType] = useState('rgb');
    const [previous, setPrevious] = useState({});
    const tinyColor = tinycolor(currentColor);
    const rgba = tinyColor.toRgb();
    const hsv = tinyColor.toHsv();
    const [hc, setHc] = useState({ ...rgba, ...hsv });
    useEffect(() => {
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
        const remaining = colors?.filter((c) => !isUpperCase(c.value));
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
                value: i === selectedColor - 1 ? high(fc) : low(fc),
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
    return (React.createElement(PickerContext.Provider, { value: pickerContext }, children));
}
export function usePicker() {
    const pickerContext = useContext(PickerContext);
    if (!pickerContext) {
        throw new Error('usePicker has to be used within <PickerContext.Provider>');
    }
    return pickerContext;
}
