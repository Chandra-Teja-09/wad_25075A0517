import React from 'react';
import { Link } from 'react-router-dom';

function AuthChoice() {
  return (
    <div className="auth-choice-container">
      <div className="auth-header">
        <h1>FitTrack Pro</h1>
        <p className="auth-subtitle">Your Professional Fitness Companion</p>
      </div>
      
      <div className="auth-options">
        <div className="auth-card">
          <h3>Get Started</h3>
          <p>Create your personalized fitness journey</p>
          <Link to="/register" className="auth-button">
            <span>Register Now</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        
        <div className="auth-card">
          <h3>Access Account</h3>
          <p>Sign in to your existing profile</p>
          <Link to="/login" className="auth-button auth-button-secondary">
            <span>Sign In</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
      
      <div className="auth-footer">
        <p>Join thousands of athletes achieving their fitness goals</p>
      </div>
    </div>
  );
}

export default AuthChoice;