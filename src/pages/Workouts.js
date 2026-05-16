import React, { useEffect, useMemo, useState } from 'react';
import { getWorkoutPlans, saveWorkoutPlans } from '../utils/storage';
import { getCurrentUser } from '../utils/auth';

function Workouts() {
  const [plans, setPlans] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', duration: '', level: 'Beginner', description: '' });
  const [message, setMessage] = useState(null);
  const user = getCurrentUser();

  useEffect(() => {
    const stored = getWorkoutPlans();
    if (stored.length) {
      setPlans(stored);
    } else {
      setPlans([]); // Start with empty array instead of default plans
    }
  }, []);

  useEffect(() => {
    if (plans.length) saveWorkoutPlans(plans);
  }, [plans]);

  const stats = useMemo(() => ({
    total: plans.length,
    beginner: plans.filter((plan) => plan.level === 'Beginner').length,
    intermediate: plans.filter((plan) => plan.level === 'Intermediate').length,
    advanced: plans.filter((plan) => plan.level === 'Advanced').length,
  }), [plans]);

  const resetForm = () => setForm({ title: '', duration: '', level: 'Beginner', description: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.duration.trim() || !form.description.trim()) {
      setMessage({ type: 'error', text: 'Please complete all fields.' });
      return;
    }

    if (editing) {
      setPlans((current) => current.map((plan) => (
        plan.id === editing.id ? { ...plan, ...form } : plan
      )));
      setMessage({ type: 'success', text: 'Workout plan updated successfully.' });
    } else {
      const next = {
        id: Date.now(),
        ...form,
      };
      setPlans((current) => [next, ...current]);
      setMessage({ type: 'success', text: 'Workout plan added.' });
    }

    setEditing(null);
    resetForm();
  };

  const handleEdit = (plan) => {
    setEditing(plan);
    setForm({ title: plan.title, duration: plan.duration, level: plan.level, description: plan.description });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (planId) => {
    setPlans((current) => current.filter((plan) => plan.id !== planId));
    setMessage({ type: 'success', text: 'Workout plan removed.' });
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <>
      <section className="section-card">
        <h1>Workout Plans</h1>
        <p>Manage routines that fit your fitness goals and training level, personalized for {user?.name || 'you'}.</p>
        <div className="grid-2">
          <div className="small-card">
            <span>Total plans</span>
            <strong>{stats.total}</strong>
          </div>
          <div className="small-card">
            <span>Beginner</span>
            <strong>{stats.beginner}</strong>
          </div>
          <div className="small-card">
            <span>Intermediate</span>
            <strong>{stats.intermediate}</strong>
          </div>
          <div className="small-card">
            <span>Advanced</span>
            <strong>{stats.advanced}</strong>
          </div>
        </div>
      </section>

      <section className="section-card">
        <div className="section-title">
          <h2>{editing ? 'Edit workout plan' : 'Add a new workout plan'}</h2>
          <p>Create a plan for strength, cardio, or a custom program.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid-2">
            <div className="input-group">
              <label className="label" htmlFor="title">Plan title</label>
              <input id="title" name="title" value={form.title} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label className="label" htmlFor="duration">Duration</label>
              <input id="duration" name="duration" value={form.duration} onChange={handleChange} placeholder="e.g. 6 weeks" />
            </div>
          </div>
          <div className="grid-2">
            <div className="select-group">
              <label className="label" htmlFor="level">Level</label>
              <select id="level" name="level" value={form.level} onChange={handleChange}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            <div className="input-group">
              <label className="label" htmlFor="description">Description</label>
              <textarea id="description" name="description" value={form.description} onChange={handleChange} />
            </div>
          </div>
          <div className="control-row">
            <button className="button" type="submit">{editing ? 'Save changes' : 'Add plan'}</button>
            {editing && (
              <button className="button-secondary" type="button" onClick={() => { setEditing(null); resetForm(); setMessage(null); }}>
                Cancel edit
              </button>
            )}
          </div>
          {message && <p className={message.type === 'error' ? 'error-text' : 'success-text'}>{message.text}</p>}
        </form>
      </section>

      <section className="section-card">
        <h2>Plan library</h2>
        <div className="card-list">
          {plans.map((plan) => (
            <article key={plan.id} className="plan-card">
              <div className="plan-meta">
                <span>{plan.duration}</span>
                <span>{plan.level}</span>
              </div>
              <h3>{plan.title}</h3>
              <p>{plan.description}</p>
              <div className="plan-actions">
                <button className="button-secondary" type="button" onClick={() => handleEdit(plan)}>Edit</button>
                <button className="button" type="button" onClick={() => handleDelete(plan.id)}>Delete</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default Workouts;
