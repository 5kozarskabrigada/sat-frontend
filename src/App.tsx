import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from '@/context/AuthContext';

import LandingPage from '@/pages/LandingPage';
import RegisterPage from '@/pages/RegisterPage';
import AdminDashboard from '@/pages/AdminDashboard';
import ExamInterface from '@/pages/ExamInterface';
import ResultsPage from '@/pages/ResultsPage';
import NotFound from '@/pages/NotFound';

import '@/styles/sat-colors.css';
import '@/styles/sat-typography.css';
import '@/styles/sat-layout.css';

const App: React.FC = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/exam/:testId" element={<ExamInterface />} />
      <Route path="/results/:testId/:studentId" element={<ResultsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AuthProvider>
);

export default App;
