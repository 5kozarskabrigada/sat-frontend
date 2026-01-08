import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { getTests } from '../services/examService';
import { useNavigate } from 'react-router-dom';
const AdminDashboard = () => {
    const { user } = useAuthContext();
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const data = await getTests();
                setTests(data);
            }
            finally {
                setLoading(false);
            }
        })();
    }, []);
    if (!user || user.role !== 'ADMIN') {
        return _jsx("div", { children: "Access denied." });
    }
    if (loading)
        return _jsx("div", { children: "Loading tests\u2026" });
    return (_jsxs("div", { className: "admin-dashboard", children: [_jsx("h1", { children: "Admin Dashboard" }), _jsx("h2", { children: "Tests" }), _jsx("ul", { className: "admin-test-list", children: tests.map((t) => (_jsxs("li", { children: [_jsx("span", { children: t.title }), _jsx("button", { type: "button", onClick: () => navigate(`/exam/${t.testId}?code=DEMO`), children: "Preview" })] }, t.testId))) })] }));
};
export default AdminDashboard;
