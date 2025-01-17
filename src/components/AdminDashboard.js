import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setSubmissions(response.data);
      } catch (error) {
        console.error("Error fetching submissions", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Social Media Handle</th>
            <th>Images</th>
          </tr>
        </thead>
        <tbody>
          {
            submissions.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.socialHandle}</td>
                <td><img src={user.imageURL} alt={user.name} style={{ width: '50px', height: '50px' }} /></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
  
};

export default AdminDashboard;



