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
const utils_js_1 = require("../utils/utils.js");
const usePaintHue_js_1 = require("../hooks/usePaintHue.js");
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const AdvBar = ({ value, callback, reffy, openAdvanced, label, }) => {
    const { squareWidth, classes } = (0, context_js_1.usePicker)();
    const [dragging, setDragging] = (0, react_1.useState)(false);
    const [handleTop, setHandleTop] = (0, react_1.useState)(2);
    const containerRef = (0, react_1.useRef)(null);
    const left = value * (squareWidth - 18);
    (0, react_1.useEffect)(() => {
        setHandleTop(reffy?.current?.offsetTop - 2);
    }, [openAdvanced, reffy]);
    const stopDragging = () => {
        setDragging(false);
    };
    const handleClick = (e) => {
        if (!dragging) {
            callback((0, utils_js_1.getHandleValue)(e));
        }
    };
    const handleDown = () => {
        setDragging(true);
    };
    (0, react_1.useEffect)(() => {
        const handleUp = () => {
            stopDragging();
        };
        const handleMove = (e) => {
            if (dragging && containerRef.current !== null) {
                callback((0, utils_js_1.getHandleValueDomRect)(e.clientX, containerRef.current.getBoundingClientRect()));
            }
        };
        window.addEventListener('mouseup', handleUp);
        window.addEventListener('mousemove', handleMove);
        return () => {
            window.removeEventListener('mouseup', handleUp);
            window.removeEventListener('mousemove', handleMove);
        };
    }, []);
    return (react_1.default.createElement("div", { style: { width: '100%', padding: '3px 0px 3px 0px' } },
        react_1.default.createElement("div", { ref: containerRef, className: `${classes.cResize} ${classes.psRl}` },
            react_1.default.createElement("div", { style: { left, top: handleTop }, className: classes.rbgcpHandle, onMouseDown: handleDown, role: "button", tabIndex: 0 }),
            react_1.default.createElement("div", { style: {
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
            react_1.default.createElement("canvas", { ref: reffy, height: "14px", width: `${squareWidth}px`, onClick: (e) => handleClick(e), style: { position: 'relative', borderRadius: 14 } }))));
};
const AdvancedControls = ({ openAdvanced }) => {
    const { tinyColor, handleChange, squareWidth, hc } = (0, context_js_1.usePicker)();
    const { s, l } = tinyColor.toHsl();
    const satRef = (0, react_1.useRef)(null);
    const lightRef = (0, react_1.useRef)(null);
    const brightRef = (0, react_1.useRef)(null);
    (0, usePaintHue_js_1.usePaintSat)(satRef, hc?.h, l * 100, squareWidth);
    (0, usePaintHue_js_1.usePaintLight)(lightRef, hc?.h, s * 100, squareWidth);
    (0, usePaintHue_js_1.usePaintBright)(brightRef, hc?.h, s * 100, squareWidth);
    const satDesat = (value) => {
        const { r, g, b } = (0, tinycolor2_1.default)({ h: hc?.h, s: value / 100, l }).toRgb();
        handleChange(`rgba(${r},${g},${b},${hc?.a})`);
    };
    const setLight = (value) => {
        const { r, g, b } = (0, tinycolor2_1.default)({ h: hc?.h, s, l: value / 100 }).toRgb();
        handleChange(`rgba(${r},${g},${b},${hc?.a})`);
    };
    const setBright = (value) => {
        const { r, g, b } = (0, tinycolor2_1.default)({
            h: hc?.h,
            s: hc?.s * 100,
            v: value,
        }).toRgb();
        handleChange(`rgba(${r},${g},${b},${hc?.a})`);
    };
    return (react_1.default.createElement("div", { style: {
            height: openAdvanced ? 98 : 0,
            width: '100%',
            transition: 'all 120ms linear',
        } },
        react_1.default.createElement("div", { style: {
                paddingTop: 11,
                display: openAdvanced ? 'flex' : 'none',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: openAdvanced ? 98 : 0,
                overflow: 'hidden',
                transition: 'height 100ms linear',
            } },
            react_1.default.createElement(AdvBar, { value: s, reffy: satRef, callback: satDesat, openAdvanced: openAdvanced, label: "Saturation" }),
            react_1.default.createElement(AdvBar, { value: l, reffy: lightRef, label: "Lightness", callback: setLight, openAdvanced: openAdvanced }),
            react_1.default.createElement(AdvBar, { value: hc?.v, reffy: brightRef, label: "Brightness", callback: setBright, openAdvanced: openAdvanced }))));
};
exports.default = AdvancedControls;
