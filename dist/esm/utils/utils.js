import { formatInputValues } from './formatters.js';
import { config } from '../constants.js';
const { barSize, crossSize } = config;
export const safeBounds = (e) => {
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
export function getHandleValue(e) {
    const { offsetLeft, clientWidth } = safeBounds(e);
    const pos = e.clientX - offsetLeft - barSize / 2;
    const adjuster = clientWidth - 18;
    const bounded = formatInputValues(pos, 0, adjuster);
    return Math.round(bounded / (adjuster / 100));
}
export function getHandleValueDomRect(clientX, r) {
    const px = clientX - r.left;
    const w = r.right - r.left;
    return Math.min(1, Math.max((px / w), 0)) * 100;
}
export function computeSquareXY(s, v, squareWidth, squareHeight) {
    const x = s * squareWidth - crossSize / 2;
    const y = ((100 - v) / 100) * squareHeight - crossSize / 2;
    return [x, y];
}
const getClientXY = (e) => {
    if (e.clientX) {
        return { clientX: e.clientX, clientY: e.clientY };
    }
    else {
        const touch = e.touches[0] || {};
        return { clientX: touch.clientX, clientY: touch.clientY };
    }
};
export function computePickerPosition(e) {
    const { offsetLeft, offsetTop, clientWidth, clientHeight } = safeBounds(e);
    const { clientX, clientY } = getClientXY(e);
    const getX = () => {
        const xPos = clientX - offsetLeft - crossSize / 2;
        return formatInputValues(xPos, -9, clientWidth - 10);
    };
    const getY = () => {
        const yPos = clientY - offsetTop - crossSize / 2;
        return formatInputValues(yPos, -9, clientHeight - 10);
    };
    return [getX(), getY()];
}
// export const getGradientType = (value: string) => {
//   return value?.split('(')[0]
// }
export const isUpperCase = (str) => {
    return str?.[0] === str?.[0]?.toUpperCase();
};
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
export const objectToString = (value) => {
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
export const getColorObj = (colors) => {
    const idxCols = colors?.map((c, i) => ({
        ...c,
        index: i,
    }));
    const upperObj = idxCols?.find((c) => isUpperCase(c.value));
    const ccObj = upperObj || idxCols[0];
    return {
        currentColor: ccObj?.value || config?.defaultGradient,
        selectedColor: ccObj?.index || 0,
        currentLeft: ccObj?.left || 0,
    };
};
const getDegrees = (value) => {
    const s1 = value?.split(',')[0];
    const s2 = s1?.split('(')[1]?.replace('deg', '');
    return convertShortHandDeg(s2);
};
export const getDetails = (value) => {
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
