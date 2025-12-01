import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MovieDetails from "./pages/MovieDetails";
import NavBar from "./components/NavBar";


function App() {
  return (
    <>
    <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/filme/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );

  
}

export default App;
