import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerApi, login as loginApi } from '../services/authService';
const RegisterPage = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setBusy(true);
        setError(null);
        try {
            if (isLogin) {
                const payload = { email, password };
                await loginApi(payload);
            }
            else {
                const payload = { name, phone, email, password };
                await registerApi(payload);
            }
            navigate('/');
        }
        catch (err) {
            setError(err.message || 'Something went wrong');
        }
        finally {
            setBusy(false);
        }
    };
    return (_jsxs("div", { className: "auth-page", children: [_jsx("h1", { children: isLogin ? 'Login' : 'Register' }), _jsxs("form", { onSubmit: handleSubmit, className: "auth-form", children: [!isLogin && (_jsxs(_Fragment, { children: [_jsxs("label", { children: ["Name", _jsx("input", { value: name, onChange: (e) => setName(e.target.value), required: true })] }), _jsxs("label", { children: ["Phone", _jsx("input", { value: phone, onChange: (e) => setPhone(e.target.value), required: true })] })] })), _jsxs("label", { children: ["Email", _jsx("input", { value: email, onChange: (e) => setEmail(e.target.value), required: true })] }), _jsxs("label", { children: ["Password", _jsx("input", { value: password, type: "password", onChange: (e) => setPassword(e.target.value), required: true })] }), error && _jsx("div", { className: "auth-error", children: error }), _jsx("button", { type: "submit", disabled: busy, children: busy ? 'Please wait…' : isLogin ? 'Login' : 'Register' })] }), _jsx("button", { type: "button", onClick: () => setIsLogin((v) => !v), className: "auth-toggle", children: isLogin ? 'Need an account? Register' : 'Already have an account? Login' })] }));
};
export default RegisterPage;
