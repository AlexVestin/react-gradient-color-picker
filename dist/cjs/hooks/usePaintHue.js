"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePaintBright = exports.usePaintLight = exports.usePaintSat = void 0;
const react_1 = require("react");
const tinycolor2_1 = __importDefault(require("tinycolor2"));
const usePaintHue = (canvas, squareWidth) => {
    (0, react_1.useEffect)(() => {
        const ctx = canvas?.current?.getContext('2d', { willReadFrequently: true });
        if (ctx) {
            ctx.rect(0, 0, squareWidth, 14);
            const gradient = ctx.createLinearGradient(0, 0, squareWidth, 0);
            for (let i = 0; i <= 360; i += 30) {
                gradient.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`);
            }
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }, [canvas, squareWidth]);
};
exports.default = usePaintHue;
const usePaintSat = (canvas, h, l, squareWidth) => {
    (0, react_1.useEffect)(() => {
        const ctx = canvas?.current?.getContext('2d', { willReadFrequently: true });
        if (ctx) {
            ctx.rect(0, 0, squareWidth, 14);
            const gradient = ctx.createLinearGradient(0, 0, squareWidth, 0);
            for (let i = 0; i <= 100; i += 10) {
                gradient.addColorStop(i / 100, `hsl(${h}, ${i}%, ${l}%)`);
            }
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }, [canvas, h, l, squareWidth]);
};
exports.usePaintSat = usePaintSat;
const usePaintLight = (canvas, h, s, squareWidth) => {
    (0, react_1.useEffect)(() => {
        const ctx = canvas?.current?.getContext('2d', { willReadFrequently: true });
        if (ctx) {
            ctx.rect(0, 0, squareWidth, 14);
            const gradient = ctx.createLinearGradient(0, 0, squareWidth, 0);
            for (let i = 0; i <= 100; i += 10) {
                gradient.addColorStop(i / 100, `hsl(${h}, ${s}%, ${i}%)`);
            }
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }, [canvas, h, s, squareWidth]);
};
exports.usePaintLight = usePaintLight;
const usePaintBright = (canvas, h, s, squareWidth) => {
    (0, react_1.useEffect)(() => {
        const ctx = canvas?.current?.getContext('2d', { willReadFrequently: true });
        if (ctx) {
            ctx.rect(0, 0, squareWidth, 14);
            const gradient = ctx.createLinearGradient(0, 0, squareWidth, 0);
            for (let i = 0; i <= 100; i += 10) {
                const hsl = (0, tinycolor2_1.default)({ h: h, s: s, v: i });
                gradient.addColorStop(i / 100, hsl.toHslString());
            }
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }, [canvas, h, s, squareWidth]);
};
exports.usePaintBright = usePaintBright;
