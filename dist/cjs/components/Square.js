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
const usePaintSquare_js_1 = __importDefault(require("../hooks/usePaintSquare.js"));
const lodash_throttle_1 = __importDefault(require("lodash.throttle"));
const context_js_1 = require("../context.js");
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const utils_js_1 = require("../utils/utils.js");
const constants_js_1 = require("../constants.js");
const { crossSize } = constants_js_1.config;
const Square = () => {
    const { hc, classes, squareWidth, squareHeight, handleChange } = (0, context_js_1.usePicker)();
    const [dragging, setDragging] = (0, react_1.useState)(false);
    const canvas = (0, react_1.useRef)(null);
    const [x, y] = (0, utils_js_1.computeSquareXY)(hc?.s, hc?.v * 100, squareWidth, squareHeight);
    const [dragPos, setDragPos] = (0, react_1.useState)({ x, y });
    (0, usePaintSquare_js_1.default)(canvas, hc?.h, squareWidth, squareHeight);
    (0, react_1.useEffect)(() => {
        if (!dragging) {
            setDragPos({ x: hc?.v === 0 ? dragPos.x : x, y });
        }
    }, [x, y]);
    const handleColor = (e) => {
        const onMouseMove = (0, lodash_throttle_1.default)(() => {
            const [x, y] = (0, utils_js_1.computePickerPosition)(e);
            if (x && y) {
                const x1 = Math.min(x + crossSize / 2, squareWidth - 1);
                const y1 = Math.min(y + crossSize / 2, squareHeight - 1);
                const newS = (x1 / squareWidth) * 100;
                const newY = 100 - (y1 / squareHeight) * 100;
                setDragPos({ x: newY === 0 ? dragPos?.x : x, y });
                const updated = (0, tinycolor2_1.default)(`hsva(${hc?.h}, ${newS}%, ${newY}%, ${hc?.a})`);
                handleChange(updated.toRgbString());
            }
        }, 250);
        onMouseMove();
    };
    const stopDragging = () => {
        setDragging(false);
    };
    const handleMove = (e) => {
        if (dragging) {
            handleColor(e);
        }
    };
    // const handleTouchMove = (e: any) => {
    //   if (dragging && isMobile) {
    //     document.body.style.overflow = 'hidden'
    //     handleColor(e)
    //   }
    // }
    const handleClick = (e) => {
        if (!dragging) {
            handleColor(e);
        }
    };
    const handleMouseDown = () => {
        setDragging(true);
    };
    const handleCanvasDown = (e) => {
        setDragging(true);
        handleColor(e);
    };
    (0, react_1.useEffect)(() => {
        const handleUp = () => {
            stopDragging();
        };
        window.addEventListener('mouseup', handleUp);
        return () => {
            window.removeEventListener('mouseup', handleUp);
        };
    }, []);
    return (react_1.default.createElement("div", { style: { position: 'relative' } },
        react_1.default.createElement("div", { onMouseUp: stopDragging, onTouchEnd: stopDragging, onMouseDown: handleCanvasDown, onTouchStart: handleCanvasDown, onMouseMove: (e) => handleMove(e), style: { position: 'relative', cursor: 'ew-cross' } },
            react_1.default.createElement("div", { className: classes.rbgcpHandle, style: {
                    left: dragPos?.x,
                    top: dragPos?.y,
                }, onMouseDown: handleMouseDown, role: "button", tabIndex: 0 }),
            react_1.default.createElement("div", { className: classes.rbgcpCanvasWrapper, style: { height: squareHeight }, onClick: (e) => handleClick(e) },
                react_1.default.createElement("canvas", { ref: canvas, id: "paintSquare", width: `${squareWidth}px`, height: `${squareHeight}px` })))));
};
exports.default = Square;
