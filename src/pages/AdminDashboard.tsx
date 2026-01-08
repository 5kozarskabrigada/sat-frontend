// src/pages/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/context/AuthContext';
import { getTests } from '@/services/examService';
import { createStudent, type CreateStudentResponse } from '@/services/adminService';
import type { TestSummaryResponse } from '@/types/exam';

import '@/styles/sat-colors.css';
import '@/styles/sat-layout.css';
import '@/styles/sat-typography.css';
import '@/styles/admin-dashboard.css';

const AdminDashboard: React.FC = () => {
  const { user } = useAuthContext();
  const [tests, setTests] = useState<TestSummaryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentPhone, setNewStudentPhone] = useState('');
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createdStudent, setCreatedStudent] = useState<CreateStudentResponse | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTests();
        if (!cancelled) setTests(data);
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError('Failed to load tests. Please try again.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCreateStudent = async (e: React.FormEvent) => {
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
    } catch (err: any) {
      setCreateError(err.message || 'Failed to create student');
    } finally {
      setCreating(false);
    }
  };

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="admin-dashboard admin-dashboard--unauthorized">
        <h1 className="sat-heading-xl">Access denied</h1>
        <p className="sat-text-m">You must be an admin to view this dashboard.</p>
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
        {/* existing tests and quick links sections here */}

        <section className="admin-panel admin-panel--students">
          <h2 className="sat-heading-l">Create student account</h2>
          <form onSubmit={handleCreateStudent} className="admin-student-form">
            <label>
              Name and surname
              <input
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                required
              />
            </label>
            <label>
              Phone number
              <input
                value={newStudentPhone}
                onChange={(e) => setNewStudentPhone(e.target.value)}
                required
              />
            </label>
            <button
              type="submit"
              className="admin-primary-button"
              disabled={creating}
            >
              {creating ? 'Creating…' : 'Create student'}
            </button>
          </form>

          {createError && <p className="admin-error-text">{createError}</p>}

          {createdStudent && (
            <div className="admin-created-student sat-text-m">
              <p><strong>Username:</strong> {createdStudent.username}</p>
              <p><strong>Password:</strong> {createdStudent.password}</p>
              <p>Give these credentials to the student so they can log in.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
