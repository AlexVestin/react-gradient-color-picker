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
const Portal_js_1 = __importDefault(require("./Portal.js"));
const html2canvas_1 = __importDefault(require("html2canvas"));
const Controls_js_1 = require("./Controls.js");
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const context_js_1 = require("../context.js");
const DropperIcon = ({ color }) => {
    const { classes } = (0, context_js_1.usePicker)();
    const col = color || '';
    const style1 = {
        fill: 'none',
        stroke: col,
        strokeWidth: '1.4px',
    };
    const style2 = {
        fill: col,
        stroke: col,
        strokeWidth: '1.4px',
    };
    return (react_1.default.createElement("svg", { id: "Layer_1", "data-name": "Layer 1", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", style: { width: 16 } },
        react_1.default.createElement("path", { style: style1, strokeLinecap: "round", strokeLinejoin: "round", className: classes.rbgcpControlIcon, d: "M15.6,7h0L7.78,14.86c-.37.37-1.61.38-2,.75s-.5,1.53-.76,2a3.53,3.53,0,0,1-.52.52,1.6,1.6,0,0,1-2.27-.06l-.32-.32a1.61,1.61,0,0,1-.06-2.27A3.25,3.25,0,0,1,2.4,15c.47-.26,1.65-.35,2-.73s.34-1.64.71-2c1.68-1.73,5.61-5.65,7.91-7.93h0l1.14,1.38L15.6,7Z" }),
        react_1.default.createElement("polygon", { style: style2, strokeLinecap: "round", strokeLinejoin: "round", className: classes.rbgcpControlIcon2, points: "15.7 8.87 11.13 4.29 12.69 2.73 17.25 7.31 15.7 8.87" }),
        react_1.default.createElement("path", { style: style2, strokeLinecap: "round", strokeLinejoin: "round", className: classes.rbgcpControlIcon2, d: "M18.18,3.71,16.36,5.53a1.33,1.33,0,0,1-1.88,0h0a1.34,1.34,0,0,1,0-1.89l1.81-1.82a1.34,1.34,0,0,1,1.89,0h0A1.34,1.34,0,0,1,18.18,3.71Z" })));
};
const Dropper = ({ onSelect }) => {
    const { classes } = (0, context_js_1.usePicker)();
    const [pickerCanvas, setPickerCanvas] = (0, react_1.useState)(null);
    const [coverUp, setCoverUp] = (0, react_1.useState)(false);
    const takePick = () => {
        const root = document.getElementById('root');
        setCoverUp(true);
        // @ts-expect-error some error with this imported packages types
        (0, html2canvas_1.default)(root).then((canvas) => {
            const blankCanvas = document.createElement('canvas');
            const ctx = blankCanvas.getContext('2d', { willReadFrequently: true });
            if (root && ctx) {
                blankCanvas.width = root.offsetWidth * 2;
                blankCanvas.height = root.offsetHeight * 2;
                ctx.drawImage(canvas, 0, 0);
            }
            setPickerCanvas(ctx);
        });
    };
    const getColorLegacy = (e) => {
        e.stopPropagation();
        if (pickerCanvas) {
            const { pageX, pageY } = e;
            const x1 = pageX * 2;
            const y1 = pageY * 2;
            const [r, g, b] = pickerCanvas.getImageData(x1, y1, 1, 1).data;
            onSelect(`rgba(${r}, ${g}, ${b}, 1)`);
        }
        setCoverUp(false);
    };
    const getEyeDrop = () => {
        // @ts-expect-error - ts does not evaluate for window.EyeDropper
        if (!window.EyeDropper) {
            takePick();
        }
        else {
            // @ts-expect-error - ts does not evaluate for window.EyeDropper
            const eyeDropper = new window.EyeDropper();
            const abortController = new window.AbortController();
            eyeDropper
                .open({ signal: abortController.signal })
                .then((result) => {
                const tinyHex = (0, tinycolor2_1.default)(result.sRGBHex);
                const { r, g, b } = tinyHex.toRgb();
                onSelect(`rgba(${r}, ${g}, ${b}, 1)`);
            })
                .catch((e) => {
                console.log(e);
            });
        }
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("div", { onClick: getEyeDrop, id: "rbgcp-eyedropper-btn", className: `${(0, Controls_js_1.controlBtnStyles)(coverUp, classes)} ${classes.rbgcpEyedropperBtn}` },
            react_1.default.createElement(DropperIcon, { color: coverUp ? 'rgb(86, 140, 245)' : '' })),
        coverUp && (react_1.default.createElement(Portal_js_1.default, null,
            react_1.default.createElement("div", { onClick: (e) => getColorLegacy(e), className: classes.rbgcpEyedropperCover })))));
};
exports.default = Dropper;
