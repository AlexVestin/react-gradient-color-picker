"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const usePaintSquare = (canvas, hue, squareWidth, squareHeight) => {
    (0, react_1.useEffect)(() => {
        if (canvas.current) {
            const ctx = canvas.current.getContext('2d', { willReadFrequently: true });
            if (ctx) {
                ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
                ctx.fillRect(0, 0, squareWidth, squareHeight);
                const gradientWhite = ctx.createLinearGradient(0, 0, squareWidth, 0);
                gradientWhite.addColorStop(0, `rgba(255, 255, 255, 1)`);
                gradientWhite.addColorStop(1, `rgba(255, 255, 255, 0)`);
                ctx.fillStyle = gradientWhite;
                ctx.fillRect(0, 0, squareWidth, squareHeight);
                const gradientBlack = ctx.createLinearGradient(0, 0, 0, squareHeight);
                gradientBlack.addColorStop(0, `rgba(0, 0, 0, 0)`);
                gradientBlack.addColorStop(1, `rgba(0, 0, 0, 1)`);
                ctx.fillStyle = gradientBlack;
                ctx.fillRect(0, 0, squareWidth, squareHeight);
            }
        }
    }, [canvas, hue, squareWidth, squareHeight]);
};
exports.default = usePaintSquare;
