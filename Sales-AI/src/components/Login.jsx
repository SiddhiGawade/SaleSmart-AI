import React, { useState } from 'react';
import { loginUser, saveToken } from '../api';

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      saveToken(res.token);
      onLogin(res.user.name || res.user.email);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-violet-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Sign in to SalesAI</h2>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        <div className="mb-4">
          <label className="block text-slate-600 mb-1">Email</label>
          <input type="email" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200" value={email} onChange={e => setEmail(e.target.value)} autoFocus />
        </div>
        <div className="mb-6">
          <label className="block text-slate-600 mb-1">Password</label>
          <input type="password" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <button type="button" className="text-blue-600 hover:underline" onClick={onSwitchToRegister}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
