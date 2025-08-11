

import React, { useState, useEffect } from 'react';
import { Dashboard } from './components';
import Login from './components/Login';
import Register from './components/Register';
import { getToken, clearToken } from './api';



const App = () => {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  // On mount, check for JWT and keep user logged in (for demo, just check token exists)
  useEffect(() => {
    const token = getToken();
    if (token && !user) {
      // In a real app, fetch user profile with token
      setUser('User');
    }
  }, []);

  const handleLogout = () => {
    clearToken();
    setUser(null);
  };

  if (!user) {
    return showRegister ? (
      <Register onRegister={() => setShowRegister(false)} onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <Login onLogin={setUser} onSwitchToRegister={() => setShowRegister(true)} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 text-gray-900">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-blue-50 via-white to-violet-50 shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 via-teal-300 to-violet-400 text-white shadow">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z"/></svg>
            </span>
            <span className="text-2xl font-extrabold text-blue-600 tracking-tight">SalesAI</span>
            <span className="ml-2 text-sm text-slate-400 font-semibold">AI Sales Analytics</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-500 text-sm">{user}</span>
            <button className="px-4 py-2 rounded bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Dashboard />
      </main>
    </div>
  );
};

export default App;