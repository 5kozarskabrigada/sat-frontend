import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import LandingPage from '@/pages/LandingPage';
import RegisterPage from '@/pages/RegisterPage';
import AdminDashboard from '@/pages/AdminDashboard';
import ExamInterface from '@/pages/ExamInterface';
import ResultsPage from '@/pages/ResultsPage';
import NotFound from '@/pages/NotFound';
import '@/styles/sat-colors.css';
import '@/styles/sat-typography.css';
import '@/styles/sat-layout.css';
const App = () => {
    return (_jsx(AuthProvider, { children: _jsx("div", { className: "sat-app-shell", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/register", element: _jsx(RegisterPage, {}) }), _jsx(Route, { path: "/admin", element: _jsx(AdminDashboard, {}) }), _jsx(Route, { path: "/exam/:testId", element: _jsx(ExamInterface, {}) }), _jsx(Route, { path: "/results/:testId/:studentId", element: _jsx(ResultsPage, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) }) }));
};
export default App;
