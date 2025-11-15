import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Alumnos from "./Components/Alumnos/Alumnos";
import Libros from "./Components/Libros/Libros";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={<h1 className="text-center mt-5">Welcome to the App</h1>}
        />
        <Route path="/alumnos" element={<Alumnos />} />
        <Route path="/libros" element={<Libros />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
