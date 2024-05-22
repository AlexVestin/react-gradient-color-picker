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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handle = void 0;
const react_1 = __importStar(require("react"));
const utils_js_1 = require("../utils/utils.js");
const context_js_1 = require("../context.js");
const formatters_js_1 = require("../utils/formatters.js");
const handleStyle = (isSelected) => {
    return {
        boxShadow: isSelected ? '0px 0px 5px 1px rgba(86, 140, 245,.95)' : '',
        border: isSelected ? '2px solid white' : '2px solid rgba(255,255,255,.75)',
    };
};
const Handle = ({ left, i, setDragging, setInFocus, }) => {
    const { colors, selectedColor, squareWidth, classes, createGradientStr } = (0, context_js_1.usePicker)();
    const isSelected = selectedColor === i;
    const leftMultiplyer = (squareWidth - 18) / 100;
    const setSelectedColor = (index) => {
        const newGradStr = colors?.map((cc, i) => ({
            ...cc,
            value: i === index ? (0, formatters_js_1.high)(cc) : (0, formatters_js_1.low)(cc),
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
    return (react_1.default.createElement("div", { tabIndex: 0, onBlur: handleBlur, onFocus: handleFocus, id: `gradient-handle-${i}`, onMouseDown: (e) => handleDown(e), className: classes.rbgcpGradientHandleWrap, style: { left: (left || 0) * leftMultiplyer } },
        react_1.default.createElement("div", { style: handleStyle(isSelected), className: classes.rbgcpGradientHandle }, isSelected && (react_1.default.createElement("div", { style: {
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: 'white',
            } })))));
};
exports.Handle = Handle;
const GradientBar = () => {
    const { currentColor, createGradientStr, colors, value, handleGradient, squareWidth, deletePoint, isGradient, selectedColor, } = (0, context_js_1.usePicker)();
    const [dragging, setDragging] = (0, react_1.useState)(false);
    const [inFocus, setInFocus] = (0, react_1.useState)(null);
    const containerRef = (0, react_1.useRef)(null);
    function force90degLinear(color) {
        return color.replace(/(radial|linear)-gradient\([^,]+,/, 'linear-gradient(90deg,');
    }
    const addPoint = (e) => {
        const left = (0, utils_js_1.getHandleValue)(e);
        const newColors = [
            ...colors.map((c) => ({ ...c, value: (0, formatters_js_1.low)(c) })),
            { value: currentColor, left: left },
        ]?.sort((a, b) => a.left - b.left);
        createGradientStr(newColors);
    };
    const handleMove = (0, react_1.useCallback)((e) => {
        if (dragging && containerRef.current !== null) {
            handleGradient(currentColor, (0, utils_js_1.getHandleValueDomRect)(e.clientX, containerRef.current.getBoundingClientRect()));
        }
    }, [currentColor, dragging, handleGradient]);
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(() => {
        window.addEventListener('mouseup', handleUp);
        window?.addEventListener('keydown', handleKeyboard);
        return () => {
            window.removeEventListener('mouseup', handleUp);
            window?.removeEventListener('keydown', handleKeyboard);
        };
    });
    return (react_1.default.createElement("div", { style: {
            width: '100%',
            marginTop: 17,
            marginBottom: 4,
            position: 'relative',
        }, id: "gradient-bar" },
        react_1.default.createElement("div", { ref: containerRef, style: {
                width: squareWidth,
                height: 14,
                backgroundImage: force90degLinear(value),
                borderRadius: 10,
            }, onMouseDown: (e) => handleDown(e) }),
        colors?.map((c, i) => (react_1.default.createElement(exports.Handle, { i: i, left: c.left, key: `${i}-${c}`, setInFocus: setInFocus, setDragging: setDragging })))));
};
exports.default = GradientBar;
