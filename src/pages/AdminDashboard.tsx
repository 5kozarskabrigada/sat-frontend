import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/context/AuthContext';
import { getTests } from '@/services/examService';
import type { TestSummaryResponse } from '@/types/exam';

// global SAT styles
import '@/styles/sat-colors.css';
import '@/styles/sat-layout.css';
import '@/styles/sat-typography.css';
import '@/styles/admin-dashboard.css';

const AdminDashboard: React.FC = () => {
  const { user } = useAuthContext();
  const [tests, setTests] = useState<TestSummaryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTests(); // calls GET /api/tests on your backend [file:208]
        if (!cancelled) {
          setTests(data);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError('Failed to load tests. Please try again.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="admin-dashboard admin-dashboard--unauthorized">
        <h1 className="sat-heading-xl">Access denied</h1>
        <p className="sat-text-m">
          You must be an admin to view this dashboard.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-dashboard admin-dashboard--loading">
        <div className="admin-spinner" />
        <p className="sat-text-m">Loading tests…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard admin-dashboard--error">
        <h1 className="sat-heading-l">Admin Dashboard</h1>
        <p className="sat-text-m admin-error-text">{error}</p>
        <button
          type="button"
          className="admin-primary-button"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div>
          <h1 className="sat-heading-xl">SAT Admin Dashboard</h1>
          <p className="sat-text-m">
            Manage SAT practice tests, access codes, and view results.
          </p>
        </div>
        <div className="admin-user">
          <span className="admin-user-name">{user.name}</span>
          <span className="admin-user-role">Admin</span>
        </div>
      </header>

      <main className="admin-main">
        <section className="admin-panel admin-panel--tests">
          <div className="admin-panel-header">
            <h2 className="sat-heading-l">Tests</h2>
            <button
              type="button"
              className="admin-primary-button"
              onClick={() => navigate('/admin/create-test')}
            >
              + New test
            </button>
          </div>

          {tests.length === 0 ? (
            <p className="sat-text-m admin-empty-state">
              No tests created yet. Start by creating your first SAT practice
              test.
            </p>
          ) : (
            <ul className="admin-test-list">
              {tests.map((t) => (
                <li key={t.id} className="admin-test-item">
                  <div className="admin-test-main">
                    <h3 className="sat-heading-m">{t.title}</h3>
                    <p className="sat-text-m admin-test-meta">
                      {t.questionCount} questions •{' '}
                      {t.isActive ? 'Active' : 'Inactive'}
                    </p>
                  </div>

                  <div className="admin-test-actions">
                    <button
                      type="button"
                      className="admin-secondary-button"
                      onClick={() =>
                        navigate(`/exam/${t.id}?code=DEMO`)
                      }
                    >
                      Preview
                    </button>
                    <button
                      type="button"
                      className={
                        t.isActive
                          ? 'admin-secondary-button admin-secondary-button--danger'
                          : 'admin-primary-button'
                      }
                      onClick={() =>
                        navigate(`/admin/tests/${t.id}/toggle-active`)
                      }
                    >
                      {t.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      type="button"
                      className="admin-secondary-button"
                      onClick={() =>
                        navigate(`/admin/results/${t.id}`)
                      }
                    >
                      Results
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="admin-panel admin-panel--sidebar">
          <h2 className="sat-heading-l">Quick links</h2>
          <ul className="admin-quick-links">
            <li>
              <button
                type="button"
                className="admin-link-button"
                onClick={() => navigate('/admin/access-codes')}
              >
                Manage access codes
              </button>
            </li>
            <li>
              <button
                type="button"
                className="admin-link-button"
                onClick={() => navigate('/admin/anti-cheat')}
              >
                Anti‑cheat logs
              </button>
            </li>
            <li>
              <button
                type="button"
                className="admin-link-button"
                onClick={() => navigate('/admin/health')}
              >
                API health
              </button>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
