// frontend/src/App.js
// 




import React, { useState } from 'react';
import UserForm from './components/UserForm';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [showForm, setShowForm] = useState(true);  // Example state to toggle between components

  return (
    <div className="App">
      <h1>Welcome to the Social Media Dashboard</h1>
      {showForm ? <UserForm /> : <AdminDashboard />} {/* Conditionally render components */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Go to Admin Dashboard" : "Go to User Form"}
      </button>
    </div>
  );
}

export default App;


