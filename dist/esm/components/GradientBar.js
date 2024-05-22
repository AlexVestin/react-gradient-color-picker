import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getHandleValue, getHandleValueDomRect } from '../utils/utils.js';
import { usePicker } from '../context.js';
import { low, high } from '../utils/formatters.js';
const handleStyle = (isSelected) => {
    return {
        boxShadow: isSelected ? '0px 0px 5px 1px rgba(86, 140, 245,.95)' : '',
        border: isSelected ? '2px solid white' : '2px solid rgba(255,255,255,.75)',
    };
};
export const Handle = ({ left, i, setDragging, setInFocus, }) => {
    const { colors, selectedColor, squareWidth, classes, createGradientStr } = usePicker();
    const isSelected = selectedColor === i;
    const leftMultiplyer = (squareWidth - 18) / 100;
    const setSelectedColor = (index) => {
        const newGradStr = colors?.map((cc, i) => ({
            ...cc,
            value: i === index ? high(cc) : low(cc),
        }));
        createGradientStr(newGradStr);
    };
    const handleDown = (e) => {
        e.stopPropagation();
        setSelectedColor(i);
        setDragging(true);
    };
    const handleFocus = () => {
        // setInFocus('gpoint')
        setSelectedColor(i);
    };
    const handleBlur = () => {
        // setInFocus(null)
    };
    return (React.createElement("div", { tabIndex: 0, onBlur: handleBlur, onFocus: handleFocus, id: `gradient-handle-${i}`, onMouseDown: (e) => handleDown(e), className: classes.rbgcpGradientHandleWrap, style: { left: (left || 0) * leftMultiplyer } },
        React.createElement("div", { style: handleStyle(isSelected), className: classes.rbgcpGradientHandle }, isSelected && (React.createElement("div", { style: {
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: 'white',
            } })))));
};
const GradientBar = () => {
    const { currentColor, createGradientStr, colors, value, handleGradient, squareWidth, deletePoint, isGradient, selectedColor, } = usePicker();
    const [dragging, setDragging] = useState(false);
    const [inFocus, setInFocus] = useState(null);
    const containerRef = useRef(null);
    function force90degLinear(color) {
        return color.replace(/(radial|linear)-gradient\([^,]+,/, 'linear-gradient(90deg,');
    }
    const addPoint = (e) => {
        const left = getHandleValue(e);
        const newColors = [
            ...colors.map((c) => ({ ...c, value: low(c) })),
            { value: currentColor, left: left },
        ]?.sort((a, b) => a.left - b.left);
        createGradientStr(newColors);
    };
    const handleMove = useCallback((e) => {
        if (dragging && containerRef.current !== null) {
            handleGradient(currentColor, getHandleValueDomRect(e.clientX, containerRef.current.getBoundingClientRect()));
        }
    }, [currentColor, dragging, handleGradient]);
    useEffect(() => {
        const selectedEl = window?.document?.getElementById(`gradient-handle-${selectedColor}`);
        if (selectedEl) {
            selectedEl.focus();
        }
        document.body.addEventListener('mousemove', handleMove);
        return () => {
            document.body.removeEventListener('mousemove', handleMove);
        };
    }, [selectedColor, handleMove]);
    const stopDragging = () => {
        setDragging(false);
    };
    const handleDown = (e) => {
        if (!dragging) {
            addPoint(e);
            setDragging(true);
        }
    };
    const handleKeyboard = (e) => {
        if (isGradient) {
            if (e.keyCode === 8) {
                if (inFocus === 'gpoint') {
                    deletePoint();
                }
            }
        }
    };
    const handleUp = () => {
        stopDragging();
    };
    useEffect(() => {
        window.addEventListener('mouseup', handleUp);
        window?.addEventListener('keydown', handleKeyboard);
        return () => {
            window.removeEventListener('mouseup', handleUp);
            window?.removeEventListener('keydown', handleKeyboard);
        };
    });
    return (React.createElement("div", { style: {
            width: '100%',
            marginTop: 17,
            marginBottom: 4,
            position: 'relative',
        }, id: "gradient-bar" },
        React.createElement("div", { ref: containerRef, style: {
                width: squareWidth,
                height: 14,
                backgroundImage: force90degLinear(value),
                borderRadius: 10,
            }, onMouseDown: (e) => handleDown(e) }),
        colors?.map((c, i) => (React.createElement(Handle, { i: i, left: c.left, key: `${i}-${c}`, setInFocus: setInFocus, setDragging: setDragging })))));
};
export default GradientBar;
