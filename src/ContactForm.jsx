import { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
      setFeedback('Completeaza toate campurile!');
      return;
    }

    setFeedback('Multumim, ' + name + '!');
  }

  return (
    <div className="panel section-card">
      <h3>Formular de contact</h3>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nume"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mesaj"
        />
        <button type="submit">Submit</button>
      </form>
      <p className="feedback">{feedback}</p>
    </div>
  );
}

export default ContactForm;
