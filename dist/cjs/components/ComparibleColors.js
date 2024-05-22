"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const context_js_1 = require("../context.js");
const ComparibleColors = ({ openComparibles, }) => {
    const { tinyColor, handleChange, classes } = (0, context_js_1.usePicker)();
    const analogous = tinyColor.analogous();
    const monochromatic = tinyColor.monochromatic();
    const triad = tinyColor.triad();
    const tetrad = tinyColor.tetrad();
    const handleClick = (tiny) => {
        const { r, g, b, a } = tiny.toRgb();
        handleChange(`rgba(${r},${g},${b},${a})`);
    };
    return (react_1.default.createElement("div", { style: {
            height: openComparibles ? 216 : 0,
            width: '100%',
            transition: 'all 120ms linear',
        } },
        react_1.default.createElement("div", { style: {
                paddingTop: 11,
                display: openComparibles ? '' : 'none',
                position: 'relative',
            } },
            react_1.default.createElement("div", { style: {
                    textAlign: 'center',
                    fontSize: 13,
                    fontWeight: 600,
                    position: 'absolute',
                    top: 6.5,
                    left: 2,
                }, className: classes.rbgcpComparibleLabel }, "Color Guide"),
            react_1.default.createElement("div", { style: {
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: 500,
                    marginTop: 3,
                }, className: classes.rbgcpComparibleLabel }, "Analogous"),
            react_1.default.createElement("div", { style: { borderRadius: 5, overflow: 'hidden', display: 'flex' } }, analogous?.map((c, key) => (react_1.default.createElement("div", { key: key, style: { width: '20%', height: 30, background: c.toHexString() }, onClick: () => handleClick(c) })))),
            react_1.default.createElement("div", { style: {
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: 500,
                    marginTop: 3,
                }, className: classes.rbgcpComparibleLabel }, "Monochromatic"),
            react_1.default.createElement("div", { style: {
                    borderRadius: 5,
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'flex-end',
                } }, monochromatic?.map((c, key) => (react_1.default.createElement("div", { key: key, style: { width: '20%', height: 30, background: c.toHexString() }, onClick: () => handleClick(c) })))),
            react_1.default.createElement("div", { style: {
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: 500,
                    marginTop: 3,
                }, className: classes.rbgcpComparibleLabel }, "Triad"),
            react_1.default.createElement("div", { style: {
                    borderRadius: 5,
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'flex-end',
                } }, triad?.map((c, key) => (react_1.default.createElement("div", { key: key, style: {
                    width: 'calc(100% / 3)',
                    height: 28,
                    background: c.toHexString(),
                }, onClick: () => handleClick(c) })))),
            react_1.default.createElement("div", { style: {
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: 500,
                    marginTop: 3,
                }, className: classes.rbgcpComparibleLabel }, "Tetrad"),
            react_1.default.createElement("div", { style: {
                    borderRadius: 5,
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'flex-end',
                } }, tetrad?.map((c, key) => (react_1.default.createElement("div", { key: key, style: { width: '25%', height: 28, background: c.toHexString() }, onClick: () => handleClick(c) })))))));
};
exports.default = ComparibleColors;
