import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, isAuthenticated } from '../utils/auth';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated()) {
    navigate('/workouts');
  }

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim()) next.email = 'Please enter your email.';
    else if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.password) next.password = 'Password is required.';
    else if (form.password.length < 6) next.password = 'Password must be at least 6 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      const result = registerUser(form);
      if (!result.success) {
        setMessage({ type: 'error', text: result.message });
        setIsSubmitting(false);
        return;
      }

      setMessage({ type: 'success', text: 'Registration successful! Redirecting to dashboard...' });
      setTimeout(() => navigate('/workouts'), 1200);
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
      setIsSubmitting(false);
    }
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p className="auth-description">Join fitness enthusiasts and start tracking your progress</p>
        </div>
        
        <div className="auth-card">
          <form onSubmit={handleSubmit} noValidate className="auth-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input 
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                placeholder="Enter your full name"
                autoFocus
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input 
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                placeholder="Enter your email"
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input 
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className={`form-input ${errors.password ? 'input-error' : ''}`}
                placeholder="Create a password (min 6 characters)"
              />
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>
            
            {message && (
              <div className={`form-message ${message.type}`}>
                {message.text}
              </div>
            )}
            
            <button 
              type="submit" 
              className="button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="auth-link">
            Already have an account? <Link to="/login">Sign in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;