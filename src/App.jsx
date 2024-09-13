import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ContentDisplay from "./pages/ContentDisplay";
import PrivateRoute from "./PrivateRoute";
import ExamPage from "./pages/ExamPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* Protecting the routes using PrivateRoute */}
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
        <Route path='/submodule/:subModuleId/material/:materialId' element={<PrivateRoute element={<ContentDisplay />} />} />
        <Route path='/submodule/:subModuleId/quiz/:quizId' element={<PrivateRoute element={<ContentDisplay />} />} />
        <Route path='/exam' element={<PrivateRoute element={<ExamPage />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
