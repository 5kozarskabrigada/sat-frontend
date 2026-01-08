import React from 'react';
import { useParams } from 'react-router-dom';

const ResultsPage: React.FC = () => {
  const { resultId } = useParams<{ resultId: string }>();

  return (
    <div className="results-page">
      <h1>Exam Results</h1>
      <p>Your result id: {resultId}</p>
      {/* Later: fetch result summary from /api/admin/results/{resultId} */}
    </div>
  );
};

export default ResultsPage;
