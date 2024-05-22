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
const react_1 = __importStar(require("react"));
const context_js_1 = require("../context.js");
const utils_js_1 = require("../utils/utils.js");
const Opacity = () => {
    const { handleChange, hc = {}, squareWidth, classes } = (0, context_js_1.usePicker)();
    const [dragging, setDragging] = (0, react_1.useState)(false);
    const { r, g, b } = hc;
    const bg = `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(${r},${g},${b},.5) 100%)`;
    const stopDragging = () => {
        setDragging(false);
    };
    const handleDown = () => {
        setDragging(true);
    };
    const handleOpacity = (e) => {
        const newO = (0, utils_js_1.getHandleValue)(e) / 100;
        const newColor = `rgba(${r}, ${g}, ${b}, ${newO})`;
        handleChange(newColor);
    };
    const handleMove = (e) => {
        if (dragging) {
            handleOpacity(e);
        }
    };
    const handleClick = (e) => {
        if (!dragging) {
            handleOpacity(e);
        }
    };
    const left = squareWidth - 18;
    (0, react_1.useEffect)(() => {
        const handleUp = () => {
            stopDragging();
        };
        window.addEventListener('mouseup', handleUp);
        return () => {
            window.removeEventListener('mouseup', handleUp);
        };
    }, []);
    return (react_1.default.createElement("div", { onMouseDown: handleDown, onMouseMove: (e) => handleMove(e), style: {
            height: 14,
            marginTop: 17,
            marginBottom: 4,
            cursor: 'ew-resize',
            position: 'relative',
        } },
        react_1.default.createElement("div", { style: { width: '100%', height: 14 }, className: classes.rbgcpCheckered }),
        react_1.default.createElement("div", { style: { left: left * hc?.a, top: -2 }, className: classes.rbgcpHandle }),
        react_1.default.createElement("div", { style: { background: bg }, onClick: (e) => handleClick(e), className: classes.rbgcpOpacityOverlay })));
};
exports.default = Opacity;
