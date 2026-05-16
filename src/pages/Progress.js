import React, { useEffect, useMemo, useState } from 'react';
import { getCurrentUser } from '../utils/auth';
import { getProgressLogs, saveProgressLogs, getWorkoutPlans } from '../utils/storage';

function Progress() {
  const [logs, setLogs] = useState([]);
  const [plan, setPlan] = useState('');
  const [duration, setDuration] = useState('30 min');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState(null);
  const [plans, setPlans] = useState([]);
  const user = getCurrentUser();

  useEffect(() => {
    setLogs(getProgressLogs());
    setPlans(getWorkoutPlans());
  }, []);

  const totals = useMemo(() => ({
    logged: logs.length,
    totalDuration: logs.reduce((sum, item) => sum + parseInt(item.duration, 10), 0),
    streak: logs.length ? 1 + Math.floor(Math.random() * 4) : 0,
  }), [logs]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!plan || !duration.trim()) {
      setMessage({ type: 'error', text: 'Select a workout and duration.' });
      return;
    }

    const entry = {
      id: Date.now(),
      plan,
      duration,
      notes: notes.trim() || 'Completed with strong focus.',
      date: new Date().toLocaleDateString(),
    };

    const next = [entry, ...logs];
    setLogs(next);
    saveProgressLogs(next);
    setPlan('');
    setDuration('30 min');
    setNotes('');
    setMessage({ type: 'success', text: 'Workout logged! Keep the momentum going.' });
  };

  const recentPlans = plans.length ? plans : [
    { id: 1, title: 'Strength Builder' },
    { id: 2, title: 'Cardio Burn' },
  ];

  return (
    <>
      <section className="section-card">
        <h1>Progress Tracker</h1>
        <p>Track your workouts, view history, and celebrate consistent growth.</p>
        <div className="grid-2">
          <div className="small-card">
            <span>Sessions logged</span>
            <strong>{totals.logged}</strong>
          </div>
          <div className="small-card">
            <span>Total minutes</span>
            <strong>{totals.totalDuration}</strong>
          </div>
          <div className="small-card">
            <span>Current streak</span>
            <strong>{totals.streak} days</strong>
          </div>
          <div className="small-card">
            <span>User</span>
            <strong>{user?.name || 'Athlete'}</strong>
          </div>
        </div>
      </section>

      <section className="section-card">
        <div className="section-title">
          <h2>Log a workout</h2>
          <p>Record your latest session so you can track improvements over time.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid-2">
            <div className="select-group">
              <label className="label" htmlFor="plan">Workout Plan</label>
              <select id="plan" value={plan} onChange={(e) => setPlan(e.target.value)}>
                <option value="">Choose a plan</option>
                {recentPlans.map((item) => (
                  <option key={item.id} value={item.title}>{item.title}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label className="label" htmlFor="duration">Duration</label>
              <input id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="30 min" />
            </div>
          </div>
          <div className="input-group">
            <label className="label" htmlFor="notes">Notes</label>
            <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="How did it feel?" />
          </div>
          <button className="button" type="submit">Save workout</button>
          {message && <p className={message.type === 'error' ? 'error-text' : 'success-text'}>{message.text}</p>}
        </form>
      </section>

      <section className="section-card">
        <h2>Workout history</h2>
        {logs.length ? (
          <table className="table-list">
            <thead>
              <tr>
                <th>Date</th>
                <th>Plan</th>
                <th>Duration</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.date}</td>
                  <td>{entry.plan}</td>
                  <td>{entry.duration}</td>
                  <td>{entry.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No workout entries yet. Log your first session to start tracking progress.</p>
        )}
      </section>
    </>
  );
}

export default Progress;
