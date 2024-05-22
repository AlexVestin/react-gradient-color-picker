import React, { useState, useRef, useEffect } from 'react';
import { usePicker } from '../context.js';
import { getHandleValue, getHandleValueDomRect } from '../utils/utils.js';
import { usePaintSat, usePaintLight, usePaintBright, } from '../hooks/usePaintHue.js';
import tinycolor from 'tinycolor2';
const AdvBar = ({ value, callback, reffy, openAdvanced, label, }) => {
    const { squareWidth, classes } = usePicker();
    const [dragging, setDragging] = useState(false);
    const [handleTop, setHandleTop] = useState(2);
    const containerRef = useRef(null);
    const left = value * (squareWidth - 18);
    useEffect(() => {
        setHandleTop(reffy?.current?.offsetTop - 2);
    }, [openAdvanced, reffy]);
    const stopDragging = () => {
        setDragging(false);
    };
    const handleClick = (e) => {
        if (!dragging) {
            callback(getHandleValue(e));
        }
    };
    const handleDown = () => {
        setDragging(true);
    };
    useEffect(() => {
        const handleUp = () => {
            stopDragging();
        };
        const handleMove = (e) => {
            if (dragging && containerRef.current !== null) {
                callback(getHandleValueDomRect(e.clientX, containerRef.current.getBoundingClientRect()));
            }
        };
        window.addEventListener('mouseup', handleUp);
        window.addEventListener('mousemove', handleMove);
        return () => {
            window.removeEventListener('mouseup', handleUp);
            window.removeEventListener('mousemove', handleMove);
        };
    }, []);
    return (React.createElement("div", { style: { width: '100%', padding: '3px 0px 3px 0px' } },
        React.createElement("div", { ref: containerRef, className: `${classes.cResize} ${classes.psRl}` },
            React.createElement("div", { style: { left, top: handleTop }, className: classes.rbgcpHandle, onMouseDown: handleDown, role: "button", tabIndex: 0 }),
            React.createElement("div", { style: {
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: 1,
                    position: 'absolute',
                    left: '50%',
                    transform: 'translate(-50%, 0%)',
                    top: handleTop + 2,
                    zIndex: 10,
                    textShadow: '1px 1px 1px rgba(0,0,0,.6)',
                }, onClick: (e) => handleClick(e) }, label),
            React.createElement("canvas", { ref: reffy, height: "14px", width: `${squareWidth}px`, onClick: (e) => handleClick(e), style: { position: 'relative', borderRadius: 14 } }))));
};
const AdvancedControls = ({ openAdvanced }) => {
    const { tinyColor, handleChange, squareWidth, hc } = usePicker();
    const { s, l } = tinyColor.toHsl();
    const satRef = useRef(null);
    const lightRef = useRef(null);
    const brightRef = useRef(null);
    usePaintSat(satRef, hc?.h, l * 100, squareWidth);
    usePaintLight(lightRef, hc?.h, s * 100, squareWidth);
    usePaintBright(brightRef, hc?.h, s * 100, squareWidth);
    const satDesat = (value) => {
        const { r, g, b } = tinycolor({ h: hc?.h, s: value / 100, l }).toRgb();
        handleChange(`rgba(${r},${g},${b},${hc?.a})`);
    };
    const setLight = (value) => {
        const { r, g, b } = tinycolor({ h: hc?.h, s, l: value / 100 }).toRgb();
        handleChange(`rgba(${r},${g},${b},${hc?.a})`);
    };
    const setBright = (value) => {
        const { r, g, b } = tinycolor({
            h: hc?.h,
            s: hc?.s * 100,
            v: value,
        }).toRgb();
        handleChange(`rgba(${r},${g},${b},${hc?.a})`);
    };
    return (React.createElement("div", { style: {
            height: openAdvanced ? 98 : 0,
            width: '100%',
            transition: 'all 120ms linear',
        } },
        React.createElement("div", { style: {
                paddingTop: 11,
                display: openAdvanced ? 'flex' : 'none',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: openAdvanced ? 98 : 0,
                overflow: 'hidden',
                transition: 'height 100ms linear',
            } },
            React.createElement(AdvBar, { value: s, reffy: satRef, callback: satDesat, openAdvanced: openAdvanced, label: "Saturation" }),
            React.createElement(AdvBar, { value: l, reffy: lightRef, label: "Lightness", callback: setLight, openAdvanced: openAdvanced }),
            React.createElement(AdvBar, { value: hc?.v, reffy: brightRef, label: "Brightness", callback: setBright, openAdvanced: openAdvanced }))));
};
export default AdvancedControls;
