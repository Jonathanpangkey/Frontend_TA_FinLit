import React, {useEffect, useState} from "react";
import {fetchUserProgress} from "../api/UsersProgress";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [userProgress, setUserProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user progress data from the backend
    const fetchData = async () => {
      try {
        const data = await fetchUserProgress();
        setUserProgress(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user progress data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sort userProgress by userId
  const sortedUserProgress = userProgress.sort((a, b) => a.userId - b.userId);

  // Render loading message, error message, or the user progress data
  return (
    <>
      <Navbar />
      <div className='admin-dashboard'>
        {/* <button className='add-material'>Add +</button> */}
        <h2>Admin Dashboard</h2>
        {loading && <p className='loading'>Loading user progress data...</p>}
        {error && <p className='error'>{error}</p>}
        {!loading && !error && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Post Test</th>
                <th>Keseluruhan Progress (%)</th>
              </tr>
            </thead>
            <tbody>
              {sortedUserProgress
                .filter((user) => user.userName !== "Admin") // Exclude admin user
                .map((user) => (
                  <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>{user.userName}</td>
                    <td>{user.examLastScore}</td>
                    <td>{user.overallProgressPercentage}%</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default AdminDashboard;
