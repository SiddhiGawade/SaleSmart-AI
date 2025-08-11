import React, { useState } from 'react';
import { registerUser } from '../api';

const Register = ({ onRegister, onSwitchToLogin }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '', company: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await registerUser(form);
      setSuccess('Registration successful! You can now log in.');
      setTimeout(onSwitchToLogin, 1200);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-violet-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Register for SalesAI</h2>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-sm">{success}</div>}
        <div className="mb-3">
          <label className="block text-slate-600 mb-1">Name</label>
          <input name="name" type="text" className="w-full px-3 py-2 border rounded" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="block text-slate-600 mb-1">Email</label>
          <input name="email" type="email" className="w-full px-3 py-2 border rounded" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="block text-slate-600 mb-1">Password</label>
          <input name="password" type="password" className="w-full px-3 py-2 border rounded" value={form.password} onChange={handleChange} required />
        </div>
        <div className="mb-6">
          <label className="block text-slate-600 mb-1">Company</label>
          <input name="company" type="text" className="w-full px-3 py-2 border rounded" value={form.company} onChange={handleChange} />
        </div>
        <button type="submit" className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Register</button>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <button type="button" className="text-blue-600 hover:underline" onClick={onSwitchToLogin}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
