import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <h1>Digital SAT Practice Platform</h1>
      <p>Take realistic SAT practice tests that mirror the official interface.</p>
      <div className="landing-actions">
        <Link to="/register" className="btn-primary">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
