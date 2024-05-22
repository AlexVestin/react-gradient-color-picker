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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const context_js_1 = require("../context.js");
const usePaintHue_js_1 = __importDefault(require("../hooks/usePaintHue.js"));
const utils_js_1 = require("../utils/utils.js");
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const Hue = () => {
    const barRef = (0, react_1.useRef)(null);
    const { handleChange, squareWidth, hc, setHc } = (0, context_js_1.usePicker)();
    const [dragging, setDragging] = (0, react_1.useState)(false);
    const containerRef = (0, react_1.useRef)(null);
    (0, usePaintHue_js_1.default)(barRef, squareWidth);
    const stopDragging = () => {
        setDragging(false);
    };
    const handleDown = () => {
        setDragging(true);
    };
    const handleHue = (0, react_1.useCallback)((newHue) => {
        // const newHue = getHandleValue(e) * 3.6
        const tinyHsv = (0, tinycolor2_1.default)({ h: newHue, s: hc?.s, v: hc?.v });
        const { r, g, b } = tinyHsv.toRgb();
        handleChange(`rgba(${r}, ${g}, ${b}, ${hc.a})`);
        setHc({ ...hc, h: newHue });
    }, [handleChange, hc, setHc]);
    const handleClick = (e) => {
        if (!dragging) {
            handleHue((0, utils_js_1.getHandleValue)(e) * 3.6);
        }
    };
    (0, react_1.useEffect)(() => {
        const handleUp = () => {
            stopDragging();
        };
        const handleMove = (e) => {
            if (dragging && containerRef.current !== null) {
                handleHue((0, utils_js_1.getHandleValueDomRect)(e.clientX, containerRef.current.getBoundingClientRect()) * 3.6);
            }
        };
        window.addEventListener('mouseup', handleUp);
        window.addEventListener('mousemove', handleMove);
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mousemove', handleUp);
        };
    }, [dragging, handleHue]);
    return (react_1.default.createElement("div", { ref: containerRef, style: {
            height: 14,
            marginTop: 17,
            marginBottom: 4,
            cursor: 'ew-resize',
            position: 'relative',
        } },
        react_1.default.createElement("div", { role: "button", style: {
                border: '2px solid white',
                borderRadius: '50%',
                boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)',
                width: '18px',
                height: '18px',
                zIndex: 1000,
                transition: 'all 10ms linear',
                position: 'absolute',
                left: hc?.h * ((squareWidth - 18) / 360),
                top: -2,
                cursor: 'ew-resize',
                boxSizing: 'border-box',
            }, onMouseDown: handleDown }),
        react_1.default.createElement("canvas", { ref: barRef, height: "14px", width: `${squareWidth}px`, onClick: (e) => handleClick(e), style: { position: 'relative', borderRadius: 14, verticalAlign: 'top' } })));
};
exports.default = Hue;
