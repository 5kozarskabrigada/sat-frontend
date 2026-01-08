import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerApi, login as loginApi } from '@/services/authService';
import type { RegisterRequest, LoginRequest } from '@/types/auth';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (isLogin) {
        const payload: LoginRequest = { email, password };
        await loginApi(payload);
      } else {
        const payload: RegisterRequest = { name, phone, email, password };
        await registerApi(payload);
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-page">
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <>
            <label>
              Name
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              Phone
              <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </label>
          </>
        )}
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <div className="auth-error">{error}</div>}
        <button type="submit" disabled={busy}>
          {busy ? 'Please wait…' : isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <button
        type="button"
        onClick={() => setIsLogin((v) => !v)}
        className="auth-toggle"
      >
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default RegisterPage;
