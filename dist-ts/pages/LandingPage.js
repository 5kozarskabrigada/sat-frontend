import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
const LandingPage = () => {
    return (_jsxs("div", { className: "landing-page", children: [_jsx("h1", { children: "Digital SAT Practice Platform" }), _jsx("p", { children: "Take realistic SAT practice tests that mirror the official interface." }), _jsx("div", { className: "landing-actions", children: _jsx(Link, { to: "/register", className: "btn-primary", children: "Get Started" }) })] }));
};
export default LandingPage;
