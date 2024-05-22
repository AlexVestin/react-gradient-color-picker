import React, { useRef } from 'react';
import PickerContextWrapper from '../context.js';
import Picker from './Picker.js';
import { defaultLocales } from '../constants.js';
import { objectToString } from '../utils/utils.js';
import coreCss from '../core.module.css';
export function ColorPicker({ value = 'rgba(175, 51, 242, 1)', onChange, hideControls = false, hideInputs = false, hideOpacity = false, hidePresets = false, hideHue = false, presets = [], hideEyeDrop = false, hideAdvancedSliders = false, hideColorGuide = false, hideInputType = false, hideColorTypeBtns = false, hideGradientType = false, hideGradientAngle = false, hideGradientStop = false, hideGradientControls = false, locales = defaultLocales, width = 294, height = 294, style = {}, className, }) {
    const safeValue = objectToString(value);
    const contRef = useRef(null);
    return (React.createElement("div", { ref: contRef, className: className, style: { ...style, width: width } },
        React.createElement(PickerContextWrapper, { value: safeValue, classes: coreCss, onChange: onChange, squareWidth: width, squareHeight: height, hideOpacity: hideOpacity },
            React.createElement(Picker, { hideControls: hideControls, hideInputs: hideInputs, hidePresets: hidePresets, hideOpacity: hideOpacity, hideHue: hideHue, presets: presets, hideEyeDrop: hideEyeDrop, hideAdvancedSliders: hideAdvancedSliders, hideColorGuide: hideColorGuide, hideInputType: hideInputType, hideColorTypeBtns: hideColorTypeBtns, hideGradientType: hideGradientType, hideGradientAngle: hideGradientAngle, hideGradientStop: hideGradientStop, hideGradientControls: hideGradientControls, locales: locales }))));
}
