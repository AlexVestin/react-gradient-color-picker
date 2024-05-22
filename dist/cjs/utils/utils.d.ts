import { ColorsProps } from '../shared/types.js';
export declare const safeBounds: (e: any) => {
    offsetLeft: any;
    offsetTop: any;
    clientWidth: any;
    clientHeight: any;
};
export declare function getHandleValue(e: any): number;
export declare function getHandleValueDomRect(clientX: number, r: DOMRect): number;
export declare function computeSquareXY(s: number, v: number, squareWidth: number, squareHeight: number): number[];
export declare function computePickerPosition(e: any): number[];
export declare const isUpperCase: (str: string) => boolean;
export declare const objectToString: (value: any) => any;
export declare const getColorObj: (colors: ColorsProps[]) => {
    currentColor: string;
    selectedColor: number;
    currentLeft: number;
};
export declare const getDetails: (value: string) => {
    degrees: number;
    degreeStr: string;
    isGradient: boolean;
    gradientType: string | undefined;
};
