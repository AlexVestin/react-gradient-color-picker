import React from 'react';
import Hue from './Hue.js';
import Inputs from './Inputs.js';
import Square from './Square.js';
import Opacity from './Opacity.js';
import Presets from './Presets.js';
import Controls from './Controls.js';
import { usePicker } from '../context.js';
import GradientBar from './GradientBar.js';
const Picker = ({ locales, presets, hideHue, hideInputs, hidePresets, hideOpacity, hideEyeDrop, hideControls, hideInputType, hideColorGuide, hideGradientType, hideGradientStop, hideGradientAngle, hideColorTypeBtns, hideAdvancedSliders, hideGradientControls, }) => {
    const { isGradient } = usePicker();
    return (React.createElement("div", { style: { userSelect: 'none' }, id: "rbgcp-wrapper" },
        React.createElement(Square, null),
        !hideControls && (React.createElement(Controls, { locales: locales, hideEyeDrop: hideEyeDrop, hideInputType: hideInputType, hideColorGuide: hideColorGuide, hideGradientType: hideGradientType, hideGradientStop: hideGradientStop, hideColorTypeBtns: hideColorTypeBtns, hideGradientAngle: hideGradientAngle, hideAdvancedSliders: hideAdvancedSliders, hideGradientControls: hideGradientControls })),
        isGradient && React.createElement(GradientBar, null),
        !hideHue && React.createElement(Hue, null),
        !hideOpacity && React.createElement(Opacity, null),
        !hideInputs && React.createElement(Inputs, null),
        !hidePresets && React.createElement(Presets, { presets: presets })));
};
export default Picker;
