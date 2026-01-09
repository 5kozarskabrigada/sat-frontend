import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/AdminDashboard.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { getTests } from '@/services/examService';
import { createStudent } from '@/services/adminService';
import '@/styles/sat-colors.css';
import '@/styles/sat-layout.css';
import '@/styles/sat-typography.css';
import '@/styles/admin-dashboard.css';
const AdminDashboard = () => {
    const { user } = useAuthContext();
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newStudentName, setNewStudentName] = useState('');
    const [newStudentPhone, setNewStudentPhone] = useState('');
    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState(null);
    const [createdStudent, setCreatedStudent] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        let cancelled = false;
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getTests();
                if (!cancelled)
                    setTests(data);
            }
            catch (err) {
                if (!cancelled) {
                    console.error(err);
                    setError('Failed to load tests. Please try again.');
                }
            }
            finally {
                if (!cancelled)
                    setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);
    const handleCreateStudent = async (e) => {
        e.preventDefault();
        setCreating(true);
        setCreateError(null);
        setCreatedStudent(null);
        try {
            const res = await createStudent({
                name: newStudentName,
                phone: newStudentPhone,
            });
            setCreatedStudent(res);
            setNewStudentName('');
            setNewStudentPhone('');
        }
        catch (err) {
            setCreateError(err.message || 'Failed to create student');
        }
        finally {
            setCreating(false);
        }
    };
    if (!user || user.role !== 'ADMIN') {
        return (_jsxs("div", { className: "admin-dashboard admin-dashboard--unauthorized", children: [_jsx("h1", { className: "sat-heading-xl", children: "Access denied" }), _jsx("p", { className: "sat-text-m", children: "You must be an admin to view this dashboard." })] }));
    }
    if (loading) {
        return (_jsxs("div", { className: "admin-dashboard admin-dashboard--loading", children: [_jsx("div", { className: "admin-spinner" }), _jsx("p", { className: "sat-text-m", children: "Loading tests\u2026" })] }));
    }
    if (error) {
        return (_jsxs("div", { className: "admin-dashboard admin-dashboard--error", children: [_jsx("h1", { className: "sat-heading-l", children: "Admin Dashboard" }), _jsx("p", { className: "sat-text-m admin-error-text", children: error }), _jsx("button", { type: "button", className: "admin-primary-button", onClick: () => window.location.reload(), children: "Retry" })] }));
    }
    return (_jsxs("div", { className: "admin-dashboard", children: [_jsxs("header", { className: "admin-header", children: [_jsxs("div", { children: [_jsx("h1", { className: "sat-heading-xl", children: "SAT Admin Dashboard" }), _jsx("p", { className: "sat-text-m", children: "Manage SAT practice tests, access codes, and view results." })] }), _jsxs("div", { className: "admin-user", children: [_jsx("span", { className: "admin-user-name", children: user.name }), _jsx("span", { className: "admin-user-role", children: "Admin" })] })] }), _jsx("main", { className: "admin-main", children: _jsxs("section", { className: "admin-panel admin-panel--students", children: [_jsx("h2", { className: "sat-heading-l", children: "Create student account" }), _jsxs("form", { onSubmit: handleCreateStudent, className: "admin-student-form", children: [_jsxs("label", { children: ["Name and surname", _jsx("input", { value: newStudentName, onChange: (e) => setNewStudentName(e.target.value), required: true })] }), _jsxs("label", { children: ["Phone number", _jsx("input", { value: newStudentPhone, onChange: (e) => setNewStudentPhone(e.target.value), required: true })] }), _jsx("button", { type: "submit", className: "admin-primary-button", disabled: creating, children: creating ? 'Creating…' : 'Create student' })] }), createError && _jsx("p", { className: "admin-error-text", children: createError }), createdStudent && (_jsxs("div", { className: "admin-created-student sat-text-m", children: [_jsxs("p", { children: [_jsx("strong", { children: "Username:" }), " ", createdStudent.username] }), _jsxs("p", { children: [_jsx("strong", { children: "Password:" }), " ", createdStudent.password] }), _jsx("p", { children: "Give these credentials to the student so they can log in." })] }))] }) })] }));
};
export default AdminDashboard;
