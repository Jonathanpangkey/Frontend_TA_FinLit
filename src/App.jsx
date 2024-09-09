import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MaterialDisplay from "./pages/MaterialDisplay";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* Protecting the routes using PrivateRoute */}
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
        <Route path='/submodule/:subModuleId/material/:materialId' element={<PrivateRoute element={<MaterialDisplay />} />} />
        <Route path='/submodule/:subModuleId/quiz/:quizId' element={<PrivateRoute element={<MaterialDisplay />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
