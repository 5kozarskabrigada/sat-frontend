import React from 'react';
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

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/results/:resultId" element={<ResultsPage />} />
        </Route>

        <Route element={<ExamLayout />}>
          <Route path="/exam/:testId" element={<ExamInterface />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
