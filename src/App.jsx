import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import ContentDisplay from "./pages/ContentDisplayPage";
import PrivateRoute from "./PrivateRoute";
import ExamPage from "./pages/ExamPage";
import "./App.css";

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
      </Routes>
    </Router>
  );
}

export default App;
