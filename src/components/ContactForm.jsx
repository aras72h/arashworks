import { useState, useEffect } from 'react';
import { API_URL } from '../config';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // Auto-clear error after 6000 ms
  useEffect(() => {
    if (status === 'error') {
      const t = setTimeout(() => setStatus('idle'), 6000);
      return () => clearTimeout(t);
    }
  }, [status]);

  function validate() {
    const errs = {};
    if (!name.trim()) errs.name = 'Name is required.';
    if (!email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email.';
    if (!message.trim()) errs.message = 'Message is required.';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    setStatus('sending');
    try {
      const res = await fetch(`${API_URL}/contact/portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error('send failed');
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Failed to send. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div>
        <p className="success">Thanks! Your message has been sent.</p>
        <button
          className="btn btn-submit"
          style={{ marginTop: '1rem' }}
          onClick={() => { setStatus('idle'); setName(''); setEmail(''); setMessage(''); }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <>
      {status === 'error' && (
        <div id="error" className="error" role="alert">
          {errorMsg}
        </div>
      )}

      <form id="contact-form" className="form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="sender-name">Your Name:</label>
        <input
          type="text"
          name="user_name"
          id="sender-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
          aria-describedby={fieldErrors.name ? 'err-name' : undefined}
          aria-invalid={!!fieldErrors.name}
        />
        {fieldErrors.name && (
          <span id="err-name" className="field-error" role="alert">
            {fieldErrors.name}
          </span>
        )}

        <label htmlFor="sender-email">Your Email:</label>
        <input
          type="email"
          name="user_email"
          id="sender-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          aria-describedby={fieldErrors.email ? 'err-email' : undefined}
          aria-invalid={!!fieldErrors.email}
        />
        {fieldErrors.email && (
          <span id="err-email" className="field-error" role="alert">
            {fieldErrors.email}
          </span>
        )}

        <label htmlFor="sender-msg">Your Message:</label>
        <textarea
          name="message"
          id="sender-msg"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          aria-describedby={fieldErrors.message ? 'err-message' : undefined}
          aria-invalid={!!fieldErrors.message}
        />
        {fieldErrors.message && (
          <span id="err-message" className="field-error" role="alert">
            {fieldErrors.message}
          </span>
        )}

        <button
          type="submit"
          className="btn btn-submit"
          id="contact-submit"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </>
  );
}
