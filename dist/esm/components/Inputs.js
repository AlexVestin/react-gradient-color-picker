import React, { useState, useEffect } from 'react';
import { formatInputValues, round } from '../utils/formatters.js';
import { rgb2cmyk, cmykToRgb } from '../utils/converters.js';
import { usePicker } from '../context.js';
import tc from 'tinycolor2';
const Input = ({ value, callback, max = 100, label, }) => {
    const [temp, setTemp] = useState(value);
    const { hideOpacity, classes } = usePicker();
    const width = hideOpacity ? '22%' : '18%';
    useEffect(() => {
        setTemp(value);
    }, [value]);
    const onChange = (e) => {
        const newVal = formatInputValues(parseFloat(e.target.value), 0, max);
        setTemp(newVal);
        callback(newVal);
    };
    return (React.createElement("div", { style: { width: width } },
        React.createElement("input", { value: temp, id: "rbgcp-input", onChange: (e) => onChange(e), className: classes.rbgcpInput }),
        React.createElement("div", { className: classes.rbgcpInputLabel }, label)));
};
const HexInput = ({ opacity }) => {
    const { handleChange, tinyColor, classes } = usePicker();
    const [disable, setDisable] = useState('');
    const hex = tinyColor.toHex();
    const [newHex, setNewHex] = useState(hex);
    useEffect(() => {
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
        const tinyHex = tc(e.target.value);
        setNewHex(e.target.value);
        if (tinyHex.isValid()) {
            const { r, g, b } = tinyHex.toRgb();
            const newColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
            handleChange(newColor);
        }
    };
    return (React.createElement("div", { style: { width: '23%' } },
        React.createElement("input", { value: newHex, onBlur: hexBlur, onFocus: hexFocus, id: "rbgcp-hex-input", onChange: (e) => handleHex(e), className: `${classes.rbgcpInput} ${classes.rbgcpHexInput}` }),
        React.createElement("div", { className: classes.rbgcpInputLabel }, "HEX")));
};
const RGBInputs = () => {
    const { handleChange, hc } = usePicker();
    const handleRgb = ({ r, g, b }) => {
        handleChange(`rgba(${r}, ${g}, ${b}, ${hc?.a})`);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Input, { value: hc?.r, callback: (newVal) => handleRgb({ r: newVal, g: hc?.g, b: hc?.b }), label: "R", max: 255 }),
        React.createElement(Input, { value: hc?.g, callback: (newVal) => handleRgb({ r: hc?.r, g: newVal, b: hc?.b }), label: "G", max: 255 }),
        React.createElement(Input, { value: hc?.b, callback: (newVal) => handleRgb({ r: hc?.r, g: hc?.g, b: newVal }), label: "B", max: 255 })));
};
const HSLInputs = () => {
    const { handleChange, tinyColor, setHc, hc } = usePicker();
    const { s, l } = tinyColor.toHsl();
    const handleH = (h, s, l) => {
        const { r, g, b } = tc({ h: h, s: s, l: l }).toRgb();
        handleChange(`rgba(${r}, ${g}, ${b}, ${hc?.a})`);
        setHc({ ...hc, h });
    };
    const handleSl = (value) => {
        const { r, g, b } = tc(value).toRgb();
        handleChange(`rgba(${r}, ${g}, ${b}, ${hc?.a})`);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Input, { value: round(hc?.h), callback: (newVal) => handleH(newVal, s, l), label: "H", max: 360 }),
        React.createElement(Input, { value: round(s * 100), callback: (newVal) => handleSl({ h: hc?.h, s: newVal, l: l }), label: "S" }),
        React.createElement(Input, { value: round(l * 100), callback: (newVal) => handleSl({ h: hc?.h, s: s, l: newVal }), label: "L" })));
};
const HSVInputs = () => {
    const { handleChange, setHc, hc } = usePicker();
    const handleH = (h, s, v) => {
        const { r, g, b } = tc({ h: h, s: s, v: v }).toRgb();
        handleChange(`rgba(${r}, ${g}, ${b}, ${hc?.a})`);
        setHc({ ...hc, h });
    };
    const handleSV = (value) => {
        const { r, g, b } = tc(value).toRgb();
        handleChange(`rgba(${r}, ${g}, ${b}, ${hc?.a})`);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Input, { value: round(hc?.h), callback: (newVal) => handleH(newVal, hc?.s, hc?.v), label: "H", max: 360 }),
        React.createElement(Input, { value: round(hc?.s * 100), callback: (newVal) => handleSV({ h: hc?.h, s: newVal, v: hc?.v }), label: "S" }),
        React.createElement(Input, { value: round(hc?.v * 100), callback: (newVal) => handleSV({ h: hc?.h, s: hc?.s, v: newVal }), label: "V" })));
};
const CMKYInputs = () => {
    const { handleChange, hc } = usePicker();
    const { c, m, y, k } = rgb2cmyk(hc?.r, hc?.g, hc?.b);
    const handleCmyk = (value) => {
        const { r, g, b } = cmykToRgb(value);
        handleChange(`rgba(${r}, ${g}, ${b}, ${hc?.a})`);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Input, { value: round(c * 100), callback: (newVal) => handleCmyk({ c: newVal / 100, m: m, y: y, k: k }), label: "C" }),
        React.createElement(Input, { value: round(m * 100), callback: (newVal) => handleCmyk({ c: c, m: newVal / 100, y: y, k: k }), label: "M" }),
        React.createElement(Input, { value: round(y * 100), callback: (newVal) => handleCmyk({ c: c, m: m, y: newVal / 100, k: k }), label: "Y" }),
        React.createElement(Input, { value: round(k * 100), callback: (newVal) => handleCmyk({ c: c, m: m, y: y, k: newVal / 100 }), label: "K" })));
};
const Inputs = () => {
    const { handleChange, inputType, hideOpacity, hc, classes } = usePicker();
    return (React.createElement("div", { style: {
            paddingTop: 14,
            display: 'flex',
            justifyContent: 'space-between',
        }, id: "rbgcp-inputs-wrap", className: classes.rbgcpInputsWrap },
        inputType !== 'cmyk' && React.createElement(HexInput, { opacity: hc?.a }),
        inputType === 'hsl' && React.createElement(HSLInputs, null),
        inputType === 'rgb' && React.createElement(RGBInputs, null),
        inputType === 'hsv' && React.createElement(HSVInputs, null),
        inputType === 'cmyk' && React.createElement(CMKYInputs, null),
        !hideOpacity && (React.createElement(Input, { value: Math.round(hc?.a * 100), callback: (newVal) => handleChange(`rgba(${hc?.r}, ${hc?.g}, ${hc?.b}, ${newVal / 100})`), label: "A" }))));
};
export default Inputs;
