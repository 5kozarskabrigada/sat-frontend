import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Outlet, Link } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
const MainLayout = () => {
    const { user, logout } = useAuthContext();
    return (_jsxs("div", { className: "app-shell", children: [_jsxs("header", { className: "app-header", children: [_jsx("div", { className: "app-brand", children: _jsx(Link, { to: "/", children: "SAT ExamHub" }) }), _jsxs("nav", { className: "app-nav", children: [_jsx(Link, { to: "/", children: "Home" }), user?.role === 'ADMIN' && _jsx(Link, { to: "/admin", children: "Admin" })] }), _jsx("div", { className: "app-auth", children: user ? (_jsxs(_Fragment, { children: [_jsx("span", { children: user.name }), _jsx("button", { type: "button", onClick: logout, children: "Logout" })] })) : (_jsx(Link, { to: "/register", children: "Register / Login" })) })] }), _jsx("main", { className: "app-main", children: _jsx(Outlet, {}) })] }));
};
export default MainLayout;
