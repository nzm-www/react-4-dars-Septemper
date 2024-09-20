import React, { useState, useEffect } from 'react';
import './App.css';
function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    username: '',
    email: '',
    nationality: '',
    languages: [],
    description: ''
  });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm((prevForm) => ({
        ...prevForm,
        languages: checked
          ? [...prevForm.languages, value]
          : prevForm.languages.filter((lang) => lang !== value)
      }));
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers((prevUsers) => [...prevUsers, form]);
    setForm({
      username: '',
      email: '',
      nationality: '',
      languages: [],
      description: ''
    });
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="nationality"
          value={form.nationality}
          onChange={handleChange}
          placeholder="Nationality"
          required
        />
        <div className='chek'>
          <label className='lablee'>
            English
            <input
              type="checkbox"
              name="languages"
              value="English"
              checked={form.languages.includes('English')}
              onChange={handleChange}
            />
          </label>
          <label className='lablee'>
            Spanish
            <input
              type="checkbox"
              name="languages"
              value="Spanish"
              checked={form.languages.includes('Spanish')}
              onChange={handleChange}
            />
          </label>
          <label className='lablee'>
            French
            <input
              type="checkbox"
              name="languages"
              value="French"
              checked={form.languages.includes('French')}
              onChange={handleChange}
            />
          </label>
        </div>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <button type="submit">Submit</button>
      </form>

      <div className='wrap'>
        {users.map((user, index) => (
          <div key={index} className="card">
            <h3>{user.username}</h3>
            <p>Email: {user.email}</p>
            <p>Nationality: {user.nationality}</p>
            <p>Languages: {user.languages.join(', ')}</p>
            <p>Description: {user.description}</p>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;