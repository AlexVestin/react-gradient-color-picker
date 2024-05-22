import React, { useState } from 'react';
import { SlidersIcon, InputsIcon, PaletteIcon } from './icon.js';
import { usePicker } from '../context.js';
import EyeDropper from './EyeDropper.js';
import { config } from '../constants.js';
import AdvancedControls from './AdvancedControls.js';
import ComparibleColors from './ComparibleColors.js';
import GradientControls from './GradientControls.js';
var { defaultColor, defaultGradient } = config;
const Controls = ({ locales, hideEyeDrop, hideAdvancedSliders, hideColorGuide, hideInputType, hideColorTypeBtns, hideGradientControls, hideGradientType, hideGradientAngle, hideGradientStop, }) => {
    const { onChange, isGradient, handleChange, classes, previous } = usePicker();
    const [openComparibles, setOpenComparibles] = useState(false);
    const [openInputType, setOpenInputType] = useState(false);
    const [openAdvanced, setOpenAdvanced] = useState(false);
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
            return (React.createElement(GradientControls, { hideGradientType: hideGradientType, hideGradientAngle: hideGradientAngle, hideGradientStop: hideGradientStop }));
        }
        else {
            return null;
        }
    }
    else {
        return (React.createElement("div", { style: { paddingTop: 12, paddingBottom: 4 } },
            React.createElement("div", { style: { width: '100%' }, className: `${classes.ac} ${classes.jsb}` },
                React.createElement(ColorTypeBtns, { hideColorTypeBtns: hideColorTypeBtns, setGradient: setGradient, isGradient: isGradient, setSolid: setSolid, locales: locales }),
                !allRightControlsHidden && (React.createElement("div", { style: { display: noTools ? 'none' : '' }, className: classes.rbgcpControlBtnWrapper },
                    !hideEyeDrop && React.createElement(EyeDropper, { onSelect: handleChange }),
                    React.createElement("div", { id: "rbgcp-advanced-btn", onClick: () => setOpenAdvanced(!openAdvanced), className: controlBtnStyles(openAdvanced, classes), style: { display: hideAdvancedSliders ? 'none' : 'flex' } },
                        React.createElement(SlidersIcon, { color: openAdvanced ? '#568CF5' : '' })),
                    React.createElement("div", { id: "rbgcp-comparibles-btn", style: { display: hideColorGuide ? 'none' : 'flex' }, onClick: () => setOpenComparibles(!openComparibles), className: controlBtnStyles(openComparibles, classes) },
                        React.createElement(PaletteIcon, { color: openComparibles ? '#568CF5' : '' })),
                    React.createElement("div", { id: "rbgcp-color-model-btn", onClick: () => setOpenInputType(!openInputType), className: controlBtnStyles(openInputType, classes), style: { display: hideInputType ? 'none' : 'flex' } },
                        React.createElement(InputsIcon, { color: openInputType ? '#568CF5' : '' }),
                        React.createElement(InputTypeDropdown, { openInputType: openInputType, setOpenInputType: setOpenInputType }))))),
            !hideAdvancedSliders && (React.createElement(AdvancedControls, { openAdvanced: openAdvanced })),
            !hideColorGuide && (React.createElement(ComparibleColors, { openComparibles: openComparibles })),
            isGradient && !hideGradientControls && (React.createElement(GradientControls, { hideGradientType: hideGradientType, hideGradientAngle: hideGradientAngle, hideGradientStop: hideGradientStop }))));
    }
};
export default Controls;
const InputTypeDropdown = ({ openInputType, setOpenInputType, }) => {
    const { inputType, setInputType, classes } = usePicker();
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
    return (React.createElement("div", { style: {
            visibility: openInputType ? 'visible' : 'hidden',
            zIndex: openInputType ? '' : -100,
            opacity: openInputType ? 1 : 0,
            transition: `${oTrans}, ${vTrans}, ${zTrans}`,
        }, className: classes.rbgcpColorModelDropdown },
        React.createElement("div", { onClick: (e) => handleInputType(e, 'rgb'), className: modalBtnStyles(inputType === 'rgb', classes) }, "RGB"),
        React.createElement("div", { onClick: (e) => handleInputType(e, 'hsl'), className: modalBtnStyles(inputType === 'hsl', classes) }, "HSL"),
        React.createElement("div", { onClick: (e) => handleInputType(e, 'hsv'), className: modalBtnStyles(inputType === 'hsv', classes) }, "HSV"),
        React.createElement("div", { onClick: (e) => handleInputType(e, 'cmyk'), className: modalBtnStyles(inputType === 'cmyk', classes) }, "CMYK")));
};
const ColorTypeBtns = ({ hideColorTypeBtns, isGradient, setSolid, setGradient, locales, }) => {
    const { classes } = usePicker();
    if (hideColorTypeBtns) {
        return React.createElement("div", { style: { width: 1 } });
    }
    else {
        return (React.createElement("div", { className: classes.rbgcpControlBtnWrapper },
            React.createElement("div", { onClick: setSolid, id: "rbgcp-solid-btn", className: colorTypeBtnStyles(!isGradient, classes) }, locales?.CONTROLS?.SOLID),
            React.createElement("div", { onClick: setGradient, id: "rbgcp-gradient-btn", className: colorTypeBtnStyles(isGradient || false, classes) }, locales?.CONTROLS?.GRADIENT)));
    }
};
export const colorTypeBtnStyles = (selected, classes) => {
    if (selected) {
        return `${classes.rbgcpControlBtn} ${classes.rbgcpControlBtnSelected}`;
    }
    else {
        return classes.rbgcpControlBtn;
    }
};
export const controlBtnStyles = (selected, classes) => {
    if (selected) {
        return `${classes.rbgcpControlIconBtn} ${classes.rbgcpControlBtnSelected}`;
    }
    else {
        return classes.rbgcpControlIconBtn;
    }
};
export const modalBtnStyles = (selected, classes) => {
    if (selected) {
        return `${classes.rbgcpControlBtn} ${classes.rbgcpColorModelDropdownBtn} ${classes.rbgcpControlBtnSelected}`;
    }
    else {
        return `${classes.rbgcpControlBtn} ${classes.rbgcpColorModelDropdownBtn}`;
    }
};
