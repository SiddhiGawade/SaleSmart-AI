import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation (replace with real auth later)
    if (username && password) {
      onLogin(username);
    } else {
      setError('Please enter both username and password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-violet-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Sign in to SalesAI</h2>
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
        <div className="mb-4">
          <label className="block text-slate-600 mb-1">Username</label>
          <input type="text" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200" value={username} onChange={e => setUsername(e.target.value)} autoFocus />
        </div>
        <div className="mb-6">
          <label className="block text-slate-600 mb-1">Password</label>
          <input type="password" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Login</button>
      </form>
    </div>
  );
};

export default Login;
