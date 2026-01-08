import React from 'react';
import { Outlet } from 'react-router-dom';

const ExamLayout: React.FC = () => {
  return (
    <div className="exam-root">
      <Outlet />
    </div>
  );
};

export default ExamLayout;
