import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
const NotFound = () => (_jsxs("div", { className: "notfound-page", children: [_jsx("h1", { children: "404" }), _jsx("p", { children: "Page not found." }), _jsx(Link, { to: "/", children: "Go home" })] }));
export default NotFound;
