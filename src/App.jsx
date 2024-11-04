import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import ContentDisplay from "./pages/ContentDisplayPage";
import PrivateRoute from "./PrivateRoute";
import ExamPage from "./pages/ExamPage";
import AboutPage from "./pages/AboutPage";
import DescriptionPage from "./pages/DescriptionPage";
import "./App.css";
import PrivateAdminRoute from "./PrivateAdminRoute";
import AdminDashboard from "./pages/AdminPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<PrivateRoute element={<Home />} />} />
        <Route path='/submodule/:subModuleId/material/:materialId' element={<PrivateRoute element={<ContentDisplay />} />} />
        <Route path='/submodule/:subModuleId/quiz/:quizId' element={<PrivateRoute element={<ContentDisplay />} />} />
        <Route path='/submodule/:subModuleId/handson' element={<PrivateRoute element={<ContentDisplay />} />} />
        <Route path='/exam' element={<PrivateRoute element={<ExamPage />} />} />
        <Route path='/about' element={<PrivateRoute element={<AboutPage />} />} />
        <Route path='/description' element={<PrivateRoute element={<DescriptionPage />} />} />
        <Route path='/admin' element={<PrivateAdminRoute element={<AdminDashboard />} />} />
      </Routes>
    </Router>
  );
}

export default App;
