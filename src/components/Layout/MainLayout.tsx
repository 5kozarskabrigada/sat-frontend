import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';

const MainLayout: React.FC = () => {
  const { user, logout } = useAuthContext();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-brand">
          <Link to="/">SAT ExamHub</Link>
        </div>
        <nav className="app-nav">
          <Link to="/">Home</Link>
          {user?.role === 'ADMIN' && <Link to="/admin">Admin</Link>}
        </nav>
        <div className="app-auth">
          {user ? (
            <>
              <span>{user.name}</span>
              <button type="button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/register">Register / Login</Link>
          )}
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
