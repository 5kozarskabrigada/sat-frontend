import React, { useEffect, useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { getTests } from '@/services/examService';
import type { TestSummaryResponse } from '@/types/exam';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { user } = useAuthContext();
  const [tests, setTests] = useState<TestSummaryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getTests();
        setTests(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (!user || user.role !== 'ADMIN') {
    return <div>Access denied.</div>;
  }

  if (loading) return <div>Loading tests…</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <h2>Tests</h2>
      <ul className="admin-test-list">
        {tests.map((t) => (
          <li key={t.testId}>
            <span>{t.title}</span>
            <button
              type="button"
              onClick={() => navigate(`/exam/${t.testId}?code=DEMO`)}
            >
              Preview
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
