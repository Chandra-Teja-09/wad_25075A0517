import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { isAuthenticated, logoutUser, getCurrentUser } from '../utils/auth';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const user = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="site-nav">
      <div className="nav-brand">FitTrack</div>
      <div className="nav-links">
        <NavLink to="/workouts">Workouts</NavLink>
        <NavLink to="/progress">Progress</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        {!loggedIn && <NavLink to="/register">Register</NavLink>}
        {!loggedIn && <NavLink to="/login">Login</NavLink>}
      </div>
      <div className="nav-cta">
        {loggedIn ? (
          <>
            <span>Hi, {user?.name || 'Athlete'}</span>
            <button className="button button-secondary" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <span className="nav-note">Track workouts, set goals, stay motivated.</span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
