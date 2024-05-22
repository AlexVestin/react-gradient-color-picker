"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const Portal = ({ children }) => {
    const id = 'id' + Math.random().toString(16).slice(2);
    const el = (0, react_1.useRef)(document.getElementById(id) || document.createElement('div'));
    const [dynamic] = (0, react_1.useState)(!el.current.parentElement);
    (0, react_1.useEffect)(() => {
        const refValue = el.current;
        if (dynamic) {
            el.current.id = id;
            document.body.appendChild(el.current);
        }
        return () => {
            if (dynamic && refValue.parentElement) {
                refValue.parentElement.removeChild(refValue);
            }
        };
        //eslint-disable-next-line
    }, [id]);
    return (0, react_dom_1.createPortal)(children, el.current);
};
exports.default = (0, react_1.memo)(Portal);
