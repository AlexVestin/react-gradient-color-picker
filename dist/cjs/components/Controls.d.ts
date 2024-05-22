import React from 'react';
import { LocalesProps } from '../shared/types.js';
declare const Controls: ({ locales, hideEyeDrop, hideAdvancedSliders, hideColorGuide, hideInputType, hideColorTypeBtns, hideGradientControls, hideGradientType, hideGradientAngle, hideGradientStop, }: {
    locales?: LocalesProps | undefined;
    hideEyeDrop?: boolean | undefined;
    hideAdvancedSliders?: boolean | undefined;
    hideColorGuide?: boolean | undefined;
    hideInputType?: boolean | undefined;
    hideColorTypeBtns?: boolean | undefined;
    hideGradientControls?: boolean | undefined;
    hideGradientType?: boolean | undefined;
    hideGradientAngle?: boolean | undefined;
    hideGradientStop?: boolean | undefined;
}) => React.JSX.Element | null;
export default Controls;
export declare const colorTypeBtnStyles: (selected: boolean, classes: any) => any;
export declare const controlBtnStyles: (selected: boolean, classes: any) => any;
export declare const modalBtnStyles: (selected: boolean, classes: any) => string;
