import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface MainModel {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [items, setItems] = useState<MainModel[]>([]);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [error, setError] = useState('');
  const [createTitle, setCreateTitle] = useState('');
  const [createContent, setCreateContent] = useState('');
  const [createAuthor, setCreateAuthor] = useState('');

  const authHeaders = {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  };

  useEffect(() => {
    if (token) fetchItems();
  }, [token]);

  const fetchItems = async () => {
    const res = await fetch(`${API_URL}/api/news`, {
      method: 'GET',
      headers: authHeaders
    });
    const data = await res.json();
    setItems(data);
  };

  const handleLogin = async () => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail, password: loginPassword })
    });
    const data = await res.json();
    if (res.ok) { localStorage.setItem('token', data.token); setToken(data.token); setError(''); }
    else setError(data.message || 'Login failed');
  };

  const handleRegister = async () => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: registerEmail, password: registerPassword })
    });
    const data = await res.json();
    if (res.ok) { localStorage.setItem('token', data.token); setToken(data.token); setError(''); }
    else setError(data.message || 'Register failed');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setItems([]);
  };

  const handleCreate = async () => {
    const res = await fetch(`${API_URL}/api/news`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ title: createTitle, content: createContent, author: createAuthor })
    });
    const data = await res.json();
    if (res.ok) {
      fetchItems();
      setCreateTitle('');
      setCreateContent('');
      setCreateAuthor('');
    } else {
      setError(data.message || 'Create failed');
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`${API_URL}/api/news/${id}`, {
      method: 'DELETE',
      headers: authHeaders
    });
    if (res.ok) {
      fetchItems();
    } else {
      setError('Delete failed');
    }
  };

  if (!token) return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome</h1>
        <p className="auth-subtitle">Sign in or create an account</p>
        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-200 mb-3">Login</h2>
            <div className="flex flex-col gap-3">
              <input className="input-field" type="email" placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
              <input className="input-field" type="password" placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
              <button className="btn-primary w-full" onClick={handleLogin}>Login</button>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-6">
            <h2 className="text-lg font-semibold text-slate-200 mb-3">Register</h2>
            <div className="flex flex-col gap-3">
              <input className="input-field" type="email" placeholder="Email" value={registerEmail} onChange={e => setRegisterEmail(e.target.value)} />
              <input className="input-field" type="password" placeholder="Password" value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} />
              <button className="btn-primary w-full" onClick={handleRegister}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <nav className="nav-bar mb-6 rounded-xl">
        <h1 className="nav-title">Landing Page de Portal de Noticias Digital</h1>
        <button className="btn-secondary" onClick={handleLogout}>Logout</button>
      </nav>

      <div className="card mb-6">
        <h2 className="card-header">Create New Item</h2>
        <div className="flex flex-wrap gap-3">
          <input className="input-field" type="text" placeholder="Title" value={createTitle} onChange={e => setCreateTitle(e.target.value)} />
          <input className="input-field" type="text" placeholder="Content" value={createContent} onChange={e => setCreateContent(e.target.value)} />
          <input className="input-field" type="text" placeholder="Author" value={createAuthor} onChange={e => setCreateAuthor(e.target.value)} />
          <button className="btn-primary" onClick={handleCreate}>Create</button>
        </div>
      </div>

      <div className="card">
        <h2 className="card-header">Items List</h2>
        <div className="table-container">
          <table className="table-base">
            <thead>
              <tr>
                <th>Title</th>
                <th>Content</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.content}</td>
                  <td>{item.author}</td>
                  <td>
                    <button className="btn-danger text-xs px-2 py-1" onClick={() => handleDelete(item._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}