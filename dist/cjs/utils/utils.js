"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDetails = exports.getColorObj = exports.objectToString = exports.isUpperCase = exports.computePickerPosition = exports.computeSquareXY = exports.getHandleValueDomRect = exports.getHandleValue = exports.safeBounds = void 0;
const formatters_js_1 = require("./formatters.js");
const constants_js_1 = require("../constants.js");
const { barSize, crossSize } = constants_js_1.config;
const safeBounds = (e) => {
    const client = e.target.parentNode.getBoundingClientRect();
    const className = e.target.className;
    const adjuster = className === 'c-resize ps-rl' ? 15 : 0;
    return {
        offsetLeft: client?.x + adjuster,
        offsetTop: client?.y,
        clientWidth: client?.width,
        clientHeight: client?.height,
    };
};
exports.safeBounds = safeBounds;
function getHandleValue(e) {
    const { offsetLeft, clientWidth } = (0, exports.safeBounds)(e);
    const pos = e.clientX - offsetLeft - barSize / 2;
    const adjuster = clientWidth - 18;
    const bounded = (0, formatters_js_1.formatInputValues)(pos, 0, adjuster);
    return Math.round(bounded / (adjuster / 100));
}
exports.getHandleValue = getHandleValue;
function getHandleValueDomRect(clientX, r) {
    const px = clientX - r.left;
    const w = r.right - r.left;
    return Math.min(1, Math.max((px / w), 0)) * 100;
}
exports.getHandleValueDomRect = getHandleValueDomRect;
function computeSquareXY(s, v, squareWidth, squareHeight) {
    const x = s * squareWidth - crossSize / 2;
    const y = ((100 - v) / 100) * squareHeight - crossSize / 2;
    return [x, y];
}
exports.computeSquareXY = computeSquareXY;
const getClientXY = (e) => {
    if (e.clientX) {
        return { clientX: e.clientX, clientY: e.clientY };
    }
    else {
        const touch = e.touches[0] || {};
        return { clientX: touch.clientX, clientY: touch.clientY };
    }
};
function computePickerPosition(e) {
    const { offsetLeft, offsetTop, clientWidth, clientHeight } = (0, exports.safeBounds)(e);
    const { clientX, clientY } = getClientXY(e);
    const getX = () => {
        const xPos = clientX - offsetLeft - crossSize / 2;
        return (0, formatters_js_1.formatInputValues)(xPos, -9, clientWidth - 10);
    };
    const getY = () => {
        const yPos = clientY - offsetTop - crossSize / 2;
        return (0, formatters_js_1.formatInputValues)(yPos, -9, clientHeight - 10);
    };
    return [getX(), getY()];
}
exports.computePickerPosition = computePickerPosition;
// export const getGradientType = (value: string) => {
//   return value?.split('(')[0]
// }
const isUpperCase = (str) => {
    return str?.[0] === str?.[0]?.toUpperCase();
};
exports.isUpperCase = isUpperCase;
// export const compareGradients = (g1: string, g2: string) => {
//   const ng1 = g1?.toLowerCase()?.replaceAll(' ', '')
//   const ng2 = g2?.toLowerCase()?.replaceAll(' ', '')
//   if (ng1 === ng2) {
//     return true
//   } else {
//     return false
//   }
// }
const convertShortHandDeg = (dir) => {
    if (dir === 'to top') {
        return 0;
    }
    else if (dir === 'to bottom') {
        return 180;
    }
    else if (dir === 'to left') {
        return 270;
    }
    else if (dir === 'to right') {
        return 90;
    }
    else if (dir === 'to top right') {
        return 45;
    }
    else if (dir === 'to bottom right') {
        return 135;
    }
    else if (dir === 'to bottom left') {
        return 225;
    }
    else if (dir === 'to top left') {
        return 315;
    }
    else {
        const safeDir = dir || 0;
        return parseInt(safeDir);
    }
};
const objectToString = (value) => {
    if (typeof value === 'string') {
        return value;
    }
    else {
        if (value?.type?.includes('gradient')) {
            const sorted = value?.colorStops?.sort((a, b) => a?.left - b?.left);
            const string = sorted
                ?.map((c) => `${c?.value} ${c?.left}%`)
                ?.join(', ');
            const type = value?.type;
            const degs = convertShortHandDeg(value?.orientation?.value);
            const gradientStr = type === 'linear-gradient' ? `${degs}deg` : 'circle';
            return `${type}(${gradientStr}, ${string})`;
        }
        else {
            const color = value?.colorStops[0]?.value || 'rgba(175, 51, 242, 1)';
            return color;
        }
    }
};
exports.objectToString = objectToString;
const getColorObj = (colors) => {
    const idxCols = colors?.map((c, i) => ({
        ...c,
        index: i,
    }));
    const upperObj = idxCols?.find((c) => (0, exports.isUpperCase)(c.value));
    const ccObj = upperObj || idxCols[0];
    return {
        currentColor: ccObj?.value || constants_js_1.config?.defaultGradient,
        selectedColor: ccObj?.index || 0,
        currentLeft: ccObj?.left || 0,
    };
};
exports.getColorObj = getColorObj;
const getDegrees = (value) => {
    const s1 = value?.split(',')[0];
    const s2 = s1?.split('(')[1]?.replace('deg', '');
    return convertShortHandDeg(s2);
};
const getDetails = (value) => {
    const isGradient = value?.includes('gradient');
    const gradientType = value?.split('(')[0];
    const degrees = getDegrees(value);
    const degreeStr = gradientType === 'linear-gradient' ? `${degrees}deg` : 'circle';
    return {
        degrees,
        degreeStr,
        isGradient,
        gradientType,
    };
};
exports.getDetails = getDetails;
