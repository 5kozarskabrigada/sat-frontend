import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import RegisterPage from '@/pages/RegisterPage';
import AdminDashboard from '@/pages/AdminDashboard';
import ExamInterface from '@/pages/ExamInterface';
import ResultsPage from '@/pages/ResultsPage';
import NotFound from '@/pages/NotFound';
import MainLayout from '@/components/Layout/MainLayout';
import ExamLayout from '@/components/Layout/ExamLayout';
import { AuthProvider } from '@/context/AuthContext';
const App = () => {
    return (_jsx(AuthProvider, { children: _jsxs(Routes, { children: [_jsxs(Route, { element: _jsx(MainLayout, {}), children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/register", element: _jsx(RegisterPage, {}) }), _jsx(Route, { path: "/admin", element: _jsx(AdminDashboard, {}) }), _jsx(Route, { path: "/results/:resultId", element: _jsx(ResultsPage, {}) })] }), _jsx(Route, { element: _jsx(ExamLayout, {}), children: _jsx(Route, { path: "/exam/:testId", element: _jsx(ExamInterface, {}) }) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) }));
};
export default App;
