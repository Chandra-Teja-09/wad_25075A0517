import React, { useState } from 'react';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim()) next.email = 'Please enter your email address.';
    else if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(form.email)) next.email = 'Enter a valid email address.';
    if (!form.message.trim()) next.message = 'Tell us how we can help.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setErrors({});
  };

  const handleChange = (event) => {
    setSent(false);
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <section className="section-card">
      <h1>Contact us</h1>
      <p>Send a message and our fitness support team will reply shortly.</p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid-2">
          <div className="input-group">
            <label className="label" htmlFor="name">Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} />
            {errors.name && <div className="error-text">{errors.name}</div>}
          </div>
          <div className="input-group">
            <label className="label" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
            {errors.email && <div className="error-text">{errors.email}</div>}
          </div>
        </div>
        <div className="textarea-group">
          <label className="label" htmlFor="message">Message</label>
          <textarea id="message" name="message" value={form.message} onChange={handleChange} />
          {errors.message && <div className="error-text">{errors.message}</div>}
        </div>
        <button className="button" type="submit">Send message</button>
        {sent && <p className="success-text">Thanks! Your message has been received.</p>}
      </form>
    </section>
  );
}

export default Contact;
