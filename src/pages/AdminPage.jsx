import React, {useState, useEffect} from "react";
import {fetchUserProgress} from "../api/UsersProgress";
import {fetchSubmodules} from "../api/Submodules"; // Add this API
import {addResource} from "../api/Resources"; // Add this API
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [userProgress, setUserProgress] = useState([]);
  const [submodules, setSubmodules] = useState([]); // State for submodules
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [resourceForm, setResourceForm] = useState({
    subModuleId: "",
    title: "",
    type: "",
    url: "",
  });
  const [showForm, setShowForm] = useState(false); // State to manage form visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const progressData = await fetchUserProgress();
        const submoduleData = await fetchSubmodules(); // Fetch submodules
        setUserProgress(progressData);
        setSubmodules(submoduleData);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddResource = async (e) => {
    e.preventDefault();
    try {
      await addResource(resourceForm.subModuleId, {
        title: resourceForm.title,
        type: resourceForm.type,
        url: resourceForm.url,
      });
      alert("Resource added successfully!");
      setResourceForm({subModuleId: "", title: "", type: "", url: ""}); // Reset form
      setShowForm(false); // Hide the form after submission
    } catch (err) {
      setError("Failed to add resource.");
    }
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setResourceForm({...resourceForm, [name]: value});
  };

  return (
    <>
      <Navbar />
      <div className='admin-dashboard'>
        <h2>Admin Dashboard</h2>
        {loading && <p className='loading'>Loading data...</p>}
        {error && <p className='error'>{error}</p>}

        <button className='btn add-btn' onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add +"}
        </button>

        {showForm && (
          <div className='add-resource-container'>
            <h3>Add Resource to Submodule</h3>
            <form className='add-resource-form' onSubmit={handleAddResource}>
              <div className='form-group'>
                <label>Submodule:</label>
                <select name='subModuleId' value={resourceForm.subModuleId} onChange={handleInputChange} required>
                  <option value=''>Select Submodule</option>
                  {submodules.map((submodule) => (
                    <option key={submodule.id} value={submodule.id}>
                      {submodule.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label>Title:</label>
                <input type='text' name='title' value={resourceForm.title} onChange={handleInputChange} required />
              </div>
              <div className='form-group'>
                <label>Type:</label>
                <input type='text' name='type' value={resourceForm.type} onChange={handleInputChange} required />
              </div>
              <div className='form-group'>
                <label>URL:</label>
                <input type='text' name='url' value={resourceForm.url} onChange={handleInputChange} required />
              </div>
              <button className='btn' type='submit'>
                Add Resource
              </button>
            </form>
          </div>
        )}

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
            {userProgress
              .filter((user) => user.userName !== "admin")
              .map((user) => {
                const adjustedProgress =
                  user.examLastScore !== null && user.examLastScore > 0
                    ? 100
                    : user.overallProgressPercentage === 98
                    ? user.overallProgressPercentage + 2
                    : user.overallProgressPercentage;

                return (
                  <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>{user.userName}</td>
                    <td>{user.examLastScore}</td>
                    <td>{adjustedProgress}%</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminDashboard;
