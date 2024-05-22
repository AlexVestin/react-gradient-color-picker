"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const context_js_1 = require("../context.js");
const constants_js_1 = require("../constants.js");
const Presets = ({ presets = [] }) => {
    const { value, onChange, handleChange, squareWidth } = (0, context_js_1.usePicker)();
    const getPresets = () => {
        if (presets?.length > 0) {
            return presets?.slice(0, 18);
        }
        else {
            return constants_js_1.fakePresets;
        }
    };
    const handlePresetClick = (preset) => {
        if (preset?.includes('gradient')) {
            onChange(preset);
        }
        else {
            handleChange(preset);
        }
    };
    return (react_1.default.createElement("div", { style: {
            display: 'flex',
            marginTop: 14,
            justifyContent: 'space-between',
        } },
        react_1.default.createElement("div", { style: {
                width: 50,
                height: 50,
                background: value,
                borderRadius: 6,
                flexShrink: 0,
            } }),
        react_1.default.createElement("div", { style: {
                display: 'flex',
                flexWrap: 'wrap',
                width: squareWidth - 66,
                justifyContent: 'space-between',
            } }, getPresets().map((p, key) => (react_1.default.createElement("div", { key: `${p}-${key}`, style: {
                height: 23,
                width: '10.2%',
                borderRadius: 4,
                background: p,
                marginBottom: 2,
                border: p === 'rgba(255,255,255, 1)' ? '1px solid #96959c' : '',
            }, onClick: () => handlePresetClick(p) }))))));
};
exports.default = Presets;
